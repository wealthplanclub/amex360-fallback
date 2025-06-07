
"use client"

import * as React from "react"
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Transaction } from "@/types/transaction"
import { formatAccountName } from "@/utils/transactionUtils"
import { DateFilterIndicator } from "@/components/transaction/DateFilterIndicator"
import { CardFilterDropdown } from "@/components/transaction/CardFilterDropdown"
import { TransactionTable } from "@/components/transaction/TransactionTable"

interface TransactionCardProps {
  selectedCardFromGrid?: string;
  selectedDate?: string;
  onClearDateFilter?: () => void;
}

export function TransactionCard({ selectedCardFromGrid, selectedDate, onClearDateFilter }: TransactionCardProps) {
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

  // Sync with the card selected from the grid
  React.useEffect(() => {
    if (selectedCardFromGrid && selectedCardFromGrid !== "all") {
      setSelectedCard(selectedCardFromGrid);
    }
  }, [selectedCardFromGrid]);

  // Filter transactions by selected card and date
  const transactions = React.useMemo(() => {
    let filtered = allTransactions;
    
    console.log("All transactions count:", filtered.length);
    console.log("Selected card:", selectedCard);
    console.log("Selected date:", selectedDate);
    
    // Filter by card
    if (selectedCard !== "all") {
      if (selectedCard === 'BUSINESS_GREEN_COMBINED') {
        filtered = filtered.filter(transaction => 
          transaction.account.toLowerCase().includes('business green rewards')
        )
      } else {
        // Direct comparison using the original account name
        filtered = filtered.filter(transaction => 
          transaction.account === selectedCard
        )
      }
    }
    
    console.log("After card filter:", filtered.length);
    
    // Filter by date if selected - now using simple string comparison since dates are in ISO format
    if (selectedDate) {
      console.log("Target date for filtering:", selectedDate);
      
      filtered = filtered.filter(transaction => {
        console.log("Comparing:", transaction.date, "with", selectedDate);
        return transaction.date === selectedDate;
      });
      
      console.log("After date filter:", filtered.length);
      console.log("Sample filtered transactions:", filtered.slice(0, 3));
    }
    
    return filtered;
  }, [allTransactions, selectedCard, selectedDate]);

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Transaction History</CardTitle>
        <CardDescription className="mb-0">
          Latest transaction activity with advanced filtering and sorting
        </CardDescription>
        {selectedDate && onClearDateFilter && (
          <DateFilterIndicator 
            selectedDate={selectedDate} 
            onClear={onClearDateFilter}
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Search descriptions and amounts..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
            <CardFilterDropdown
              selectedCard={selectedCard}
              creditCards={creditCards}
              onCardChange={setSelectedCard}
            />
          </div>
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
