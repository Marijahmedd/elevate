import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
import { RecruiterSidebar } from "@/components/sidebar/RecruiterSidebar"

export default function RecruiterLayout() {
    return (
        <SidebarProvider>
            <RecruiterSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <Outlet />
                <Toaster position="bottom-right" />
            </main>
        </SidebarProvider>
    )
}


