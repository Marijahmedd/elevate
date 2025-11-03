import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar"
import { UserSidebar } from "@/components/sidebar/UserSidebar"
import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"

export default function UserLayout() {
    return (
        <SidebarProvider>
            <UserSidebar />
            <main className="w-full flex-1 min-h-svh overflow-y-auto relative min-w-0">
                <div className="block md:hidden">
                    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-start py-3 px-4 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-sm">
                        <SidebarTrigger />
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center text-center">
                            <div className="h-12 w-12 overflow-hidden">
                                <img
                                    src="/logo.png"
                                    alt="logo"
                                    className="h-full w-full object-cover scale-150"
                                />
                            </div>
                            <h1 className="font-bold text-2xl">Elevate.</h1>
                        </div>

                    </header>
                    {/* Spacer to offset fixed header height */}
                    <div className="h-14" />
                </div>
                <Outlet />
                <Toaster position="bottom-right" />
            </main>
        </SidebarProvider>
    )
}


