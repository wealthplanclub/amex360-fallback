
import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { AppHeader } from "@/components/AppHeader"
import { EmployeeHeader } from "@/components/employee/EmployeeHeader"
import { EmployeeMetricsCards } from "@/components/employee/EmployeeMetricsCards"
import { EmployeeTransactionSection } from "@/components/employee/EmployeeTransactionSection"
import { EmployeeCardSection } from "@/components/employee/EmployeeCardSection"
import { EmployeeBonusProvider } from "@/hooks/useEmployeeBonusContext"
import { useEmployeeFilters } from "@/hooks/useEmployeeFilters"
import { staticEmpData } from "@/data/staticEmpData"
import { parseEmployeeData } from "@/utils/employeeParser"
import { PageLoader } from "@/components/PageLoader"

const Employee = () => {
  const [isLoading, setIsLoading] = React.useState(true)

  // Parse the static employee data into proper format
  const employeeTransactions = parseEmployeeData(staticEmpData)
  
  // Use the custom hook for all filter logic
  const {
    filters,
    updateFilter,
    uniqueCardTypes,
    filteredTransactions,
    hasAnyFilter,
    handleClearAllFilters,
    handleCardDropdownChange,
    handleCardClick,
    getCardsToShow,
    getFilterDisplayText,
    getCardDropdownDisplayText
  } = useEmployeeFilters(employeeTransactions)

  // Show PageLoader while loading
  if (isLoading) {
    return <PageLoader onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          
          <EmployeeBonusProvider>
            <div className="max-w-7xl mx-auto px-6 mb-8">
              <EmployeeHeader />
              
              {/* Employee Metrics Cards */}
              <div className="mt-8">
                <EmployeeMetricsCards 
                  filteredTransactions={filteredTransactions}
                  selectedCardType={filters.selectedCardType}
                  selectedLastFive={filters.selectedLastFive}
                />
              </div>
              
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <EmployeeTransactionSection
                  filteredTransactions={filteredTransactions}
                  hasAnyFilter={hasAnyFilter}
                  getFilterDisplayText={getFilterDisplayText}
                  handleClearAllFilters={handleClearAllFilters}
                  globalFilter={filters.globalFilter}
                  onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
                  getCardDropdownDisplayText={getCardDropdownDisplayText}
                  uniqueCardTypes={uniqueCardTypes}
                  handleCardDropdownChange={handleCardDropdownChange}
                />
                
                <EmployeeCardSection
                  selectedLastFive={filters.selectedLastFive}
                  handleCardClick={handleCardClick}
                  cardsToShow={getCardsToShow()}
                  selectedCardType={filters.selectedCardType}
                />
              </div>
            </div>
          </EmployeeBonusProvider>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Employee
