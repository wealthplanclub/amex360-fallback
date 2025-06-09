
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { CreditMaxStatCards } from "@/components/creditmax/CreditMaxStatCards"
import { staticSwapData } from "@/data/staticSwapData"
import { parseSwapData } from "@/utils/swapParser"

const CreditMax = () => {
  // Parse the static swap data into proper format
  const swapTransactions = parseSwapData(staticSwapData)

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          
          <div className="max-w-7xl mx-auto mb-8">
            {/* Amex Logo */}
            <div className="flex flex-col items-center gap-6">
              <img 
                src="https://i.imgur.com/1fFddP4.png" 
                alt="Amex Logo" 
                className="mx-auto"
                style={{ width: '276px' }}
              />
            </div>
            
            {/* CreditMax Stat Cards */}
            <div className="mt-8">
              <CreditMaxStatCards 
                swapTransactions={swapTransactions}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default CreditMax
