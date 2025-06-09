
import { useMemo } from 'react'
import { useFilterState } from './useFilterState'
import { SwapTransaction } from '@/utils/swapParser'

export function useCreditMaxFilters(transactions: SwapTransaction[]) {
  const { filters, updateFilter, clearAllFilters } = useFilterState()

  // Get unique counterparties for dropdown (clean names without prefix)
  const uniqueCounterparties = useMemo(() => {
    const counterparties = [...new Set(transactions.map(t => t.counterparty))]
    return ["All counterparties", ...counterparties.sort()]
  }, [transactions])

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    // Filter by selected counterparty
    if (filters.selectedCounterparty && filters.selectedCounterparty !== "all") {
      filtered = filtered.filter(t => t.counterparty === filters.selectedCounterparty)
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

  // Handle counterparty dropdown change (remove any business prefix)
  const handleCounterpartyDropdownChange = (counterparty: string) => {
    console.log('Counterparty dropdown changed:', counterparty)
    
    // Clean the counterparty name by removing any business prefix
    let cleanCounterparty = counterparty
    if (counterparty.startsWith('business ')) {
      cleanCounterparty = counterparty.replace('business ', '')
    }
    
    if (cleanCounterparty === "All counterparties") {
      updateFilter('selectedCounterparty', undefined)
    } else {
      updateFilter('selectedCounterparty', cleanCounterparty)
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

  // Get filter display text (clean without prefix)
  const getFilterDisplayText = () => {
    const parts = []
    
    if (filters.selectedCounterparty && filters.selectedCounterparty !== "all") {
      parts.push(filters.selectedCounterparty)
    }
    
    return parts.join(', ')
  }

  // Get counterparty dropdown display text (clean without prefix)
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
