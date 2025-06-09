
import React, { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { CreditMaxStatCards } from "@/components/creditmax/CreditMaxStatCards"
import { CreditMaxQuickMetrics } from "@/components/creditmax/CreditMaxQuickMetrics"
import { CreditMaxChartDisplay } from "@/components/creditmax/CreditMaxChartDisplay"
import { CounterpartyList } from "@/components/creditmax/CounterpartyList"
import { SwapTransactionSection } from "@/components/creditmax/SwapTransactionSection"
import { DashboardLoader } from "@/components/dashboard/DashboardLoader"
import { staticSwapData } from "@/data/staticSwapData"
import { parseSwapData } from "@/utils/swapParser"
import { useCreditMaxFilters } from "@/hooks/useCreditMaxFilters"
import Lottie from "lottie-react"

const CreditMax = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [animationData, setAnimationData] = useState(null)
  const [showLottie, setShowLottie] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("ytd")

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

    // a. delay loading by .5 seconds
    const initialDelay = setTimeout(() => {
      // b. start lottie
      setShowLottie(true)
      
      // c. load page for 2 seconds while lottie plays
      // d. only render page after lottie plays for 2 seconds
      const lottieTimer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)

      return () => clearTimeout(lottieTimer)
    }, 500)

    return () => clearTimeout(initialDelay)
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

  // Check if a specific counterparty is selected (not "all")
  const isSpecificCounterpartySelected = filters.selectedCard && filters.selectedCard !== "all"

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange)
  }

  const handleDateClick = (date: string) => {
    console.log("Date clicked:", date)
    // You can add date filtering logic here if needed
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {animationData && showLottie && (
            <Lottie
              animationData={animationData}
              className="w-40 h-40 mx-auto"
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

          {/* Chart with Smooth Slide Animation */}
          <div 
            className={`mt-8 transition-all duration-500 ease-in-out transform ${
              isSpecificCounterpartySelected 
                ? 'opacity-0 -translate-y-4 max-h-0 overflow-hidden' 
                : 'opacity-100 translate-y-0 max-h-[1000px]'
            }`}
          >
            <CreditMaxChartDisplay
              swapTransactions={counterpartyFilteredTransactions}
              selectedTimeRange={selectedTimeRange}
              onTimeRangeChange={handleTimeRangeChange}
              onDateClick={handleDateClick}
            />
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
