
import React from 'react'
import { useFilterState } from './useFilterState'
import { EmployeeTransaction } from '@/components/employee/EmployeeTransactionColumns'

export function useEmployeeFilters(employeeTransactions: EmployeeTransaction[]) {
  const { filters, updateFilter, updateMultipleFilters } = useFilterState()

  // Get unique card types for the dropdown
  const uniqueCardTypes = React.useMemo(() => {
    const cardTypes = new Set<string>()
    employeeTransactions.forEach(transaction => {
      cardTypes.add(transaction.card_type)
    })
    return Array.from(cardTypes).sort()
  }, [employeeTransactions])

  // Filter transactions based on current state
  const filteredTransactions = React.useMemo(() => {
    let filtered = employeeTransactions

    // State B: Filter by card type only
    if (filters.selectedCardType && filters.selectedCardType !== "all" && (!filters.selectedLastFive || filters.selectedLastFive === "all")) {
      filtered = filtered.filter(transaction => transaction.card_type === filters.selectedCardType)
    }
    
    // State C: Filter by both card type and last five (must match both)
    if (filters.selectedCardType && filters.selectedCardType !== "all" && filters.selectedLastFive && filters.selectedLastFive !== "all") {
      filtered = filtered.filter(transaction => 
        transaction.card_type === filters.selectedCardType && transaction.last_five === filters.selectedLastFive
      )
    }

    return filtered
  }, [employeeTransactions, filters.selectedCardType, filters.selectedLastFive])

  // Determine current state
  const isStateA = (!filters.selectedCardType || filters.selectedCardType === "all") && (!filters.selectedLastFive || filters.selectedLastFive === "all")
  const isStateB = (filters.selectedCardType && filters.selectedCardType !== "all") && (!filters.selectedLastFive || filters.selectedLastFive === "all")
  const isStateC = (filters.selectedCardType && filters.selectedCardType !== "all") && (filters.selectedLastFive && filters.selectedLastFive !== "all")

  const hasAnyFilter = !isStateA

  const handleClearAllFilters = () => {
    updateMultipleFilters({
      selectedCardType: 'all',
      selectedLastFive: 'all'
    })
  }

  const handleCardDropdownChange = (cardSelection: string) => {
    if (cardSelection === "all") {
      // Go to State A - show all cards
      updateMultipleFilters({
        selectedCardType: 'all',
        selectedLastFive: 'all'
      })
    } else {
      // Go to State B - show card group
      updateMultipleFilters({
        selectedCardType: cardSelection,
        selectedLastFive: 'all'
      })
    }
  }

  const handleCardClick = (lastFive: string) => {
    if (isStateC && filters.selectedLastFive === lastFive) {
      // Currently on State C with this card selected - go back to State B
      updateMultipleFilters({
        selectedLastFive: 'all'
      })
    } else {
      // Find the card type for this last five to ensure they match
      const transaction = employeeTransactions.find(t => t.last_five === lastFive)
      const cardType = transaction?.card_type
      
      if (cardType) {
        // Go to State C - show specific card (card type + last five)
        updateMultipleFilters({
          selectedCardType: cardType,
          selectedLastFive: lastFive
        })
      }
    }
  }

  // Calculate which cards to show in the list based on current state
  const getCardsToShow = () => {
    if (isStateA) {
      // State A: Show all cards
      return employeeTransactions
    } else if (isStateB) {
      // State B: Show only cards of the selected type
      return employeeTransactions.filter(t => t.card_type === filters.selectedCardType)
    } else {
      // State C: Show only the selected card (matching both type and last five)
      return employeeTransactions.filter(t => 
        t.card_type === filters.selectedCardType && t.last_five === filters.selectedLastFive
      )
    }
  }

  const getFilterDisplayText = () => {
    if (isStateA) {
      return ""
    } else if (isStateB) {
      return filters.selectedCardType || ""
    } else if (isStateC) {
      return `${filters.selectedCardType}, ${filters.selectedLastFive}`
    }
    return ""
  }

  const getCardDropdownDisplayText = () => {
    if (isStateA) {
      return "all"
    } else if (isStateB) {
      return filters.selectedCardType || "all"
    } else if (isStateC) {
      return `${filters.selectedCardType} (${filters.selectedLastFive})`
    }
    return "all"
  }

  return {
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
  }
}
