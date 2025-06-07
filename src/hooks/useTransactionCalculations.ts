
import * as React from "react"
import { transactionFilterService } from "@/services/transactionFilterService"

export const useTransactionCalculations = (selectedTimeRange: string) => {
  // Get filtered transactions from the centralized service
  const filteredTransactions = React.useMemo(() => {
    return transactionFilterService.getTransactionsForCalculations(selectedTimeRange)
  }, [selectedTimeRange]);

  // Calculate totals based on filtered transactions only
  const calculations = React.useMemo(() => {
    console.log("Calculating stats from filtered transactions:", filteredTransactions.length);
    
    // Memoize expense and credit filtering
    const expenses = React.useMemo(() => 
      filteredTransactions.filter(transaction => transaction.amount < 0),
      [filteredTransactions]
    )
    
    const credits = React.useMemo(() =>
      filteredTransactions.filter(transaction => transaction.amount > 0),
      [filteredTransactions]
    )
    
    // Calculate totals
    const totalExpenses = expenses.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    const totalCredits = credits.reduce((sum, transaction) => sum + transaction.amount, 0)

    // Calculate payments to expenses ratio
    const paymentsToExpensesRatio = totalExpenses > 0 ? ((totalCredits / totalExpenses) * 100).toFixed(1) : "0.0";

    // Calculate card expenses grouped by account (memoized)
    const cardExpenses = React.useMemo(() => 
      expenses.reduce((acc, transaction) => {
        const account = transaction.account;
        if (!acc[account]) {
          acc[account] = 0;
        }
        acc[account] += Math.abs(transaction.amount);
        return acc;
      }, {} as Record<string, number>),
      [expenses]
    )

    console.log("Card expenses by account:", cardExpenses);

    const topCardSpend = Object.keys(cardExpenses).length > 0 ? Math.max(...Object.values(cardExpenses)) : 0;
    const lowestCardSpend = Object.keys(cardExpenses).length > 0 ? Math.min(...Object.values(cardExpenses)) : 0;
    const topCardPercentage = totalExpenses > 0 ? ((topCardSpend / totalExpenses) * 100).toFixed(1) : "0.0";
    const lowestCardPercentage = totalExpenses > 0 ? ((lowestCardSpend / totalExpenses) * 100).toFixed(1) : "0.0";

    // Find the account names for highest and lowest spending (memoized)
    const topCardAccount = React.useMemo(() =>
      Object.entries(cardExpenses).find(([_, amount]) => amount === topCardSpend)?.[0] || "",
      [cardExpenses, topCardSpend]
    )
    
    const lowestCardAccount = React.useMemo(() =>
      Object.entries(cardExpenses).find(([_, amount]) => amount === lowestCardSpend)?.[0] || "",
      [cardExpenses, lowestCardSpend]
    )

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
  }, [filteredTransactions]);

  return calculations;
}
