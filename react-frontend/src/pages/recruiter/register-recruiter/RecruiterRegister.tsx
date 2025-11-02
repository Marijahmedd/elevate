import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/useStore"
import { useMutation } from "@tanstack/react-query"
import { api } from "@/lib/axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function RecruiterRegister() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const user = useStore((state) => state.user)
    const navigate = useNavigate()
    if (!user)
        return (
            <div className="flex min-h-screen items-center justify-center text-muted-foreground">
                <h1>Unable to fetch profile</h1>
            </div>
        )

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            const result = await api.post('/recruiters', data)
            return result
        },
        onSuccess: (result) => {
            useStore.setState((state) => {
                return ({ ...state, user: { ...state.user!, recruiter: result.data.recruiter } })
            }
            )
            toast.success("Succesfully Registered!")
            navigate("/recruiter")
        },
        onError: () => {
            toast.error("Succesfully Registered!")


        }
    })


    const onSubmit = (data: any) => {

        console.log("data recieved from form", data)
        mutate(data)
    }

    return (

        <div className="flex h-[500px] flex-col items-center justify-center bg-background text-foreground p-6 overflow-hidden">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="flex flex-col text-center justify-center w-full gap-3 ">
                    <h1 className="text-2xl font-bold">Elevate Your Recruitment Experience</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        maxLength={60}
                        type="text"
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
                    {errors.organizationName && <p className="text-sm bg-muted-background text-red-600">{(errors as any).organizationName.message}</p>}

                    <Button type="submit" disabled={isPending} className="w-full ">
                        {
                            isPending ? "Registering..." : "Become a Recruiter"
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}
