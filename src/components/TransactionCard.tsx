
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

interface TransactionCardProps {
  cardAccountSelection?: string | null;
  selectedDate?: string;
  onClearDateFilter?: () => void;
  selectedTimeRange?: string;
  onClearTimeRangeFilter?: () => void;
  onDropdownChange?: (cardSelection: string) => void;
  statCardFilter?: {
    cardType: string
    timeRange: string
    topCardAccount?: string
  } | null;
  onClearStatCardFilter?: () => void;
}

export function TransactionCard({ 
  cardAccountSelection,
  selectedDate, 
  onClearDateFilter,
  selectedTimeRange,
  onClearTimeRangeFilter,
  onDropdownChange,
  statCardFilter,
  onClearStatCardFilter
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

  const [selectedCard, setSelectedCard] = React.useState<string>("all")
  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  // Handle card account selection from CardAccounts component
  React.useEffect(() => {
    if (cardAccountSelection) {
      console.log("Card account selection received:", cardAccountSelection);
      setSelectedCard(cardAccountSelection);
    }
  }, [cardAccountSelection]);

  const handleCardChange = (card: string) => {
    setSelectedCard(card);
    if (onDropdownChange) {
      onDropdownChange(card);
    }
  };

  // Filter transactions using the custom hook
  const transactions = useTransactionFilters({
    allTransactions,
    selectedCard,
    selectedDate,
    statCardFilter,
    selectedTimeRange
  })

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <TransactionCardHeader
        selectedDate={selectedDate}
        onClearDateFilter={onClearDateFilter}
        statCardFilter={statCardFilter}
        onClearStatCardFilter={onClearStatCardFilter}
        selectedTimeRange={selectedTimeRange}
        onClearTimeRangeFilter={onClearTimeRangeFilter}
      />
      <CardContent>
        <div className="w-full">
          <TransactionCardControls
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
            selectedCard={selectedCard}
            creditCards={creditCards}
            onCardChange={handleCardChange}
            statCardFilter={statCardFilter}
          />
          <TransactionTable
            transactions={transactions}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
          />
        </div>
      </CardContent>
    </Card>
  )
}
