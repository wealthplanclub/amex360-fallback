
import React from "react"
import { ChartNoAxesColumn, Award, CreditCard, Crown, LogOut, RotateCw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/sonner"
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
    icon: ChartNoAxesColumn,
    url: "/dashboard",
  },
  {
    title: "Bonus Awards",
    icon: Award,
    url: "/rewards",
  },
  {
    title: "Employee Cards",
    icon: CreditCard,
    url: "/employee",
  },
  {
    title: "CreditMax",
    icon: Crown,
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

  const handleRefreshData = () => {
    // Simulate data refresh
    console.log("Refreshing static data...")
    
    // Show success toast
    toast.success("Dashboard refreshed", {
      description: "Latest transaction data has been loaded",
      position: "top-right",
      style: {
        "--toast-swipe-end-transform": "translateX(100%)",
        "--toast-exit-transform": "translateX(100%)"
      } as React.CSSProperties
    })
    
    close()
  }

  const handleLogout = () => {
    navigate("/")
    close()
  }

  return (
    <Sidebar>
      <SidebarContent>
        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>AMEX 360°</SidebarGroupLabel>
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

        {/* Data Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Data</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleRefreshData}
                className="gap-3"
              >
                <RotateCw className="h-4 w-4" />
                <span>Refresh</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleLogout}
                className="gap-3"
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
