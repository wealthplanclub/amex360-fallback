
import * as React from "react"
import { transactionFilterService } from "@/services/transactionFilterService"
import { SwapTransaction } from "@/utils/swapParser"

export const useAvailableTimeRanges = (swapTransactions?: SwapTransaction[]) => {
  return React.useMemo(() => {
    // If swap transactions are provided, use those; otherwise use regular transactions
    const allTransactions = swapTransactions || transactionFilterService.getAllTransactions()
    
    if (allTransactions.length === 0) {
      return []
    }

    const today = new Date()
    const availableRanges: string[] = []

    // Check YTD
    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const startOfYearString = startOfYear.toISOString().split('T')[0]
    const ytdTransactions = allTransactions.filter(t => t.date >= startOfYearString)
    
    if (ytdTransactions.length === 0) {
      return []
    }
    
    availableRanges.push("ytd")

    // Check 90 days
    const date90DaysAgo = new Date(today)
    date90DaysAgo.setDate(date90DaysAgo.getDate() - 90)
    const date90String = date90DaysAgo.toISOString().split('T')[0]
    const last90DaysTransactions = allTransactions.filter(t => t.date >= date90String)
    
    if (last90DaysTransactions.length > 0) {
      availableRanges.push("90d")
    }

    // Check 30 days
    const date30DaysAgo = new Date(today)
    date30DaysAgo.setDate(date30DaysAgo.getDate() - 30)
    const date30String = date30DaysAgo.toISOString().split('T')[0]
    const last30DaysTransactions = allTransactions.filter(t => t.date >= date30String)
    
    if (last30DaysTransactions.length > 0) {
      availableRanges.push("30d")
    }

    // Check 7 days
    const date7DaysAgo = new Date(today)
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7)
    const date7String = date7DaysAgo.toISOString().split('T')[0]
    const last7DaysTransactions = allTransactions.filter(t => t.date >= date7String)
    
    if (last7DaysTransactions.length > 0) {
      availableRanges.push("7d")
    }

    return availableRanges
  }, [swapTransactions])
}
