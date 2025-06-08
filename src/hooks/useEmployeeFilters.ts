
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
      if (isLayer3 && filters.selectedLastFive === lastFive && filters.selectedCardType === cardType) {
        // Currently on Layer 3 with this exact card selected - go back to Layer 2
        updateMultipleFilters({
          selectedLastFive: 'all',
          selectedCardType: cardType || 'all',
          selectedCard: cardType || 'all'
        })
      } else {
        // Go to Layer 3 - show individual card (both type and last five)
        updateMultipleFilters({
          selectedLastFive: lastFive,
          selectedCardType: cardType || 'all',
          selectedCard: `${cardType} (${lastFive})`
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
      // Layer 3: Show only the selected card (both type and last five match)
      return employeeTransactions.filter(t => 
        t.last_five === filters.selectedLastFive && 
        t.card_type === filters.selectedCardType
      )
    }
  }

  const getFilterDisplayText = () => {
    if (hasLastFiveFilter && hasCardTypeFilter) {
      return `${filters.selectedCardType} (${filters.selectedLastFive})`
    }
    if (hasCardTypeFilter) {
      return filters.selectedCardType
    }
    if (hasLastFiveFilter) {
      return filters.selectedLastFive
    }
    return ''
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
