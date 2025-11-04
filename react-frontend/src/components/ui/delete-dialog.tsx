import { useState } from "react"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "./alert-dialog"
import { Button } from "@/components/ui/button"

export function DeleteJobDialog({ deleteJobMutation }: { deleteJobMutation: any }) {
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        try {
            await deleteJobMutation.mutateAsync()
            setOpen(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-red-600 w-full justify-start hover:bg-neutral-800"
                    onClick={() => setOpen(true)}
                >
                    Delete job
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. <br />
                        This will permanently delete your listing.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleteJobMutation.isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteJobMutation.isPending}
                    >
                        {deleteJobMutation.isPending ? "Deleting..." : "Delete"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
