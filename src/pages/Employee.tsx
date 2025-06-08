import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { EmployeeTransactionTable } from "@/components/employee/EmployeeTransactionTable"
import { EmployeeCardList } from "@/components/employee/EmployeeCardList"
import { useFilterState } from "@/hooks/useFilterState"
import { staticEmpData } from "@/data/staticEmpData"
import { parseEmployeeData } from "@/utils/employeeParser"
import { Input } from "@/components/ui/input"
import { CardFilterDropdown } from "@/components/transaction/CardFilterDropdown"
import { X } from "lucide-react"

const Employee = () => {
  const { filters, updateFilter } = useFilterState()
  
  // Parse the static employee data into proper format
  const employeeTransactions = parseEmployeeData(staticEmpData)

  // Get unique card types for the dropdown
  const uniqueCardTypes = React.useMemo(() => {
    const cardTypes = new Set<string>()
    employeeTransactions.forEach(transaction => {
      cardTypes.add(transaction.card_type)
    })
    return Array.from(cardTypes).sort()
  }, [employeeTransactions])

  // Filter transactions based on selected card type
  const filteredTransactions = React.useMemo(() => {
    if (!filters.selectedCard || filters.selectedCard === "all") {
      return employeeTransactions
    }
    
    return employeeTransactions.filter(transaction => transaction.card_type === filters.selectedCard)
  }, [employeeTransactions, filters.selectedCard])

  const hasCardFilter = filters.selectedCard && filters.selectedCard !== "all"

  const handleClearCardFilter = () => {
    updateFilter('selectedCard', 'all')
  }

  const getFilterDisplayText = () => {
    if (!hasCardFilter) return ""
    return filters.selectedCard
  }

  const handleCardDropdownChange = (cardSelection: string) => {
    updateFilter('selectedCard', cardSelection)
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          
          <div className="max-w-7xl mx-auto px-6 mb-8">
            {/* Header with Logo */}
            <div className="flex justify-center items-center">
              <img 
                src="https://i.imgur.com/1fFddP4.png" 
                alt="Amex Logo" 
                className="mx-auto"
                style={{ width: '276px' }}
              />
            </div>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Transaction Table */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-b from-white to-gray-100 rounded-lg border">
                  <div className="p-6 pb-2">
                    <h2 className="text-xl font-semibold">Employee Transactions</h2>
                    {!hasCardFilter && (
                      <p className="text-sm text-muted-foreground mt-1">
                        View and manage employee card transactions
                      </p>
                    )}
                    {hasCardFilter && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                          Filtered by: {getFilterDisplayText()}
                          <button 
                            onClick={handleClearCardFilter}
                            className="hover:bg-gray-200 rounded p-0.5"
                            title="Clear filter"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      </div>
                    )}
                    
                    {/* Filter Controls moved to header */}
                    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
                      <Input
                        placeholder="Search descriptions..."
                        value={filters.globalFilter ?? ""}
                        onChange={(event) => updateFilter('globalFilter', event.target.value)}
                        className="max-w-sm"
                      />
                      <CardFilterDropdown
                        selectedCard={filters.selectedCard}
                        creditCards={uniqueCardTypes}
                        onCardChange={handleCardDropdownChange}
                      />
                    </div>
                  </div>
                  
                  <div className="px-6 pb-6">
                    <EmployeeTransactionTable
                      transactions={filteredTransactions}
                      globalFilter={filters.globalFilter}
                      onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Card List */}
              <div className="lg:col-span-1">
                <EmployeeCardList 
                  selectedCard={filters.selectedCard}
                  onCardClick={(card) => updateFilter('selectedCard', card)}
                  transactions={employeeTransactions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Employee
