
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
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((transaction, index) => ({
        id: `txn-${index}`,
        ...transaction
      }));
  }, []);

  // Extract unique credit cards
  const creditCards = React.useMemo(() => {
    const uniqueCards = Array.from(new Set(allTransactions.map(t => formatAccountName(t.account))))
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
    console.log("Selected date:", selectedDate);
    
    // Filter by card
    if (selectedCard !== "all") {
      if (selectedCard === 'BUSINESS_GREEN_COMBINED') {
        filtered = filtered.filter(transaction => 
          transaction.account.toLowerCase().includes('business green rewards')
        )
      } else {
        filtered = filtered.filter(transaction => 
          transaction.account === selectedCard
        )
      }
    }
    
    console.log("After card filter:", filtered.length);
    
    // Filter by date if selected
    if (selectedDate) {
      // Convert selectedDate to the same format as transaction dates
      const targetDate = new Date(selectedDate).toISOString().split('T')[0];
      console.log("Target date for filtering:", targetDate);
      
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date).toISOString().split('T')[0];
        console.log("Comparing:", transactionDate, "with", targetDate);
        return transactionDate === targetDate;
      });
      
      console.log("After date filter:", filtered.length);
      console.log("Sample filtered transactions:", filtered.slice(0, 3));
    }
    
    return filtered;
  }, [allTransactions, selectedCard, selectedDate]);

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
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
