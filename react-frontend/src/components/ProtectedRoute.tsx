import { Navigate, Outlet } from "react-router-dom"
import { user } from "../lib/constants"

const ProtectedRoute = () => {

    return user ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoute