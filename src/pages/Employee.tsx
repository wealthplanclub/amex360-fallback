
import React from "react"
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
  const [showLottie, setShowLottie] = React.useState(false)

  React.useEffect(() => {
    // Load the loading-geo-a animation
    fetch("/loading-geo-a.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error))

    // a. delay loading by .5 seconds
    const initialDelay = setTimeout(() => {
      // b. start lottie
      setShowLottie(true)
      
      // c. load page for 2 seconds while lottie plays
      // d. only render page after lottie plays for 2 seconds
      const lottieTimer = setTimeout(() => {
        setIsLoading(false)
        // Start showing content with staggered animations
        setTimeout(() => setShowContent(true), 100)
      }, 2000)

      return () => clearTimeout(lottieTimer)
    }, 500)

    return () => clearTimeout(initialDelay)
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
          {animationData && showLottie && (
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
  )
}

export default Employee
