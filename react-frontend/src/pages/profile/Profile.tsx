import UploadResumeModal from "@/components/UploadResumeModal"
import { useStore } from "@/store/useStore"
import { User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { keyToS3Url } from "@/lib/utility"

export default function Profile() {
    const user = useStore((state) => state.user)
    const [isUploadModalOpen, setUploadModalOpen] = useState(false)

    if (!user)
        return (
            <div className="flex min-h-screen items-center justify-center text-muted-foreground">
                <h1>Unable to fetch profile</h1>
            </div>
        )

    return (
        <div className="flex h-[500px] flex-col items-center justify-center bg-background text-foreground p-6 overflow-hidden">
            <UploadResumeModal open={isUploadModalOpen} onOpenChange={setUploadModalOpen} />

            <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="flex flex-col items-center space-y-4">
                    {user.pictureUrl ? (
                        <img
                            src={user.pictureUrl}
                            alt={user.name ? user.name : "User"}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <User className="h-10 w-10 text-muted-foreground" />
                        </div>
                    )}

                    <div className="text-center">
                        <h1 className="text-xl font-semibold">{user.name}</h1>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>

                <div className="mt-6 flex flex-col space-y-3">
                    {user.resumeUrl ? (
                        <>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => user.resumeUrl && window.open(keyToS3Url(user.resumeUrl), "_blank")}                            >
                                View Resume
                            </Button>
                            <Button
                                className="w-full"
                                onClick={() => setUploadModalOpen(true)}
                            >
                                Upload New Resume
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="w-full"
                            onClick={() => setUploadModalOpen(true)}
                        >
                            Upload Resume
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
