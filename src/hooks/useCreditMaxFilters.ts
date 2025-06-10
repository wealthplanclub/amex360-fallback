
import { useFilterState } from './useFilterState'
import { SwapTransaction } from '@/utils/swapParser'
import { useMemo } from 'react'

export function useCreditMaxFilters(swapTransactions: SwapTransaction[], selectedTimeRange: string) {
  const { filters, updateFilter, clearAllFilters } = useFilterState()

  // Get unique counterparties
  const uniqueCounterparties = useMemo(() => {
    const counterparties = Array.from(new Set(swapTransactions.map(t => t.counterparty)))
    return counterparties.sort()
  }, [swapTransactions])

  // Filter transactions by time range first
  const timeFilteredTransactions = useMemo(() => {
    if (swapTransactions.length === 0) return []
    
    const today = new Date()
    let startDate: string
    
    if (selectedTimeRange === "ytd") {
      startDate = `${today.getFullYear()}-01-01`
    } else if (selectedTimeRange === "90d") {
      const date90DaysAgo = new Date(today)
      date90DaysAgo.setDate(date90DaysAgo.getDate() - 90)
      startDate = date90DaysAgo.toISOString().split('T')[0]
    } else if (selectedTimeRange === "30d") {
      const date30DaysAgo = new Date(today)
      date30DaysAgo.setDate(date30DaysAgo.getDate() - 30)
      startDate = date30DaysAgo.toISOString().split('T')[0]
    } else if (selectedTimeRange === "7d") {
      const date7DaysAgo = new Date(today)
      date7DaysAgo.setDate(date7DaysAgo.getDate() - 7)
      startDate = date7DaysAgo.toISOString().split('T')[0]
    } else {
      return swapTransactions
    }
    
    return swapTransactions.filter(transaction => transaction.date >= startDate)
  }, [swapTransactions, selectedTimeRange])

  // Filter transactions based on selected counterparty ONLY (for stat cards)
  const counterpartyFilteredTransactions = useMemo(() => {
    let filtered = timeFilteredTransactions

    if (filters.selectedCard && filters.selectedCard !== "all") {
      filtered = filtered.filter(t => t.counterparty === filters.selectedCard)
    }

    return filtered
  }, [timeFilteredTransactions, filters.selectedCard])

  // Filter transactions for table (includes only counterparty filter)
  const tableFilteredTransactions = useMemo(() => {
    let filtered = timeFilteredTransactions

    if (filters.selectedCard && filters.selectedCard !== "all") {
      filtered = filtered.filter(t => t.counterparty === filters.selectedCard)
    }

    return filtered
  }, [timeFilteredTransactions, filters.selectedCard])

  // Check if any filter is active
  const hasAnyFilter = useMemo(() => {
    return (filters.selectedCard && filters.selectedCard !== "all") || selectedTimeRange !== "ytd"
  }, [filters.selectedCard, selectedTimeRange])

  // Get filter display text
  const getFilterDisplayText = () => {
    const filterParts = []
    
    if (filters.selectedCard && filters.selectedCard !== "all") {
      filterParts.push(filters.selectedCard)
    }
    
    if (selectedTimeRange !== "ytd") {
      const timeRangeLabels = {
        "7d": "Last 7 days",
        "30d": "Last 30 days", 
        "90d": "Last 90 days"
      }
      filterParts.push(timeRangeLabels[selectedTimeRange as keyof typeof timeRangeLabels] || selectedTimeRange)
    }
    
    return filterParts.join(", ")
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
    counterpartyFilteredTransactions,
    tableFilteredTransactions,
    timeFilteredTransactions,
    uniqueCounterparties,
    hasAnyFilter,
    getFilterDisplayText,
    handleCounterpartyClick,
    handleCounterpartyDropdownChange,
    handleClearAllFilters,
    updateFilter
  }
}
