import { create } from 'zustand'
import { toast } from "react-hot-toast"
import { api } from '@/lib/axios';
import { persist } from "zustand/middleware"
import { queryClient } from '@/main';
type User = {
    id: string;
    resumeUrl: string | null;
    email: string;
    name: string | null;
    pictureUrl: string | null;
    recruiter: Recruiter | null
}

type Recruiter = {
    organizationName: string
}


type Store = {
    token: null | string
    user: User | null,
    login: (token: string) => void,
    logout: () => void,
}

export const useStore = create<Store>()(





    persist(

        (set) => ({
            token: null,
            user: null,
            logout: () => {

                set((state) => ({
                    ...state,
                    user: null,
                    token: null,
                }))
                queryClient.removeQueries({ queryKey: ['job_application_status'], exact: false });
                toast.success("Successfully Signed Out!")
            },
            login: async (credential) => {


                try {
                    if (!credential) {
                        throw new Error("Unable to sign in!")
                    }

                    const result = await api.post('/login', {
                        token: credential
                    })
                    if (result.status !== 200) {
                        throw new Error("Unable to sign in!")
                    }
                    console.log(result.data, "Whole payload")
                    const userData: User = result.data.user
                    console.log(userData)
                    set((state) => ({
                        ...state, token: result.data.accessToken, user: userData
                    }))

                    toast.success("successfully signed in!")
                    console.log(credential)

                } catch (err) {

                    toast.error(err instanceof Error ? err.message : "Something Went Wrong")

                }

            }
        }),

        {
            name: "elevate-storage",
            partialize: (state) => ({ token: state.token, user: state.user })
        }
    )



)


