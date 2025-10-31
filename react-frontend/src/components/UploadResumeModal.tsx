import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { api } from "@/lib/axios"
import { useStore } from "@/store/useStore"

export default function UploadResumeModal({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const updateResumeMutation = useMutation({
        mutationFn: async (file: File) => {
            setIsUploading(true)
            const { data } = await api.get("/presigned-url")
            const { presignedUrl, key } = data

            await fetch(presignedUrl, {
                method: "PUT",
                body: file,
                headers: { "Content-Type": file.type },
            })

            await api.post("/users/resume", { resumeUrl: key })
            setIsUploading(false)
            return key
        },
        onSuccess: (newKey) => {
            useStore.setState((state) => {
                if (!state.user) return state;
                return ({ ...state, user: { ...state.user, resumeUrl: newKey } })
            })
            toast.success("Resume uploaded successfully.")
            onOpenChange(false)
            setSelectedFile(null)

        },
        onError: () => {
            setIsUploading(false)
            toast.error("Failed to upload resume.")
        },
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file.type !== "application/pdf") {
            toast.error("Only PDF files are allowed.")
            return
        }
        setSelectedFile(file)
    }

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedFile) {
            toast.error("Please select a PDF file first.")
            return
        }
        updateResumeMutation.mutate(selectedFile)
    }

    return (
        // <Dialog open={open} onOpenChange={onOpenChange}>
        <Dialog open={open} >

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleUpload}>
                    <DialogHeader>
                        <DialogTitle>Upload Resume </DialogTitle>
                        <DialogDescription>
                            Only PDF files are accepted. Your new resume will replace the existing one.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center justify-center border border-dashed border-muted-foreground/40 rounded-lg p-6 text-center">
                        <input
                            id="file-upload"
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                        >
                            {selectedFile ? selectedFile.name : "Click to choose a PDF"}
                        </label>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isUploading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isUploading}>
                            {isUploading ? "Uploading..." : "Upload"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
