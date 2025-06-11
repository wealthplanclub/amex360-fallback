
import { Transaction } from "@/types/transaction"

export class TransactionCalculations {
  public static getDailySpendingData(
    transactions: Transaction[], 
    timeRange: string
  ): Array<{ date: string; totalSpend: number }> {
    // Group transactions by date and calculate daily spending (positive amounts only)
    const dailySpending = transactions
      .filter(transaction => transaction.amount > 0) // Only expenses (positive amounts)
      .reduce((acc, transaction) => {
        const date = transaction.date
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += transaction.amount
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
