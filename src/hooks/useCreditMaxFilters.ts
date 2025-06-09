
import { useFilterState } from './useFilterState'
import { SwapTransaction } from '@/utils/swapParser'
import { useMemo } from 'react'

export function useCreditMaxFilters(swapTransactions: SwapTransaction[]) {
  const { filters, updateFilter, clearAllFilters } = useFilterState()

  // Get unique counterparties
  const uniqueCounterparties = useMemo(() => {
    const counterparties = Array.from(new Set(swapTransactions.map(t => t.counterparty)))
    return counterparties.sort()
  }, [swapTransactions])

  // Filter transactions based on selected counterparty
  const filteredTransactions = useMemo(() => {
    let filtered = swapTransactions

    if (filters.selectedCard && filters.selectedCard !== "all") {
      filtered = filtered.filter(t => t.counterparty === filters.selectedCard)
    }

    return filtered
  }, [swapTransactions, filters.selectedCard])

  // Check if any filter is active
  const hasAnyFilter = useMemo(() => {
    return filters.selectedCard && filters.selectedCard !== "all"
  }, [filters.selectedCard])

  // Get filter display text
  const getFilterDisplayText = () => {
    if (!hasAnyFilter) return ""
    return filters.selectedCard || ""
  }

  // Handle counterparty selection from list
  const handleCounterpartyClick = (counterparty: string) => {
    updateFilter('selectedCard', counterparty)
  }

  // Handle counterparty dropdown change
  const handleCounterpartyDropdownChange = (counterparty: string) => {
    updateFilter('selectedCard', counterparty)
  }

  // Clear all filters
  const handleClearAllFilters = () => {
    clearAllFilters(true)
  }

  return {
    filters,
    filteredTransactions,
    uniqueCounterparties,
    hasAnyFilter,
    getFilterDisplayText,
    handleCounterpartyClick,
    handleCounterpartyDropdownChange,
    handleClearAllFilters,
    updateFilter
  }
}
