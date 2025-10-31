import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { UserSidebar } from "@/components/sidebar/UserSidebar"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

export default function UserLayout() {
    return (
        <SidebarProvider>
            <UserSidebar />
            <main className="w-full ">
                <SidebarTrigger />
                <Outlet />
                <Toaster position="bottom-right" />
            </main>
        </SidebarProvider>
    )
}


