
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
  onCardAccountSelectionChange?: (selection: string | null) => void;
  selectedDate?: string;
  onClearDateFilter?: () => void;
  statCardFilter?: {
    cardType: string;
    timeRange: string;
    topCardAccount?: string;
  } | null;
  onClearStatCardFilter?: () => void;
  selectedTimeRange?: string;
  onClearTimeRangeFilter?: () => void;
}

export function TransactionCard({ 
  cardAccountSelection,
  onCardAccountSelectionChange,
  selectedDate, 
  onClearDateFilter,
  statCardFilter,
  onClearStatCardFilter,
  selectedTimeRange,
  onClearTimeRangeFilter
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

  // Handle card selection changes and notify parent
  const handleCardChange = (card: string) => {
    setSelectedCard(card);
    if (onCardAccountSelectionChange) {
      onCardAccountSelectionChange(card === "all" ? null : card);
    }
  };

  // Sync internal state with external cardAccountSelection
  React.useEffect(() => {
    if (cardAccountSelection) {
      setSelectedCard(cardAccountSelection);
    } else {
      setSelectedCard("all");
    }
  }, [cardAccountSelection]);

  // Sync with stat card filter
  React.useEffect(() => {
    if (statCardFilter?.cardType === "top-card" && statCardFilter.topCardAccount) {
      setSelectedCard(statCardFilter.topCardAccount);
    } else if (statCardFilter?.cardType === "lowest-card" && statCardFilter.topCardAccount) {
      setSelectedCard(statCardFilter.topCardAccount);
    }
  }, [statCardFilter]);

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
