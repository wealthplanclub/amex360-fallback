
import * as React from "react"
import { transactionFilterService } from "@/services/transaction"
import { transactionCacheService } from "@/services/calculationsCache"

export const useTransactionCalculations = (selectedTimeRange: string) => {
  const [filteredTransactions, setFilteredTransactions] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Load filtered transactions from the centralized service
  React.useEffect(() => {
    const loadTransactions = async () => {
      setIsLoading(true)
      try {
        const transactions = await transactionFilterService.getTransactionsForCalculations(selectedTimeRange)
        setFilteredTransactions(transactions)
      } catch (error) {
        console.error('Error loading transactions for calculations:', error)
        setFilteredTransactions([])
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [selectedTimeRange])

  // Calculate totals based on filtered transactions only - with page-specific caching
  const calculations = React.useMemo(() => {
    if (isLoading || filteredTransactions.length === 0) {
      return {
        totalExpenses: 0,
        totalCredits: 0,
        paymentsToExpensesRatio: "0.0",
        topCardSpend: 0,
        lowestCardSpend: 0,
        topCardPercentage: "0.0",
        lowestCardPercentage: "0.0",
        topCardDisplayName: "",
        lowestCardDisplayName: "",
        topCardAccount: "",
        lowestCardAccount: ""
      }
    }

    return transactionCacheService.getCachedCalculations(
      'transaction',
      { selectedTimeRange },
      filteredTransactions,
      () => {
        console.log("Calculating stats from filtered transactions:", filteredTransactions.length);
        
        // Calculate expenses (positive amounts - actual spending)
        const expenses = filteredTransactions.filter(transaction => transaction.amount > 0);
        const totalExpenses = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);
        
        // Calculate credits/payments (negative amounts - payments made)
        const credits = filteredTransactions.filter(transaction => transaction.amount < 0);
        const totalCredits = credits.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

        // Calculate payments to expenses ratio
        const paymentsToExpensesRatio = totalExpenses > 0 ? ((totalCredits / totalExpenses) * 100).toFixed(1) : "0.0";

        // Calculate card expenses grouped by account (only positive amounts for spending)
        const cardExpenses = expenses.reduce((acc, transaction) => {
          const account = transaction.account_type || transaction.account;
          if (!acc[account]) {
            acc[account] = 0;
          }
          acc[account] += transaction.amount;
          return acc;
        }, {} as Record<string, number>);

        console.log("Card expenses by account:", cardExpenses);

        // Fix: Explicitly type the values as number[] to avoid 'unknown' type issues
        const cardExpenseValues = Object.values(cardExpenses) as number[];
        const topCardSpend = cardExpenseValues.length > 0 ? Math.max(...cardExpenseValues) : 0;
        const lowestCardSpend = cardExpenseValues.length > 0 ? Math.min(...cardExpenseValues) : 0;
        const topCardPercentage = totalExpenses > 0 ? ((topCardSpend / totalExpenses) * 100).toFixed(1) : "0.0";
        const lowestCardPercentage = totalExpenses > 0 ? ((lowestCardSpend / totalExpenses) * 100).toFixed(1) : "0.0";

        // Find the account names for highest and lowest spending
        const topCardAccount = Object.entries(cardExpenses).find(([_, amount]) => amount === topCardSpend)?.[0] || "";
        const lowestCardAccount = Object.entries(cardExpenses).find(([_, amount]) => amount === lowestCardSpend)?.[0] || "";

        // Remove "card" and "Rewards" from account names
        const topCardDisplayName = topCardAccount.replace(/\b(card|Rewards)\b/gi, '').trim();
        const lowestCardDisplayName = lowestCardAccount.replace(/\b(card|Rewards)\b/gi, '').trim();

        console.log("Calculation results:", {
          totalExpenses,
          totalCredits,
          topCardSpend,
          lowestCardSpend,
          topCardDisplayName,
          lowestCardDisplayName,
          topCardAccount,
          lowestCardAccount
        });

        return {
          totalExpenses,
          totalCredits,
          paymentsToExpensesRatio,
          topCardSpend,
          lowestCardSpend,
          topCardPercentage,
          lowestCardPercentage,
          topCardDisplayName,
          lowestCardDisplayName,
          topCardAccount,
          lowestCardAccount
        };
      }
    )
  }, [filteredTransactions, selectedTimeRange, isLoading]);

  return calculations;
}
