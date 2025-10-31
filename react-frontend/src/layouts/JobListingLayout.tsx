import { JobListingSidebar } from "@/components/sidebar/JobListingSidebar"
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

export default function JobListingLayout() {
    return (
        <SidebarProvider>
            <JobListingSidebar />
            <main className="w-full">
                <SidebarTrigger />
                <Outlet />
                <Toaster position="bottom-right" />
            </main>
        </SidebarProvider>
    )
}


