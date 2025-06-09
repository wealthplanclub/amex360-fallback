
import * as React from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./SidebarContext"

export const SidebarOverlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen, close } = useSidebar()

  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out",
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none",
        className
      )}
      onClick={close}
      {...props}
    />
  )
})
SidebarOverlay.displayName = "SidebarOverlay"
