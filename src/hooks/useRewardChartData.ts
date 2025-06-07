import { useMemo } from 'react'
import { rewardFilterService } from '@/services/rewardFilterService'
import { FilterState } from '@/hooks/useFilterState'

export function useRewardChartData(filters: FilterState) {
  return useMemo(() => {
    // For chart data, we ignore the selectedDate filter to keep showing the full time range
    const chartFilters = { ...filters, selectedDate: undefined }
    const rewards = rewardFilterService.getFilteredRewards(chartFilters)
    
    // Group rewards by date
    const dailyData = rewards.reduce((acc, reward) => {
      const dateKey = reward.date
      
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          originalDate: dateKey, // Keep original ISO date for filtering
          totalPoints: 0,
          employeePoints: 0,
          referralPoints: 0,
          welcome: 0
        }
      }
      
      acc[dateKey].totalPoints += reward.points
      
      if (reward.reward_description.toLowerCase().includes('employee card')) {
        acc[dateKey].employeePoints += reward.points
      }
      
      if (reward.reward_description.toLowerCase().includes('referral')) {
        acc[dateKey].referralPoints += reward.points
      }
      
      if (reward.reward_description.toLowerCase().includes('welcome')) {
        acc[dateKey].welcome += reward.points
      }
      
      return acc
    }, {} as Record<string, any>)
    
    // Convert to array and sort by date
    const chartData = Object.values(dailyData).sort((a: any, b: any) => 
      a.originalDate.localeCompare(b.originalDate)
    )
    
    // Format date labels for display
    return chartData.map((item: any) => ({
      ...item,
      date: item.originalDate, // Keep ISO date for click handling
      displayDate: new Date(item.originalDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      })
    }))
  }, [filters])
}
