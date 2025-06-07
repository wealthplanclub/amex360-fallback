
"use client"

import * as React from "react"
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Transaction } from "@/types/transaction"
import { TransactionCardHeader } from "@/components/transaction/TransactionCardHeader"
import { TransactionCardControls } from "@/components/transaction/TransactionCardControls"
import { useTransactionFilters } from "@/components/transaction/TransactionFilters"
import { TransactionTable } from "@/components/transaction/TransactionTable"
import { FilterState } from "@/hooks/useFilterState"

interface TransactionCardProps {
  filters: FilterState;
  onClearDateFilter?: () => void;
  onClearTimeRangeFilter?: () => void;
  onDropdownChange?: (cardSelection: string) => void;
  onClearStatCardFilter?: () => void;
  onGlobalFilterChange?: (value: string) => void;
}

export function TransactionCard({ 
  filters,
  onClearDateFilter,
  onClearTimeRangeFilter,
  onDropdownChange,
  onClearStatCardFilter,
  onGlobalFilterChange
}: TransactionCardProps) {
  // Parse the CSV data and get all transactions - memoize this to prevent re-parsing
  const allTransactions: Transaction[] = React.useMemo(() => {
    const rawTransactions = parseTransactionData(staticTxnData);
    
    return rawTransactions
      .sort((a, b) => b.date.localeCompare(a.date)) // Simple string comparison for ISO dates
      .map((transaction, index) => ({
        id: `txn-${index}`,
        ...transaction
      }));
  }, []);

  // Extract unique credit cards - store original account names for filtering
  const creditCards = React.useMemo(() => {
    const uniqueCards = Array.from(new Set(allTransactions.map(t => t.account)))
      .filter(card => card.length > 0)
      .sort()
    return uniqueCards
  }, [allTransactions]);

  const handleCardChange = (card: string) => {
    if (onDropdownChange) {
      onDropdownChange(card);
    }
  };

  // Filter transactions using the custom hook
  const transactions = useTransactionFilters({
    allTransactions,
    filters
  })

  // Determine what filters are active for the header
  const hasStatCardFilter = !!(filters.expenseFilter || filters.creditFilter || filters.topCardFilter || filters.lowestCardFilter);

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <TransactionCardHeader
        selectedDate={filters.selectedDate}
        onClearDateFilter={onClearDateFilter}
        hasStatCardFilter={hasStatCardFilter}
        onClearStatCardFilter={onClearStatCardFilter}
        selectedTimeRange={filters.selectedTimeRange}
        onClearTimeRangeFilter={onClearTimeRangeFilter}
        filters={filters}
      />
      <CardContent>
        <div className="w-full">
          <TransactionCardControls
            globalFilter={filters.globalFilter}
            onGlobalFilterChange={onGlobalFilterChange || (() => {})}
            selectedCard={filters.selectedCard}
            creditCards={creditCards}
            onCardChange={handleCardChange}
          />
          <TransactionTable
            transactions={transactions}
            globalFilter={filters.globalFilter}
            onGlobalFilterChange={onGlobalFilterChange || (() => {})}
          />
        </div>
      </CardContent>
    </Card>
  )
}
