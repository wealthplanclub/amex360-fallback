
import * as React from "react"
import { LogOut } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./SidebarMenu"

export function NavUser() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg bg-blue-100 text-blue-700">
              {user.display_name ? user.display_name.charAt(0).toUpperCase() : user.user_id.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <div className="flex items-center justify-between">
              <span className="truncate font-medium">{user.display_name || user.user_id}</span>
              {user.role && (
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="text-xs ml-2">
                  {user.role}
                </Badge>
              )}
            </div>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
          <Button 
            onClick={handleSignOut}
            variant="ghost" 
            size="sm" 
            className="ml-auto h-8 w-8 p-0"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sign Out</span>
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
