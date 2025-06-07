
import * as React from "react"
import { cn } from "@/lib/utils"

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
