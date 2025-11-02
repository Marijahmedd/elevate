import {
    Sidebar,


} from "@/components/ui/sidebar"

import Footer from "./../sidebar/Footer"
import Header from "./Header"




export function UserSidebar() {
    return (
        <Sidebar className="border-r bg-sidebar text-sidebar-foreground">
            <Header />
            <div className="mt-auto">
                <Footer />
            </div>
        </Sidebar >
    )
}
