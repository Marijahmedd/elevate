import { useStore } from "@/store/useStore";
import axios from "axios"


const BASEURL = import.meta.env.VITE_BACKEND_URL
export const api = axios.create({
    baseURL: BASEURL,
});



api.interceptors.request.use(
    (config) => {
        const token = useStore.getState().token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

