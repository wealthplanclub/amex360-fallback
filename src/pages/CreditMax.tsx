
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { CreditMaxHeader } from "@/components/creditmax/CreditMaxHeader"

const CreditMax = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <CreditMaxHeader />
            
            {/* Main content area - ready for components */}
            <div className="mt-8">
              <p className="text-gray-600">CreditMax page ready for development</p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default CreditMax
