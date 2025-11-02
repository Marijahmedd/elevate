import {
    Sidebar,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"

import Footer from "./../sidebar/Footer"
import Header from "./Header"
import { Link, useLocation } from "react-router-dom"
import { Clipboard, ClipboardPenLine } from "lucide-react"
import { Separator } from "../ui/separator"




export function RecruiterSidebar() {
    const location = useLocation()
    return (<>
        <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
            <Header />
            <div className="p-2 ">
                <SidebarMenu>

                    <SidebarMenuItem>
                        <SidebarMenuButton className="pb-3 pt-3" isActive={location.pathname === '/recruiter'}>
                            <Clipboard /> <Link to="/recruiter">My listings</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton className="pb-3 pt-3"
                            isActive={location.pathname === '/recruiter/jobs/new'}>
                            <ClipboardPenLine /> <Link to="/recruiter/jobs/new">Post new job</Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu >
            </div>

            <div className="mt-auto">
                <Separator />
                <Footer />
            </div>
        </Sidebar >
    </>
    )
}
