
import * as React from "react"
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"

export interface ChartDataPoint {
  date: string
  totalSpend: number
}

export function useChartData(timeRange: string) {
  // Process transaction data to get daily spending totals
  const processedData = React.useMemo(() => {
    const transactions = parseTransactionData(staticTxnData)
    
    // Group transactions by date and calculate daily spending
    const dailySpending = transactions
      .filter(transaction => transaction.amount < 0) // Only expenses
      .reduce((acc, transaction) => {
        const date = new Date(transaction.date).toISOString().split('T')[0]
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
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [])

  const filteredData = React.useMemo(() => {
    if (processedData.length === 0) return []
    
    // Get the latest date from the data
    const latestDate = new Date(Math.max(...processedData.map(item => new Date(item.date).getTime())))
    
    let startDate = new Date(latestDate)
    
    if (timeRange === "ytd") {
      // Year to date - start from January 1st of the current year
      startDate = new Date(latestDate.getFullYear(), 0, 1)
    } else if (timeRange === "90d") {
      startDate.setDate(startDate.getDate() - 90)
    } else if (timeRange === "30d") {
      startDate.setDate(startDate.getDate() - 30)
    } else if (timeRange === "7d") {
      startDate.setDate(startDate.getDate() - 7)
    }
    
    return processedData.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= startDate
    })
  }, [processedData, timeRange])

  // Calculate the Y-axis domain based on filtered data
  const yAxisDomain = React.useMemo(() => {
    if (filteredData.length === 0) return [0, 100]
    const maxValue = Math.max(...filteredData.map(item => item.totalSpend))
    
    // Start from 0 and add 10% padding above the max value
    const upperBound = Math.ceil(maxValue * 1.1)
    
    return [0, upperBound]
  }, [filteredData])

  const totalSpendForPeriod = filteredData.reduce((sum, item) => sum + item.totalSpend, 0)
  const averageDailySpend = filteredData.length > 0 ? totalSpendForPeriod / filteredData.length : 0

  return {
    filteredData,
    yAxisDomain,
    averageDailySpend
  }
}
