import {
    Sidebar,


} from "@/components/ui/sidebar"

import Footer from "./../sidebar/Footer"




export function UserSidebar() {
    return (
        <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
            <div className="mt-auto">
                <Footer />
            </div>
        </Sidebar >
    )
}
