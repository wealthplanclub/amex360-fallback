
import * as React from "react"
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"

export const useChartData = (timeRange: string) => {
  // Process transaction data to get daily spending totals
  const processedData = React.useMemo(() => {
    const transactions = parseTransactionData(staticTxnData)
    
    // Group transactions by date and calculate daily spending
    const dailySpending = transactions
      .filter(transaction => transaction.amount < 0) // Only expenses
      .reduce((acc, transaction) => {
        const date = transaction.date // Date is already in YYYY-MM-DD format
        if (!acc[date]) {
          acc[date] = 0
        }
        acc[date] += Math.abs(transaction.amount)
        return acc
      }, {} as Record<string, number>)

    // Convert to array and sort by date
    return Object.entries(dailySpending)
      .map(([date, totalSpend]) => ({
        date,
        totalSpend: Math.round(totalSpend * 100) / 100 // Round to 2 decimal places
      }))
      .sort((a, b) => a.date.localeCompare(b.date)) // Simple string comparison for ISO dates
  }, [])

  const filteredData = React.useMemo(() => {
    if (processedData.length === 0) return []
    
    // Get the latest date from the data
    const latestDate = processedData[processedData.length - 1].date
    
    let startDate: string
    const today = new Date(latestDate)
    
    if (timeRange === "ytd") {
      // Year to date - start from January 1st of the current year
      startDate = `${today.getFullYear()}-01-01`
    } else if (timeRange === "90d") {
      const date90DaysAgo = new Date(today)
      date90DaysAgo.setDate(date90DaysAgo.getDate() - 90)
      startDate = date90DaysAgo.toISOString().split('T')[0]
    } else if (timeRange === "30d") {
      const date30DaysAgo = new Date(today)
      date30DaysAgo.setDate(date30DaysAgo.getDate() - 30)
      startDate = date30DaysAgo.toISOString().split('T')[0]
    } else if (timeRange === "7d") {
      const date7DaysAgo = new Date(today)
      date7DaysAgo.setDate(date7DaysAgo.getDate() - 7)
      startDate = date7DaysAgo.toISOString().split('T')[0]
    } else {
      startDate = processedData[0].date
    }
    
    return processedData.filter(item => item.date >= startDate)
  }, [processedData, timeRange])

  const totalSpendForPeriod = filteredData.reduce((sum, item) => sum + item.totalSpend, 0)
  const averageDailySpend = filteredData.length > 0 ? totalSpendForPeriod / filteredData.length : 0

  return {
    filteredData,
    averageDailySpend
  }
}
