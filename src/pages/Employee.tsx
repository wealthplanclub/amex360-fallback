
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
import Lottie from "lottie-react"

const Employee = () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [animationData, setAnimationData] = React.useState(null)
  const [showContent, setShowContent] = React.useState(false)

  React.useEffect(() => {
    // Load the cube-loader animation
    fetch("/cube-loader.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error))

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Start showing content with staggered animations
      setTimeout(() => setShowContent(true), 100)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {animationData && (
            <Lottie
              animationData={animationData}
              className="w-32 h-32 mx-auto"
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
              
              {/* Transaction Section and Card Section with staggered fade-in animations */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
                </div>
                
                <div className={`lg:col-span-1 transition-all duration-700 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <EmployeeCardSection
                    selectedLastFive={filters.selectedLastFive}
                    handleCardClick={handleCardClick}
                    cardsToShow={getCardsToShow()}
                    selectedCardType={filters.selectedCardType}
                  />
                </div>
              </div>
            </div>
          </EmployeeBonusProvider>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Employee
