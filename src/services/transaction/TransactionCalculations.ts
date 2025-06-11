
import { Transaction } from "@/types/transaction"

export class TransactionCalculations {
  public static getDailySpendingData(
    transactions: Transaction[], 
    timeRange: string
  ): Array<{ date: string; totalSpend: number }> {
    // Group transactions by date and calculate daily spending (negative amounts only - expenses)
    const dailySpending = transactions
      .filter(transaction => transaction.amount < 0) // Only expenses (negative amounts)
      .reduce((acc, transaction) => {
        const date = transaction.date
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += Math.abs(transaction.amount) // Convert to positive for display
        return acc
      }, {} as Record<string, number>)

    // Convert to array and sort by date
    return Object.entries(dailySpending)
      .map(([date, totalSpend]) => ({
        date,
        totalSpend: Math.round(totalSpend * 100) / 100
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }
}
