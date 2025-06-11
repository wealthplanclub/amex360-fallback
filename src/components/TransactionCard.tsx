
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Transaction } from "@/types/transaction"
import { TransactionCardHeader } from "@/components/transaction/TransactionCardHeader"
import { TransactionCardControls } from "@/components/transaction/TransactionCardControls"
import { TransactionTable } from "@/components/transaction/TransactionTable"
import { FilterState } from "@/hooks/useFilterState"
import { transactionFilterService } from "@/services/transaction"

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
  const [transactions, setTransactions] = React.useState<Transaction[]>([])
  const [creditCards, setCreditCards] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Load data when component mounts or filters change
  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Load filtered transactions
        const filteredTransactions = await transactionFilterService.getFilteredTransactions(filters)
        setTransactions(filteredTransactions)
        
        // Load unique card accounts
        const cards = await transactionFilterService.getUniqueCardAccounts()
        setCreditCards(cards)
      } catch (error) {
        console.error('Error loading transaction data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [filters])

  const handleCardChange = (card: string) => {
    if (onDropdownChange) {
      onDropdownChange(card);
    }
  };

  // Determine what filters are active for the header
  const hasStatCardFilter = !!(filters.expenseFilter || filters.creditFilter || filters.topCardFilter || filters.lowestCardFilter);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-b from-white to-gray-100">
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-muted-foreground">Loading transactions...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

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
