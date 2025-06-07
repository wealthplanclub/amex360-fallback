
import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./SidebarContext"
import { SidebarOverlay } from "./SidebarOverlay"

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isOpen, close } = useSidebar()

  return (
    <>
      <SidebarOverlay />
      <div
        ref={ref}
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out",
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-95",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="ml-4">
            <img 
              src="/dls-logo-bluebox-solid.svg" 
              alt="DLS Logo" 
              className="h-8 w-8"
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
      </div>
    </>
  )
})
Sidebar.displayName = "Sidebar"
