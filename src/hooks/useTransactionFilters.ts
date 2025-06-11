
import * as React from "react"
import { Transaction } from "@/types/transaction"
import { FilterState } from "@/hooks/useFilterState"
import { transactionFilterService } from "@/services/transaction"

export function useTransactionFilters({ filters }: { filters: FilterState }): Transaction[] {
  const [transactions, setTransactions] = React.useState<Transaction[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true)
      try {
        const filteredTransactions = await transactionFilterService.getFilteredTransactions(filters)
        setTransactions(filteredTransactions)
      } catch (error) {
        console.error('Error loading filtered transactions:', error)
        setTransactions([])
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [filters])

  return transactions
}
