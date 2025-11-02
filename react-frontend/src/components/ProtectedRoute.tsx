import { Navigate, Outlet } from "react-router-dom"
import { useStore } from "@/store/useStore"


const ProtectedRoute = () => {
    const user = useStore(state => state.user)

    return user ? <Outlet /> : <Navigate to="/jobs" />

}

export default ProtectedRoute