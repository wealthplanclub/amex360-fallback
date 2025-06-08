
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { CreditMaxHeader } from "@/components/creditmax/CreditMaxHeader"
import { CreditMaxStatCards } from "@/components/creditmax/CreditMaxStatCards"
import { CreditMaxTable } from "@/components/creditmax/CreditMaxTable"
import { CreditMaxCounterpartyList } from "@/components/creditmax/CreditMaxCounterpartyList"
import { staticSwapData } from "@/data/staticSwapData"
import { parseSwapData } from "@/utils/swapParser"
import Lottie from "lottie-react"

const CreditMax = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [animationData, setAnimationData] = React.useState(null)
  const [showContent, setShowContent] = React.useState(false)

  React.useEffect(() => {
    // Load the loading-geo-a animation
    fetch("/loading-geo-a.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error))

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Start showing content with staggered animations
      setTimeout(() => setShowContent(true), 100)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Parse the static swap data into proper format
  const swapTransactions = parseSwapData(staticSwapData)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {animationData && (
            <Lottie
              animationData={animationData}
              className="w-32 h-32 mx-auto"
              loop={true}
              autoplay={true}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <CreditMaxHeader />
            
            {/* CreditMax Stat Cards */}
            <div className="mt-8">
              <CreditMaxStatCards 
                swapTransactions={swapTransactions}
              />
            </div>
            
            {/* Table Section and Counterparty List with staggered fade-in animations */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="bg-gradient-to-b from-white to-gray-100 rounded-lg border">
                  <div className="p-6 pb-2">
                    <h2 className="text-xl font-semibold">CreditMax Transactions</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      View and filter swap transaction activity
                    </p>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <CreditMaxTable
                      transactions={swapTransactions}
                    />
                  </div>
                </div>
              </div>
              
              <div className={`lg:col-span-1 transition-all duration-700 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <CreditMaxCounterpartyList
                  transactions={swapTransactions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default CreditMax
