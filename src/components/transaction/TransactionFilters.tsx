
import * as React from "react"
import { Transaction } from "@/types/transaction"
import { FilterState } from "@/hooks/useFilterState"

interface TransactionFiltersProps {
  allTransactions: Transaction[]
  filters: FilterState
}

export function useTransactionFilters({
  allTransactions,
  filters
}: TransactionFiltersProps) {
  return React.useMemo(() => {
    let filtered = allTransactions
    
    console.log("All transactions count:", filtered.length)
    console.log("Current filters:", filters)
    
    // Apply time range filter first
    if (filters.selectedTimeRange && filters.selectedTimeRange !== "ytd") {
      const today = new Date()
      let startDate: Date
      
      if (filters.selectedTimeRange === "90d") {
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 90)
      } else if (filters.selectedTimeRange === "30d") {
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 30)
      } else if (filters.selectedTimeRange === "7d") {
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 7)
      } else {
        startDate = new Date(today.getFullYear(), 0, 1)
      }
      
      const startDateString = startDate.toISOString().split('T')[0]
      filtered = filtered.filter(transaction => transaction.date >= startDateString)
      
      console.log("After time range filter:", filtered.length)
    }
    
    // Apply card filter
    if (filters.selectedCard !== "all") {
      if (filters.selectedCard === 'BUSINESS_GREEN_COMBINED') {
        filtered = filtered.filter(transaction => 
          transaction.account.toLowerCase().includes('business green rewards')
        )
      } else {
        filtered = filtered.filter(transaction => 
          transaction.account === filters.selectedCard
        )
      }
      console.log("After card filter:", filtered.length)
    }
    
    // Apply date filter
    if (filters.selectedDate) {
      console.log("Target date for filtering:", filters.selectedDate)
      filtered = filtered.filter(transaction => {
        console.log("Comparing:", transaction.date, "with", filters.selectedDate)
        return transaction.date === filters.selectedDate
      })
      console.log("After date filter:", filtered.length)
    }
    
    // Apply expense filter
    if (filters.expenseFilter) {
      filtered = filtered.filter(transaction => transaction.amount < 0)
      console.log("After expense filter:", filtered.length)
    }
    
    // Apply credit filter
    if (filters.creditFilter) {
      filtered = filtered.filter(transaction => transaction.amount > 0)
      console.log("After credit filter:", filtered.length)
    }
    
    // Apply top card filter
    if (filters.topCardFilter) {
      filtered = filtered.filter(transaction => 
        transaction.amount < 0 && transaction.account === filters.topCardFilter
      )
      console.log("After top card filter:", filtered.length)
    }
    
    // Apply lowest card filter
    if (filters.lowestCardFilter) {
      filtered = filtered.filter(transaction => 
        transaction.amount < 0 && transaction.account === filters.lowestCardFilter
      )
      console.log("After lowest card filter:", filtered.length)
    }
    
    return filtered
  }, [allTransactions, filters])
}
