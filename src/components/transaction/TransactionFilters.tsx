
import * as React from "react"
import { Transaction } from "@/types/transaction"
import { FilterState } from "@/hooks/useFilterState"
import { transactionFilterService } from "@/services/transactionFilterService"

interface TransactionFiltersProps {
  allTransactions: Transaction[]
  filters: FilterState
}

export function useTransactionFilters({
  filters
}: Omit<TransactionFiltersProps, 'allTransactions'>) {
  return React.useMemo(() => {
    return transactionFilterService.getFilteredTransactions(filters)
  }, [filters])
}
