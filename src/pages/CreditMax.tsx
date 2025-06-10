import React, { useState, useEffect } from "react"
import { CreditMaxStatCards } from "@/components/creditmax/CreditMaxStatCards"
import { CreditMaxQuickMetrics } from "@/components/creditmax/CreditMaxQuickMetrics"
import { CreditMaxChartDisplay } from "@/components/creditmax/CreditMaxChartDisplay"
import { CounterpartyList } from "@/components/creditmax/CounterpartyList"
import { SwapTransactionSection } from "@/components/creditmax/SwapTransactionSection"
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

  // Use custom hook for filtering - now includes time range
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
    updateFilter,
    timeFilteredTransactions
  } = useCreditMaxFilters(swapTransactions, selectedTimeRange)

  const handleTimeRangeChange = (timeRange: string) => {
    setSelectedTimeRange(timeRange)
  }

  const handleTimeRangeClear = () => {
    setSelectedTimeRange("ytd")
  }

  const handleDateClick = (date: string) => {
    console.log("Date clicked:", date)
    // You can add date filtering logic here if needed
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
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
    <div className="flex-1">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        {/* Logo removed - now in persistent app header */}
        
        {/* CreditMax Stat Cards - reduced top margin */}
        <div className="mt-2">
          <CreditMaxStatCards 
            swapTransactions={counterpartyFilteredTransactions}
          />
        </div>

        {/* Quick Metrics Cards - now using time-filtered transactions */}
        <div className="mt-8">
          <CreditMaxQuickMetrics swapTransactions={counterpartyFilteredTransactions} />
        </div>

        {/* Chart */}
        <div className="mt-8">
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
            onTimeRangeClear={handleTimeRangeClear}
          />

          {/* Counterparty List - now using time-filtered transactions */}
          <div className="lg:col-span-1">
            <CounterpartyList 
              selectedCounterparty={filters.selectedCard}
              onCounterpartyClick={handleCounterpartyClick}
              transactions={timeFilteredTransactions}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditMax
