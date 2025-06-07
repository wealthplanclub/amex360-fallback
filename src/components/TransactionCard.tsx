
"use client"

import * as React from "react"
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
import { transactionFilterService } from "@/services/transactionFilterService"

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
  // Get unique credit cards from the service
  const creditCards = React.useMemo(() => {
    return transactionFilterService.getUniqueCardAccounts()
  }, []);

  const handleCardChange = (card: string) => {
    if (onDropdownChange) {
      onDropdownChange(card);
    }
  };

  // Filter transactions using the centralized service
  const transactions = useTransactionFilters({ filters })

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
