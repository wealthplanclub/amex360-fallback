import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { EmployeeTransactionTable } from "@/components/employee/EmployeeTransactionTable"
import { EmployeeCardList } from "@/components/employee/EmployeeCardList"
import { useFilterState } from "@/hooks/useFilterState"
import { staticEmpData } from "@/data/staticEmpData"
import { parseEmployeeData } from "@/utils/employeeParser"

const Employee = () => {
  const { filters, updateFilter } = useFilterState()
  
  // Parse the static employee data into proper format
  const employeeTransactions = parseEmployeeData(staticEmpData)

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <div className="flex justify-center items-center">
                  <img 
                    src="https://i.imgur.com/1fFddP4.png" 
                    alt="Amex Logo" 
                    className="mx-auto"
                    style={{ width: '276px' }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card List */}
                <div className="lg:col-span-1">
                  <EmployeeCardList 
                    selectedCard={filters.selectedCard}
                    onCardClick={(card) => updateFilter('selectedCard', card)}
                    transactions={employeeTransactions}
                  />
                </div>
                
                {/* Transaction Table */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg border">
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-semibold">Employee Transactions</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        View and manage employee card transactions
                      </p>
                    </div>
                    <div className="p-6">
                      <EmployeeTransactionTable
                        transactions={employeeTransactions}
                        globalFilter={filters.globalFilter}
                        onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Employee
