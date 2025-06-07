import { Transaction } from "@/types/transaction"
import { FilterState } from "@/hooks/useFilterState"
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"

export class TransactionFilterService {
  private static instance: TransactionFilterService
  private allTransactions: Transaction[]

  private constructor() {
    // Parse and cache all transactions once
    const rawTransactions = parseTransactionData(staticTxnData)
    this.allTransactions = rawTransactions
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((transaction, index) => ({
        id: `txn-${index}`,
        ...transaction
      }))
  }

  public static getInstance(): TransactionFilterService {
    if (!TransactionFilterService.instance) {
      TransactionFilterService.instance = new TransactionFilterService()
    }
    return TransactionFilterService.instance
  }

  public getAllTransactions(): Transaction[] {
    return this.allTransactions
  }

  public getFilteredTransactions(filters: FilterState): Transaction[] {
    let filtered = [...this.allTransactions]
    
    console.log("All transactions count:", filtered.length)
    console.log("Current filters:", filters)
    
    // Apply either time range OR date filter (mutually exclusive)
    if (filters.selectedDate) {
      // If a specific date is selected, use only that date
      filtered = this.applyDateFilter(filtered, filters.selectedDate)
      console.log("After date filter:", filtered.length)
    } else {
      // Otherwise, apply time range filter
      filtered = this.applyTimeRangeFilter(filtered, filters.selectedTimeRange)
      console.log("After time range filter:", filtered.length)
    }
    
    // Apply card filter
    filtered = this.applyCardFilter(filtered, filters.selectedCard)
    console.log("After card filter:", filtered.length)
    
    // Apply expense/credit filters
    filtered = this.applyExpenseCreditFilters(filtered, filters)
    console.log("After expense/credit filter:", filtered.length)
    
    return filtered
  }

  private applyTimeRangeFilter(transactions: Transaction[], timeRange?: string): Transaction[] {
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

  private applyCardFilter(transactions: Transaction[], selectedCard?: string): Transaction[] {
    if (!selectedCard || selectedCard === "all") {
      return transactions
    }
    
    if (selectedCard === 'BUSINESS_GREEN_COMBINED') {
      return transactions.filter(transaction => 
        transaction.account.toLowerCase().includes('business green rewards')
      )
    }
    
    return transactions.filter(transaction => 
      transaction.account === selectedCard
    )
  }

  private applyDateFilter(transactions: Transaction[], selectedDate?: string): Transaction[] {
    if (!selectedDate) {
      return transactions
    }
    
    console.log("Target date for filtering:", selectedDate)
    return transactions.filter(transaction => {
      console.log("Comparing:", transaction.date, "with", selectedDate)
      return transaction.date === selectedDate
    })
  }

  private applyExpenseCreditFilters(transactions: Transaction[], filters: FilterState): Transaction[] {
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
        transaction.amount < 0 && transaction.account === filters.topCardFilter
      )
    }
    
    // Apply lowest card filter
    if (filters.lowestCardFilter) {
      filtered = filtered.filter(transaction => 
        transaction.amount < 0 && transaction.account === filters.lowestCardFilter
      )
    }
    
    return filtered
  }

  public getUniqueCardAccounts(): string[] {
    const uniqueCards = Array.from(new Set(this.allTransactions.map(t => t.account)))
      .filter(card => card.length > 0)
      .sort()
    return uniqueCards
  }

  public getTransactionsForCalculations(timeRange: string): Transaction[] {
    return this.getFilteredTransactions({ 
      selectedCard: "all", 
      globalFilter: "", 
      selectedTimeRange: timeRange 
    })
  }

  public getDailySpendingData(timeRange: string): Array<{ date: string; totalSpend: number }> {
    const transactions = this.getTransactionsForCalculations(timeRange)
    
    // Group transactions by date and calculate daily spending
    const dailySpending = transactions
      .filter(transaction => transaction.amount < 0) // Only expenses
      .reduce((acc, transaction) => {
        const date = transaction.date
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += Math.abs(transaction.amount)
        return acc
      }, {} as Record<string, number>)

    // Convert to array and sort by date
    return Object.entries(dailySpending)
      .map(([date, totalSpend]) => ({
        date,
        totalSpend: Math.round(totalSpend * 100) / 100
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }
}

// Export singleton instance
export const transactionFilterService = TransactionFilterService.getInstance()
