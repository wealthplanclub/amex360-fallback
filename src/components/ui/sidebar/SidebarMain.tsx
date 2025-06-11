
import * as React from "react"
import { X, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./SidebarContext"
import { SidebarOverlay } from "./SidebarOverlay"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen, close } = useSidebar()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    close()
  }

  return (
    <>
      <SidebarOverlay />
      <div
        ref={ref}
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <img 
              src="https://i.imgur.com/K1hwm2e.png" 
              alt="Amex Logo"
              className="min-w-[100px]"
            />
          </div>
          <button
            onClick={close}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        {user && (
          <div className="p-4 border-t">
            <div className="mb-3">
              <p className="text-sm font-medium">Welcome, {user.display_name || user.user_id}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Button 
              onClick={handleSignOut}
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </>
  )
})
Sidebar.displayName = "Sidebar"
