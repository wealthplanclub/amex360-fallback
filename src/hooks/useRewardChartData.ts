
import { useMemo } from 'react'
import { rewardFilterService } from '@/services/rewardFilterService'
import { FilterState } from '@/hooks/useFilterState'

export function useRewardChartData(filters: FilterState) {
  return useMemo(() => {
    const rewards = rewardFilterService.getFilteredRewards(filters)
    
    // Group rewards by date
    const dailyData = rewards.reduce((acc, reward) => {
      const dateKey = reward.date
      
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          totalPoints: 0,
          employeePoints: 0,
          referralPoints: 0
        }
      }
      
      acc[dateKey].totalPoints += reward.points
      
      if (reward.reward_description.toLowerCase().includes('employee card')) {
        acc[dateKey].employeePoints += reward.points
      }
      
      if (reward.reward_description.toLowerCase().includes('referral')) {
        acc[dateKey].referralPoints += reward.points
      }
      
      return acc
    }, {} as Record<string, any>)
    
    // Convert to array and sort by date
    const chartData = Object.values(dailyData).sort((a: any, b: any) => 
      a.date.localeCompare(b.date)
    )
    
    // Format date labels for display
    return chartData.map((item: any) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      })
    }))
  }, [filters])
}
