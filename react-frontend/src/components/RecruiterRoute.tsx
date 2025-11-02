import { useStore } from "@/store/useStore"
import { Navigate, Outlet } from "react-router-dom"

const RecruiterRoute = () => {
    const isRecruter = useStore(state => state.user?.recruiter)
    return (
        !isRecruter ? <Navigate to="/recruiter/register" replace /> : <Outlet />
    )
}
export default RecruiterRoute