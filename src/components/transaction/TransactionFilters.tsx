
import * as React from "react"
import { Transaction } from "@/types/transaction"

interface TransactionFiltersProps {
  allTransactions: Transaction[]
  selectedCard: string
  selectedDate?: string
  statCardFilter?: {
    cardType: string
    timeRange: string
    topCardAccount?: string
  } | null
  selectedTimeRange?: string
}

export function useTransactionFilters({
  allTransactions,
  selectedCard,
  selectedDate,
  statCardFilter,
  selectedTimeRange
}: TransactionFiltersProps) {
  return React.useMemo(() => {
    let filtered = allTransactions
    
    console.log("All transactions count:", filtered.length)
    console.log("Selected card:", selectedCard)
    console.log("Selected date:", selectedDate)
    console.log("Stat card filter:", statCardFilter)
    console.log("Selected time range:", selectedTimeRange)
    
    // Apply stat card filter first if it exists
    if (statCardFilter) {
      // Filter by time range
      const today = new Date()
      let startDate: Date
      
      if (statCardFilter.timeRange === "ytd") {
        startDate = new Date(today.getFullYear(), 0, 1)
      } else if (statCardFilter.timeRange === "90d") {
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 90)
      } else if (statCardFilter.timeRange === "30d") {
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 30)
      } else if (statCardFilter.timeRange === "7d") {
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 7)
      } else {
        startDate = new Date(today.getFullYear(), 0, 1) // Default to YTD
      }
      
      const startDateString = startDate.toISOString().split('T')[0]
      filtered = filtered.filter(transaction => transaction.date >= startDateString)
      
      // Filter by card type
      if (statCardFilter.cardType === "expenses") {
        filtered = filtered.filter(transaction => transaction.amount < 0)
      } else if (statCardFilter.cardType === "credits") {
        filtered = filtered.filter(transaction => transaction.amount > 0)
      } else if (statCardFilter.cardType === "top-card") {
        // Filter by expenses AND by the top card account
        filtered = filtered.filter(transaction => 
          transaction.amount < 0 && transaction.account === statCardFilter.topCardAccount
        )
      } else if (statCardFilter.cardType === "lowest-card") {
        // Filter by expenses AND by the lowest card account
        filtered = filtered.filter(transaction => 
          transaction.amount < 0 && transaction.account === statCardFilter.topCardAccount
        )
      }
      
      console.log("After stat card filter:", filtered.length)
      return filtered
    }

    // Apply time range filter if selected (when no stat card filter is active)
    if (selectedTimeRange && selectedTimeRange !== "ytd") {
      const today = new Date()
      let startDate: Date
      
      if (selectedTimeRange === "90d") {
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 90)
      } else if (selectedTimeRange === "30d") {
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 30)
      } else if (selectedTimeRange === "7d") {
        startDate = new Date(today)
        startDate.setDate(startDate.getDate() - 7)
      } else {
        startDate = new Date(today.getFullYear(), 0, 1) // Default to YTD
      }
      
      const startDateString = startDate.toISOString().split('T')[0]
      filtered = filtered.filter(transaction => transaction.date >= startDateString)
      
      console.log("After time range filter:", filtered.length)
    }
    
    // Regular filtering logic when no stat card filter is active
    // Filter by card
    if (selectedCard !== "all") {
      if (selectedCard === 'BUSINESS_GREEN_COMBINED') {
        filtered = filtered.filter(transaction => 
          transaction.account.toLowerCase().includes('business green rewards')
        )
      } else {
        // Direct comparison using the original account name
        filtered = filtered.filter(transaction => 
          transaction.account === selectedCard
        )
      }
    }
    
    console.log("After card filter:", filtered.length)
    
    // Filter by date if selected - now using simple string comparison since dates are in ISO format
    if (selectedDate) {
      console.log("Target date for filtering:", selectedDate)
      
      filtered = filtered.filter(transaction => {
        console.log("Comparing:", transaction.date, "with", selectedDate)
        return transaction.date === selectedDate
      })
      
      console.log("After date filter:", filtered.length)
      console.log("Sample filtered transactions:", filtered.slice(0, 3))
    }
    
    return filtered
  }, [allTransactions, selectedCard, selectedDate, statCardFilter, selectedTimeRange])
}
