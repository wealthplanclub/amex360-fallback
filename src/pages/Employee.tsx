
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
import { Skeleton } from "@/components/ui/skeleton"

const EmployeeSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 mb-8">
    {/* Header Skeleton */}
    <div className="mb-8">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-64" />
    </div>
    
    {/* Employee Metrics Cards Skeleton */}
    <div className="mt-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="pt-4">
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Grid Layout Skeleton */}
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Transaction Section Skeleton */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border">
          <div className="p-6 pb-2">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end mb-4">
              <div>
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
          
          <div className="px-6 pb-6">
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32 flex-1" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Section Skeleton */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border p-6">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48 mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Employee = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  
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

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <AppHeader />
            <EmployeeSkeleton />
          </div>
        </div>
      </SidebarProvider>
    );
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
