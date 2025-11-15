/* eslint-disable @typescript-eslint/no-explicit-any */

 
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function RecruiterRegister() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const user = useStore((state) => state.user)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState<any>(null)




    const { mutateAsync } = useMutation({
        mutationFn: async (data: { organizationName: string, key: string }) => {
            const result = await api.post('/recruiters', data)
            return result
        },
        onSuccess: (result) => {
            const { organizationName, organizationImageKey } = result.data.recruiter
            const recruiterData = { organizationName, organizationImageKey }
            useStore.setState((state) => {
                return ({ ...state, user: { ...state.user!, recruiter: recruiterData } })
            }
            )
            toast.success("Succesfully Registered!")
            navigate("/recruiter")
        },
        onError: () => {
            toast.error("Cannot register as recruiter!")
        }
    })

    if (!user)
        return (
            <div className="flex min-h-screen items-center justify-center text-muted-foreground">
                <h1>Unable to fetch profile</h1>
            </div>
        )


    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true)
            const organizationName = data.organizationName
            const presignedData = await api.get('/image-presigned-url')
            const { presignedUrl, key } = presignedData.data
            await fetch(presignedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': selectedImage.type,
                },
                body: selectedImage,
            });
            const requestData = { organizationName, key }
            await mutateAsync(requestData)
            setIsLoading(false)
        } catch{
            toast.error("Cannot be a recruiter right now!")

            setIsLoading(false)
        }
    }


    const allowedImageTypes = ["image/jpeg", "image/jpg", "image/svg", "image/png"]
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        if (!allowedImageTypes.includes(e.target.files[0].type)) {
            return toast.error("Only images are allowed")

        }


        setSelectedImage(e.target.files[0])

    }

    return (

        <div className="flex min-h-[500px] flex-col items-center justify-center bg-background text-foreground my-6 p-6 overflow-hidden">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="flex flex-col text-center justify-center w-full gap-3 ">
                    <h1 className="text-2xl font-bold">Elevate Your Recruitment Experience</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div className="flex justify-center">
                        <img
                            src={selectedImage ? URL.createObjectURL(selectedImage) : "/organization.png"}
                            className="object-cover border-2 p-2 scale-125 h-30 w-30 rounded-full border-dashed "
                            alt="" />
                    </div>

                    <div className="grid w-full max-w-sm items-center gap-3">
                        <label htmlFor="picture" className="text-muted-foreground">Organization Logo</label>
                        <Input
                            disabled={isLoading}
                            id="picture" type="file" accept="image/*" required
                            onChange={handleImageChange}

                        />
                    </div>

                    {errors.picture && <p className="text-sm bg-muted-background text-red-600">{(errors as any).picture.message}</p>}
                    <div className="grid w-full max-w-sm items-center gap-3">
                        <label htmlFor="organizationName" className="text-muted-foreground">Organization Name</label>
                        <Input
                            disabled={isLoading}
                            maxLength={60}
                            type="text"
                            id="organizationName"
                            placeholder="Organization Name"
                            {...register("organizationName", {
                                required: "Organization Name is required",
                                maxLength: {
                                    value: 60, message: "Organization Name must be less than 60 Characters"
                                },
                                minLength: {
                                    value: 2, message: "Organization Name must be more than 2 Character"
                                },
                            })}
                        />
                    </div>
                    {errors.organizationName && <p className="text-sm bg-muted-background text-red-600">{(errors as any).organizationName.message}</p>}


                    <Button type="submit" disabled={isLoading} className="w-full ">
                        {
                            isLoading ? "Registering..." : "Become a Recruiter"
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}
