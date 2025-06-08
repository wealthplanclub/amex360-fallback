
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { EmployeeTransactionTable } from "@/components/employee/EmployeeTransactionTable"
import { EmployeeCardList } from "@/components/employee/EmployeeCardList"
import { useFilterState } from "@/hooks/useFilterState"
import { staticEmpData } from "@/data/staticEmpData"
import { parseEmployeeData } from "@/utils/employeeParser"
import { X } from "lucide-react"

const Employee = () => {
  const { filters, updateFilter } = useFilterState()
  
  // Parse the static employee data into proper format
  const employeeTransactions = parseEmployeeData(staticEmpData)

  // Filter transactions based on selected card (now by last 5 digits)
  const filteredTransactions = React.useMemo(() => {
    if (!filters.selectedCard || filters.selectedCard === "all") {
      return employeeTransactions
    }
    
    return employeeTransactions.filter(transaction => transaction.last_five === filters.selectedCard)
  }, [employeeTransactions, filters.selectedCard])

  const hasCardFilter = filters.selectedCard && filters.selectedCard !== "all"

  const handleClearCardFilter = () => {
    updateFilter('selectedCard', 'all')
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
                <div className="bg-white rounded-lg border">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Employee Transactions</h2>
                    {!hasCardFilter && (
                      <p className="text-sm text-muted-foreground mt-1">
                        View and manage employee card transactions
                      </p>
                    )}
                    {hasCardFilter && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                          Filtered by card ending in: {filters.selectedCard}
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
                  </div>
                  <div className="p-6">
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
