
import { useMemo } from 'react'
import { SwapTransaction } from '@/utils/swapParser'

export function useCreditMaxChartData(swapTransactions: SwapTransaction[], timeRange: string) {
  return useMemo(() => {
    // Get outbound transactions only
    const outboundTransactions = swapTransactions.filter(t => t.direction === 'SWAP_OUT')
    
    // Sort by date
    const sortedTransactions = outboundTransactions.sort((a, b) => a.date.localeCompare(b.date))
    
    // Group by date and calculate daily totals
    const dailyData = sortedTransactions.reduce((acc, transaction) => {
      const dateKey = transaction.date
      
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          points: 0,
          cardSpend: 0,
          actualSpend: 0
        }
      }
      
      const points = transaction.amount * transaction.multiple
      const cardSpend = transaction.card && transaction.card.trim() !== '' ? transaction.amount : 0
      const actualSpend = cardSpend * 0.03 // 3% fee
      
      acc[dateKey].points += points
      acc[dateKey].cardSpend += cardSpend
      acc[dateKey].actualSpend += actualSpend
      
      return acc
    }, {} as Record<string, any>)
    
    // Convert to array and sort by date
    const dailyArray = Object.values(dailyData).sort((a: any, b: any) => 
      a.date.localeCompare(b.date)
    )
    
    // Filter by time range
    const filteredData = filterByTimeRange(dailyArray, timeRange)
    
    // Calculate cumulative values
    let cumulativePoints = 0
    let cumulativeSpent = 0
    let cumulativeActual = 0
    
    const chartData = filteredData.map((item: any) => {
      cumulativePoints += item.points
      cumulativeSpent += item.cardSpend
      cumulativeActual += item.actualSpend
      
      // Parse the date string more safely
      const dateStr = item.date
      let displayDate = dateStr
      
      try {
        // Try to parse the date - handle different formats
        const dateParts = dateStr.split('-')
        if (dateParts.length === 3) {
          const [year, month, day] = dateParts.map(Number)
          const date = new Date(year, month - 1, day)
          
          // Check if date is valid
          if (!isNaN(date.getTime())) {
            displayDate = date.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            })
          }
        }
      } catch (error) {
        console.log('Date parsing error for:', dateStr, error)
        // Fallback to original date string
        displayDate = dateStr
      }
      
      return {
        date: item.date,
        displayDate: displayDate,
        cumulativePoints: Math.round(cumulativePoints),
        cumulativeSpent: Math.round(cumulativeSpent * 100) / 100,
        actualSpent: Math.round(cumulativeActual * 100) / 100
      }
    })
    
    return chartData
  }, [swapTransactions, timeRange])
}

function filterByTimeRange(data: any[], timeRange: string) {
  if (data.length === 0) return []
  
  const latestDate = data[data.length - 1].date
  
  // Parse the latest date more safely
  let today: Date
  try {
    const dateParts = latestDate.split('-')
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts.map(Number)
      today = new Date(year, month - 1, day)
    } else {
      today = new Date()
    }
  } catch (error) {
    today = new Date()
  }
  
  let startDate: string
  
  if (timeRange === "ytd") {
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
    startDate = data[0].date
  }
  
  return data.filter(item => item.date >= startDate)
}
