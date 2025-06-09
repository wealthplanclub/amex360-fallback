
import React, { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { CreditMaxStatCards } from "@/components/creditmax/CreditMaxStatCards"
import { CreditMaxQuickMetrics } from "@/components/creditmax/CreditMaxQuickMetrics"
import { CounterpartyList } from "@/components/creditmax/CounterpartyList"
import { SwapTransactionSection } from "@/components/creditmax/SwapTransactionSection"
import { DashboardLoader } from "@/components/dashboard/DashboardLoader"
import { staticSwapData } from "@/data/staticSwapData"
import { parseSwapData } from "@/utils/swapParser"
import { useCreditMaxFilters } from "@/hooks/useCreditMaxFilters"

const CreditMax = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    // Load the loading-circle-sm animation
    const loadAnimation = async () => {
      try {
        const response = await fetch('/loading-circle-sm.json')
        const data = await response.json()
        setAnimationData(data)
      } catch (error) {
        console.error('Failed to load animation:', error)
      }
    }

    loadAnimation()

    // Show loading for 0.5 seconds like other pages
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Parse the static swap data into proper format
  const swapTransactions = parseSwapData(staticSwapData)

  // Use custom hook for filtering
  const {
    filters,
    counterpartyFilteredTransactions,
    tableFilteredTransactions,
    uniqueCounterparties,
    hasAnyFilter,
    getFilterDisplayText,
    handleCounterpartyClick,
    handleCounterpartyDropdownChange,
    handleClearAllFilters,
    updateFilter
  } = useCreditMaxFilters(swapTransactions)

  if (isLoading) {
    return <DashboardLoader animationData={animationData} />
  }

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen w-full"
        style={{
          backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
          backgroundRepeat: 'repeat'
        }}
      >
        <AppSidebar />
        <AppHeader />
        
        <div className="max-w-7xl mx-auto px-6 mb-8">
          {/* Amex Logo */}
          <div className="flex flex-col items-center gap-6">
            <img 
              src="https://i.imgur.com/1fFddP4.png" 
              alt="Amex Logo" 
              className="mx-auto"
              style={{ width: '276px' }}
            />
          </div>
          
          {/* CreditMax Stat Cards - using counterparty filtered transactions only */}
          <div className="mt-8">
            <CreditMaxStatCards 
              swapTransactions={counterpartyFilteredTransactions}
            />
          </div>

          {/* Quick Metrics Cards */}
          <div className="mt-8">
            <CreditMaxQuickMetrics swapTransactions={counterpartyFilteredTransactions} />
          </div>

          {/* Main Content - Transaction Table and Counterparty List */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transaction Table */}
            <SwapTransactionSection
              filteredTransactions={tableFilteredTransactions}
              hasAnyFilter={hasAnyFilter}
              getFilterDisplayText={getFilterDisplayText}
              handleClearAllFilters={handleClearAllFilters}
              selectedCounterparty={filters.selectedCard || "all"}
              uniqueCounterparties={uniqueCounterparties}
              handleCounterpartyDropdownChange={handleCounterpartyDropdownChange}
            />

            {/* Counterparty List */}
            <div className="lg:col-span-1">
              <CounterpartyList 
                selectedCounterparty={filters.selectedCard}
                onCounterpartyClick={handleCounterpartyClick}
                transactions={swapTransactions}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default CreditMax
