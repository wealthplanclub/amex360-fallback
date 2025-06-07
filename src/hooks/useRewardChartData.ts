
import { useMemo } from 'react'
import { rewardFilterService } from '@/services/rewardFilterService'

export function useRewardChartData(timeRange: string) {
  return useMemo(() => {
    const allRewards = rewardFilterService.getAllRewards()
    
    // Get date range based on timeRange
    const today = new Date()
    let startDate: Date
    
    if (timeRange === "ytd") {
      startDate = new Date(today.getFullYear(), 0, 1)
    } else if (timeRange === "90d") {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 90)
    } else if (timeRange === "30d") {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 30)
    } else if (timeRange === "7d") {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 7)
    } else {
      startDate = new Date(today)
      startDate.setDate(startDate.getDate() - 90)
    }
    
    const startDateString = startDate.toISOString().split('T')[0]
    const filteredRewards = allRewards.filter(reward => reward.date >= startDateString)
    
    // Group rewards by date and sum points
    const rewardsByDate = filteredRewards.reduce((acc, reward) => {
      if (!acc[reward.date]) {
        acc[reward.date] = 0
      }
      acc[reward.date] += reward.points
      return acc
    }, {} as Record<string, number>)
    
    // Create array of all dates in range with points (0 if no rewards)
    const dateArray: Array<{ date: string; totalPoints: number }> = []
    const currentDate = new Date(startDate)
    
    while (currentDate <= today) {
      const dateString = currentDate.toISOString().split('T')[0]
      dateArray.push({
        date: dateString,
        totalPoints: rewardsByDate[dateString] || 0
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    // Calculate average daily points
    const totalPoints = dateArray.reduce((sum, day) => sum + day.totalPoints, 0)
    const averageDailyPoints = dateArray.length > 0 ? Math.round(totalPoints / dateArray.length) : 0
    
    return {
      filteredData: dateArray.sort((a, b) => a.date.localeCompare(b.date)),
      averageDailyPoints
    }
  }, [timeRange])
}
