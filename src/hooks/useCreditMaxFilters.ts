
import { useMemo } from 'react'
import { useFilterState } from './useFilterState'
import { SwapTransaction } from '@/utils/swapParser'

export function useCreditMaxFilters(transactions: SwapTransaction[]) {
  const { filters, updateFilter, clearAllFilters } = useFilterState()

  // Debug: Log raw transaction data
  console.log('Raw transactions counterparties:', transactions.map(t => t.counterparty))

  // Get unique counterparties for dropdown (should already be clean)
  const uniqueCounterparties = useMemo(() => {
    const counterparties = [...new Set(transactions.map(t => t.counterparty))]
    console.log('Unique counterparties for dropdown:', counterparties)
    return ["All counterparties", ...counterparties.sort()]
  }, [transactions])

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    // Filter by selected counterparty
    if (filters.selectedCounterparty && filters.selectedCounterparty !== "all") {
      console.log('Filtering by counterparty:', filters.selectedCounterparty)
      filtered = filtered.filter(t => {
        console.log('Comparing:', t.counterparty, 'with:', filters.selectedCounterparty)
        return t.counterparty === filters.selectedCounterparty
      })
    }

    return filtered
  }, [transactions, filters.selectedCounterparty])

  // Check if any filters are active
  const hasAnyFilter = useMemo(() => {
    return !!(
      filters.selectedCounterparty && filters.selectedCounterparty !== "all"
    )
  }, [filters.selectedCounterparty])

  // Handle counterparty click from list
  const handleCounterpartyClick = (counterparty: string) => {
    console.log('Counterparty clicked:', counterparty)
    
    if (counterparty === "all") {
      updateFilter('selectedCounterparty', undefined)
    } else {
      updateFilter('selectedCounterparty', counterparty)
    }
  }

  // Handle counterparty dropdown change
  const handleCounterpartyDropdownChange = (counterparty: string) => {
    console.log('Counterparty dropdown changed:', counterparty)
    
    if (counterparty === "All counterparties") {
      updateFilter('selectedCounterparty', undefined)
    } else {
      updateFilter('selectedCounterparty', counterparty)
    }
  }

  // Clear all filters
  const handleClearAllFilters = () => {
    clearAllFilters(true)
  }

  // Get transactions to show in counterparty list (all transactions for aggregation)
  const getTransactionsToShow = () => {
    return transactions
  }

  // Get filter display text
  const getFilterDisplayText = () => {
    const parts = []
    
    if (filters.selectedCounterparty && filters.selectedCounterparty !== "all") {
      parts.push(filters.selectedCounterparty)
    }
    
    return parts.join(', ')
  }

  // Get counterparty dropdown display text
  const getCounterpartyDropdownDisplayText = () => {
    if (filters.selectedCounterparty && filters.selectedCounterparty !== "all") {
      return filters.selectedCounterparty
    }
    return "All counterparties"
  }

  return {
    filters,
    updateFilter,
    uniqueCounterparties,
    filteredTransactions,
    hasAnyFilter,
    handleClearAllFilters,
    handleCounterpartyDropdownChange,
    handleCounterpartyClick,
    getTransactionsToShow,
    getFilterDisplayText,
    getCounterpartyDropdownDisplayText
  }
}
