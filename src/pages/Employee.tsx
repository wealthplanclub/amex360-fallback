
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
  const { filters, updateFilter, updateMultipleFilters } = useFilterState()
  
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

  // Filter transactions based on selected card type and last five
  const filteredTransactions = React.useMemo(() => {
    let filtered = employeeTransactions

    // Filter by card type if selected
    if (filters.selectedCardType && filters.selectedCardType !== "all") {
      filtered = filtered.filter(transaction => transaction.card_type === filters.selectedCardType)
    }

    // Filter by last five if selected
    if (filters.selectedLastFive && filters.selectedLastFive !== "all") {
      filtered = filtered.filter(transaction => transaction.last_five === filters.selectedLastFive)
    }

    return filtered
  }, [employeeTransactions, filters.selectedCardType, filters.selectedLastFive])

  // Determine current filter layer and states
  const isLayer1 = (!filters.selectedCardType || filters.selectedCardType === "all") && (!filters.selectedLastFive || filters.selectedLastFive === "all")
  const isLayer2 = (filters.selectedCardType && filters.selectedCardType !== "all") && (!filters.selectedLastFive || filters.selectedLastFive === "all")
  const isLayer3 = (filters.selectedCardType && filters.selectedCardType !== "all") && (filters.selectedLastFive && filters.selectedLastFive !== "all")

  const hasCardTypeFilter = filters.selectedCardType && filters.selectedCardType !== "all"
  const hasLastFiveFilter = filters.selectedLastFive && filters.selectedLastFive !== "all"
  const hasAnyFilter = hasCardTypeFilter || hasLastFiveFilter

  const handleClearAllFilters = () => {
    updateMultipleFilters({
      selectedCardType: 'all',
      selectedLastFive: 'all',
      selectedCard: 'all'
    })
  }

  const handleClearCardTypeFilter = () => {
    updateMultipleFilters({
      selectedCardType: 'all',
      selectedCard: 'all'
    })
  }

  const handleClearLastFiveFilter = () => {
    updateMultipleFilters({
      selectedLastFive: 'all',
      selectedCard: 'all'
    })
  }

  const getFilterDisplayText = () => {
    const parts = []
    if (hasCardTypeFilter) {
      parts.push(filters.selectedCardType)
    }
    if (hasLastFiveFilter) {
      parts.push(filters.selectedLastFive)
    }
    return parts.join(', ')
  }

  const getCardDropdownDisplayText = () => {
    if (hasLastFiveFilter && hasCardTypeFilter) {
      return `${filters.selectedCardType} (${filters.selectedLastFive})`
    }
    if (hasCardTypeFilter) {
      return filters.selectedCardType
    }
    return "all"
  }

  const handleCardDropdownChange = (cardSelection: string) => {
    if (cardSelection === "all") {
      // Go to Layer 1 - show all cards
      updateMultipleFilters({
        selectedCardType: 'all',
        selectedLastFive: 'all',
        selectedCard: 'all'
      })
    } else {
      // Go to Layer 2 - show card group
      updateMultipleFilters({
        selectedCardType: cardSelection,
        selectedLastFive: 'all',
        selectedCard: cardSelection
      })
    }
  }

  const handleCardClick = (lastFive: string) => {
    if (lastFive === 'all') {
      // This shouldn't happen in the new logic, but handle it just in case
      updateMultipleFilters({
        selectedLastFive: 'all',
        selectedCard: filters.selectedCardType || 'all'
      })
    } else {
      // Find the card type for this last five
      const transaction = employeeTransactions.find(t => t.last_five === lastFive)
      const cardType = transaction?.card_type
      
      // Check current state to determine what layer to go to
      if (isLayer3 && filters.selectedLastFive === lastFive) {
        // Currently on Layer 3 with this card selected - go back to Layer 2
        updateMultipleFilters({
          selectedLastFive: 'all',
          selectedCardType: cardType || 'all',
          selectedCard: cardType || 'all'
        })
      } else {
        // Go to Layer 3 - show individual card
        updateMultipleFilters({
          selectedLastFive: lastFive,
          selectedCardType: cardType || 'all',
          selectedCard: lastFive
        })
      }
    }
  }

  // Calculate which cards to show in the list based on current layer
  const getCardsToShow = () => {
    if (isLayer1) {
      // Layer 1: Show all cards
      return employeeTransactions
    } else if (isLayer2) {
      // Layer 2: Show only cards of the selected type
      return employeeTransactions.filter(t => t.card_type === filters.selectedCardType)
    } else {
      // Layer 3: Show only the selected card
      return employeeTransactions.filter(t => t.last_five === filters.selectedLastFive)
    }
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
                    {!hasAnyFilter && (
                      <p className="text-sm text-muted-foreground mt-1">
                        View and manage employee card transactions
                      </p>
                    )}
                    {hasAnyFilter && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                          Filtered by: {getFilterDisplayText()}
                          <button 
                            onClick={handleClearAllFilters}
                            className="hover:bg-gray-200 rounded p-0.5"
                            title="Clear all filters"
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
                        selectedCard={getCardDropdownDisplayText()}
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
                  selectedCard={filters.selectedLastFive}
                  onCardClick={handleCardClick}
                  transactions={getCardsToShow()}
                  selectedCardType={filters.selectedCardType}
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
