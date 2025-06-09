
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { CreditMaxStatCards } from "@/components/creditmax/CreditMaxStatCards"
import { CounterpartyList } from "@/components/creditmax/CounterpartyList"
import { SwapTransactionSection } from "@/components/creditmax/SwapTransactionSection"
import { staticSwapData } from "@/data/staticSwapData"
import { parseSwapData } from "@/utils/swapParser"
import { useCreditMaxFilters } from "@/hooks/useCreditMaxFilters"

const CreditMax = () => {
  // Parse the static swap data into proper format
  const swapTransactions = parseSwapData(staticSwapData)

  // Use custom hook for filtering
  const {
    filters,
    filteredTransactions,
    uniqueCounterparties,
    hasAnyFilter,
    getFilterDisplayText,
    handleCounterpartyClick,
    handleCounterpartyDropdownChange,
    handleClearAllFilters,
    updateFilter
  } = useCreditMaxFilters(swapTransactions)

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
          
          {/* CreditMax Stat Cards */}
          <div className="mt-8">
            <CreditMaxStatCards 
              swapTransactions={swapTransactions}
            />
          </div>

          {/* Main Content - Counterparty List and Transaction Table */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Counterparty List */}
            <div className="lg:col-span-1">
              <CounterpartyList 
                selectedCounterparty={filters.selectedCard}
                onCounterpartyClick={handleCounterpartyClick}
                transactions={swapTransactions}
              />
            </div>

            {/* Transaction Table */}
            <SwapTransactionSection
              filteredTransactions={filteredTransactions}
              hasAnyFilter={hasAnyFilter}
              getFilterDisplayText={getFilterDisplayText}
              handleClearAllFilters={handleClearAllFilters}
              globalFilter={filters.globalFilter}
              onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
              selectedCounterparty={filters.selectedCard || "all"}
              uniqueCounterparties={uniqueCounterparties}
              handleCounterpartyDropdownChange={handleCounterpartyDropdownChange}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default CreditMax
