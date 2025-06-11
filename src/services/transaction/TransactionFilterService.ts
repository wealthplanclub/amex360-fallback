
import { Transaction } from "@/types/transaction"
import { FilterState } from "@/hooks/useFilterState"
import { TransactionDataProcessor } from "./TransactionDataProcessor"
import { TransactionFilters } from "./TransactionFilters"
import { TransactionCalculations } from "./TransactionCalculations"

export class TransactionFilterService {
  private static instance: TransactionFilterService
  private allTransactions: Transaction[] = []
  private isLoaded: boolean = false

  private constructor() {
    // Initialize empty - load data async
  }

  public static getInstance(): TransactionFilterService {
    if (!TransactionFilterService.instance) {
      TransactionFilterService.instance = new TransactionFilterService()
    }
    return TransactionFilterService.instance
  }

  public async loadTransactions(): Promise<void> {
    if (this.isLoaded) return
    
    console.log("Loading transactions from database...")
    this.allTransactions = await TransactionDataProcessor.processTransactions()
    this.isLoaded = true
    console.log(`Loaded ${this.allTransactions.length} transactions`)
  }

  public getAllTransactions(): Transaction[] {
    return this.allTransactions
  }

  public async getFilteredTransactions(filters: FilterState): Promise<Transaction[]> {
    await this.loadTransactions()
    
    let filtered = [...this.allTransactions]
    
    console.log("All transactions count:", filtered.length)
    console.log("Current filters:", filters)
    
    // Apply either time range OR date filter (mutually exclusive)
    if (filters.selectedDate) {
      // If a specific date is selected, use only that date
      filtered = TransactionFilters.applyDateFilter(filtered, filters.selectedDate)
      console.log("After date filter:", filtered.length)
    } else {
      // Otherwise, apply time range filter
      filtered = TransactionFilters.applyTimeRangeFilter(filtered, filters.selectedTimeRange)
      console.log("After time range filter:", filtered.length)
    }
    
    // Apply card filter with account_type grouping
    filtered = this.applyCardFilterWithAccountType(filtered, filters.selectedCard)
    console.log("After card filter:", filtered.length)
    
    // Apply expense/credit filters
    filtered = TransactionFilters.applyExpenseCreditFilters(filtered, filters)
    console.log("After expense/credit filter:", filtered.length)
    
    return filtered
  }

  private applyCardFilterWithAccountType(transactions: Transaction[], selectedCard?: string): Transaction[] {
    if (!selectedCard || selectedCard === "all") {
      return transactions
    }
    
    // Extract account_type from the card selection (remove last_five info if present)
    const accountType = selectedCard.includes('(') 
      ? selectedCard.split(' (')[0] 
      : selectedCard
    
    return transactions.filter(transaction => 
      transaction.account_type === accountType
    )
  }

  public async getUniqueCardAccounts(): Promise<string[]> {
    return await TransactionDataProcessor.getUniqueCardAccounts()
  }

  public async getTransactionsForCalculations(timeRange: string): Promise<Transaction[]> {
    return await this.getFilteredTransactions({ 
      selectedCard: "all", 
      globalFilter: "", 
      selectedTimeRange: timeRange 
    })
  }

  public async getDailySpendingData(timeRange: string): Promise<Array<{ date: string; totalSpend: number }>> {
    const transactions = await this.getTransactionsForCalculations(timeRange)
    return TransactionCalculations.getDailySpendingData(transactions, timeRange)
  }
}
