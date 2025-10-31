import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useStore } from "@/store/useStore"
import { api } from "@/lib/axios"
import { FileUpload } from "@/components/ui/file-upload" // from aceternity UI
import { toast } from "react-hot-toast"


export default function Profile() {
    const user = useStore((state) => state.user)
    const [isUploading, setIsUploading] = useState(false)

    const updateResumeMutation = useMutation({
        mutationFn: async (file: File) => {
            setIsUploading(true)

            // 1. Get presigned URL and key
            const { data } = await api.get("/presigned-url")
            const { presignedUrl, key } = data
            console.log(data, 'presigned url data')
            // 2. Upload directly to S3
            await fetch(presignedUrl, {
                method: "PUT",
                body: file,
                headers: { "Content-Type": file.type },
            })

            // 3. Update backend record
            await api.post("/users/resume", { resumeUrl: key })

            setIsUploading(false)
            return key
        },
        onSuccess: () => {
            toast.success("Resume uploaded successfully.")
        },
        onError: () => {
            setIsUploading(false)
            toast.error("Failed to upload resume.")
        },
    })

    const handleFileSelect = (files: File[]) => {
        if (!files.length) return
        const file = files[0]
        updateResumeMutation.mutate(file)
    }

    return (
        <div className="p-4 rounded-xl border bg-card flex flex-col gap-4">
            <h2 className="text-lg font-medium">Resume</h2>

            {user?.resumeUrl ? (
                <div className="flex items-center justify-between">
                    <a
                        href={user.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all"
                    >
                        {user.resumeUrl}
                    </a>
                    <FileUpload
                        onChange={handleFileSelect}
                    // disabled={isUploading}
                    // className="ml-4"
                    // buttonText={isUploading ? "Uploading..." : "Upload New"}
                    />
                </div>
            ) : (
                <FileUpload
                    onChange={handleFileSelect}
                // disabled={isUploading}
                // buttonText={isUploading ? "Uploading..." : "Upload Resume"}
                />
            )}
        </div>
    )
}
