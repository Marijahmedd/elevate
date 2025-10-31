import {

  SidebarFooter,

  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronUp, LayoutDashboard, User2, Clipboard, Brain } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Separator } from "@/components/ui/separator"

import { useStore } from "@/store/useStore"
import { GoogleLogin } from "@react-oauth/google"


const Footer = () => {
  const location = useLocation()
  const user = useStore(state => state.user)
  const login = useStore(state => state.login)
  const logout = useStore(state => state.logout)

  return (
    <SidebarFooter>
      <SidebarMenu>

        <SidebarMenuItem>
          <SidebarMenuButton className="pb-3 pt-3" isActive={location.pathname === '/jobs'}>
            <Clipboard /> <Link to="/jobs">Job Board</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton className="pb-3 pt-3"
            isActive={location.pathname === '/ai-search'}>
            <Brain /> <Link to="/ai-search">AI search</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton className="pb-3 pt-3"
            isActive={location.pathname === '/recruiter'}>
            <LayoutDashboard />
            <Link to="/recruiter">Recruiter Dashboard</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <Separator className="my-2" />

        {/* USER LOGGED OUT VIEW  */}


        {!user ?
          <div className="mb-2"><GoogleLogin onSuccess={(data) => login(data.credential as string)} /></div> :



          <SidebarMenuItem className="mb-2 p-0">
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2">

                  {
                    user.pictureUrl ? (
                      <img
                        src={user.pictureUrl}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="h-6 w-6 rounded-full object-cover" />
                    ) : (
                      <User2 className="h-5 w-5" />
                    )}

                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">
                      {user.name ?? "Unknown User"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                      {user.email}
                    </span>
                  </div>

                  <ChevronUp className="h-4 w-4 ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500" onClick={logout}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        }


      </SidebarMenu>
    </SidebarFooter >
  )
}

export default Footer