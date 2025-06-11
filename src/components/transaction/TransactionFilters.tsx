
import { Transaction } from "@/types/transaction"
import { FilterState } from "@/hooks/useFilterState"

export class TransactionFilters {
  public static applyTimeRangeFilter(transactions: Transaction[], timeRange?: string): Transaction[] {
    if (!timeRange || timeRange === "ytd") {
      const today = new Date()
      const startDate = new Date(today.getFullYear(), 0, 1)
      const startDateString = startDate.toISOString().split('T')[0]
      return transactions.filter(transaction => transaction.date >= startDateString)
    }
    
    const today = new Date()
    let startDate: Date
    
    if (timeRange === "90d") {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 90)
    } else if (timeRange === "30d") {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 30)
    } else if (timeRange === "7d") {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 7)
    } else {
      return transactions
    }
    
    const startDateString = startDate.toISOString().split('T')[0]
    return transactions.filter(transaction => transaction.date >= startDateString)
  }

  public static applyCardFilter(transactions: Transaction[], selectedCard?: string): Transaction[] {
    if (!selectedCard || selectedCard === "all") {
      return transactions
    }
    
    if (selectedCard === 'BUSINESS_GREEN_COMBINED') {
      return transactions.filter(transaction => 
        (transaction.account || transaction.account_type)?.toLowerCase().includes('business green rewards')
      )
    }
    
    return transactions.filter(transaction => 
      transaction.account === selectedCard || transaction.account_type === selectedCard
    )
  }

  public static applyDateFilter(transactions: Transaction[], selectedDate?: string): Transaction[] {
    if (!selectedDate) {
      return transactions
    }
    
    console.log("Target date for filtering:", selectedDate)
    return transactions.filter(transaction => {
      console.log("Comparing:", transaction.date, "with", selectedDate)
      return transaction.date === selectedDate
    })
  }

  public static applyExpenseCreditFilters(transactions: Transaction[], filters: FilterState): Transaction[] {
    let filtered = transactions
    
    // Apply expense filter
    if (filters.expenseFilter) {
      filtered = filtered.filter(transaction => transaction.amount < 0)
    }
    
    // Apply credit filter
    if (filters.creditFilter) {
      filtered = filtered.filter(transaction => transaction.amount > 0)
    }
    
    // Apply top card filter
    if (filters.topCardFilter) {
      filtered = filtered.filter(transaction => 
        transaction.amount < 0 && (transaction.account === filters.topCardFilter || transaction.account_type === filters.topCardFilter)
      )
    }
    
    // Apply lowest card filter
    if (filters.lowestCardFilter) {
      filtered = filtered.filter(transaction => 
        transaction.amount < 0 && (transaction.account === filters.lowestCardFilter || transaction.account_type === filters.lowestCardFilter)
      )
    }
    
    return filtered
  }
}
