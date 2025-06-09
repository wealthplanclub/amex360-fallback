
import React from "react"
import { ChartNoAxesColumn, Award, CreditCard, Crown, LogOut, RotateCw, CircleCheck } from "lucide-react"
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
    url: "/creditmax",
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const { close } = useSidebar()

  const handleItemClick = (url: string) => {
    if (url !== "#") {
      // Add a small delay to allow the smooth close animation to start
      setTimeout(() => {
        navigate(url)
      }, 100)
    }
    close()
  }

  const handleRefreshData = () => {
    // Simulate data refresh
    console.log("Refreshing static data...")
    
    // Show success toast with blue circle-check icon
    toast.success("Dashboard refreshed", {
      description: "Latest transaction data has been loaded",
      position: "top-right",
      icon: <CircleCheck size={16} style={{ color: '#006fcf' }} />
    })
    
    close()
  }

  const handleLogout = () => {
    setTimeout(() => {
      navigate("/")
    }, 100)
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
