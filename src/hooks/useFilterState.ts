
import { useState, useCallback } from 'react'

export interface FilterState {
  selectedCard: string
  globalFilter: string
  selectedDate?: string
  selectedTimeRange: string
  expenseFilter?: boolean
  creditFilter?: boolean
  topCardFilter?: string
  lowestCardFilter?: string
}

export function useFilterState(initialTimeRange: string = "ytd") {
  const [filters, setFilters] = useState<FilterState>({
    selectedCard: "all",
    globalFilter: "",
    selectedTimeRange: initialTimeRange,
  })

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [])

  const updateMultipleFilters = useCallback((updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }))
  }, [])

  const clearFilter = useCallback((key: keyof FilterState) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      delete newFilters[key]
      return newFilters
    })
  }, [])

  const clearAllFilters = useCallback((keepTimeRange: boolean = true) => {
    setFilters(prev => ({
      selectedCard: "all",
      globalFilter: "",
      selectedTimeRange: keepTimeRange ? prev.selectedTimeRange : "ytd",
    }))
  }, [])

  return {
    filters,
    updateFilter,
    updateMultipleFilters,
    clearFilter,
    clearAllFilters
  }
}
