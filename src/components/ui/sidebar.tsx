
import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Context for sidebar state
interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  close: () => void
  open: () => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// Sidebar Provider
interface SidebarProviderProps {
  children: React.ReactNode
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  // Close sidebar when pressing escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close, open }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Sidebar Trigger (Using DLS Logo)
export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { toggle } = useSidebar()

  return (
    <button
      ref={ref}
      onClick={toggle}
      className={cn(
        "inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors",
        className
      )}
      {...props}
    >
      <img 
        src="/dls-logo-bluebox-solid.svg" 
        alt="Menu" 
        className="h-6 w-6"
      />
      <span className="sr-only">Open sidebar</span>
    </button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

// Sidebar Overlay with improved fade transition
const SidebarOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen, close } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 bg-black/50 z-40 transition-all duration-300 ease-out",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
        className
      )}
      onClick={close}
      {...props}
    />
  )
})
SidebarOverlay.displayName = "SidebarOverlay"

// Main Sidebar Component with improved animation
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
          <h2 className="text-lg font-semibold">Menu</h2>
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

// Sidebar Content
export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 space-y-4", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

// Sidebar Menu Components
export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
))
SidebarGroup.displayName = "SidebarGroup"

export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium text-gray-500 uppercase tracking-wide", className)}
    {...props}
  />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("space-y-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean
  }
>(({ className, asChild, ...props }, ref) => {
  if (asChild) {
    return (
      <div
        className={cn(
          "flex items-center w-full px-3 py-2 text-left text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors",
          className
        )}
      >
        {props.children}
      </div>
    )
  }

  return (
    <button
      ref={ref}
      className={cn(
        "flex items-center w-full px-3 py-2 text-left text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"
