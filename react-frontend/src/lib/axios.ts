import { useStore } from "@/store/useStore";
import axios from "axios"


const BASEURL = import.meta.env.VITE_BACKEND_URL
console.log(BASEURL)
export const api = axios.create({
    baseURL: BASEURL,
});



api.interceptors.request.use(
    (config) => {
        const token = useStore.getState().token
        console.log("Intercepted", token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

