
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
import { filterTransactionsByTimeRange } from "@/utils/cardDataUtils"

interface TransactionCardProps {
  selectedCardFromGrid?: string;
  selectedDate?: string;
  onClearDateFilter?: () => void;
  statCardFilter?: {type: string, value?: string} | null;
}

export function TransactionCard({ selectedCardFromGrid, selectedDate, onClearDateFilter, statCardFilter }: TransactionCardProps) {
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

  // Find the account name that matches the stat card filter
  const findAccountByDisplayName = (displayName: string) => {
    return creditCards.find(account => {
      const cleanedAccount = account.replace(/\b(card|Rewards)\b/gi, '').trim();
      return cleanedAccount === displayName;
    });
  };

  // Filter transactions by selected card, date, and stat card filter
  const transactions = React.useMemo(() => {
    let filtered = allTransactions;
    
    console.log("All transactions count:", filtered.length);
    console.log("Selected card:", selectedCard);
    console.log("Selected date:", selectedDate);
    console.log("Stat card filter:", statCardFilter);

    // Apply stat card filter first if present
    if (statCardFilter) {
      const timeRangeFiltered = filterTransactionsByTimeRange(filtered, "ytd"); // Use current time range
      
      if (statCardFilter.type === "expenses") {
        filtered = timeRangeFiltered.filter(transaction => transaction.amount < 0);
      } else if (statCardFilter.type === "credits") {
        filtered = timeRangeFiltered.filter(transaction => transaction.amount > 0);
      } else if (statCardFilter.type === "topCard" && statCardFilter.value) {
        const accountName = findAccountByDisplayName(statCardFilter.value);
        if (accountName) {
          filtered = timeRangeFiltered.filter(transaction => 
            transaction.account === accountName && transaction.amount < 0
          );
        }
      } else if (statCardFilter.type === "lowestCard" && statCardFilter.value) {
        const accountName = findAccountByDisplayName(statCardFilter.value);
        if (accountName) {
          filtered = timeRangeFiltered.filter(transaction => 
            transaction.account === accountName && transaction.amount < 0
          );
        }
      }
    } else {
      // Regular card filtering logic
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
    }
    
    console.log("After card/stat filter:", filtered.length);
    
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
  }, [allTransactions, selectedCard, selectedDate, statCardFilter, creditCards]);

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Transaction History</CardTitle>
        <CardDescription className="mb-0">
          Latest transaction activity with advanced filtering and sorting
          {statCardFilter && (
            <span className="block text-blue-600 font-medium mt-1">
              Filtered by: {statCardFilter.type === "expenses" ? "All Expenses" : 
                          statCardFilter.type === "credits" ? "All Credits" :
                          statCardFilter.type === "topCard" ? `Top Card (${statCardFilter.value})` :
                          statCardFilter.type === "lowestCard" ? `Lowest Card (${statCardFilter.value})` : ""}
            </span>
          )}
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
            {!statCardFilter && (
              <CardFilterDropdown
                selectedCard={selectedCard}
                creditCards={creditCards}
                onCardChange={setSelectedCard}
              />
            )}
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
