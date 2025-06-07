
import React from "react"
import { Home, BarChart3, CreditCard, Settings, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/dashboard",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "#",
  },
  {
    title: "Cards",
    icon: CreditCard,
    url: "#",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "#",
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const { close } = useSidebar()

  const handleItemClick = (url: string) => {
    if (url !== "#") {
      navigate(url)
    }
    close()
  }

  const handleLogout = () => {
    navigate("/")
    close()
  }

  return (
    <Sidebar>
      <SidebarContent>
        {/* Logo Section */}
        <div className="px-3 py-4 border-b">
          <img 
            src="https://i.imgur.com/1fFddP4.png" 
            alt="Amex Logo" 
            className="h-8"
          />
        </div>

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  onClick={() => handleItemClick(item.url)}
                  className="gap-3"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleLogout}
                className="gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Log Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
