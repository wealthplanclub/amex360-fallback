
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { CreditMaxStatCards } from "@/components/creditmax/CreditMaxStatCards"
import { CreditMaxTransactionSection } from "@/components/creditmax/CreditMaxTransactionSection"
import { CreditMaxCounterpartySection } from "@/components/creditmax/CreditMaxCounterpartySection"
import { staticSwapData } from "@/data/staticSwapData"
import { parseSwapData } from "@/utils/swapParser"
import { useCreditMaxFilters } from "@/hooks/useCreditMaxFilters"

const CreditMax = () => {
  // Parse the static swap data into proper format
  const swapTransactions = parseSwapData(staticSwapData)

  // Use the custom hook for all filter logic
  const {
    filters,
    updateFilter,
    uniqueCounterparties,
    filteredTransactions,
    hasAnyFilter,
    handleClearAllFilters,
    handleCounterpartyDropdownChange,
    handleCounterpartyClick,
    getTransactionsToShow,
    getFilterDisplayText,
    getCounterpartyDropdownDisplayText
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

          {/* Transaction Section and Counterparty Section */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CreditMaxTransactionSection
              filteredTransactions={filteredTransactions}
              hasAnyFilter={hasAnyFilter}
              getFilterDisplayText={getFilterDisplayText}
              handleClearAllFilters={handleClearAllFilters}
              globalFilter={filters.globalFilter}
              onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
              getCounterpartyDropdownDisplayText={getCounterpartyDropdownDisplayText}
              uniqueCounterparties={uniqueCounterparties}
              handleCounterpartyDropdownChange={handleCounterpartyDropdownChange}
            />
            
            <CreditMaxCounterpartySection
              selectedCounterparty={filters.selectedCounterparty}
              handleCounterpartyClick={handleCounterpartyClick}
              transactionsToShow={getTransactionsToShow()}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default CreditMax
