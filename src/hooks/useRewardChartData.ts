
import { useMemo } from 'react'
import { rewardFilterService } from '@/services/rewardFilterService'
import { FilterState } from '@/hooks/useFilterState'

export function useRewardChartData(filters: FilterState) {
  return useMemo(() => {
    const rewards = rewardFilterService.getFilteredRewards(filters)
    
    // Group rewards by month
    const monthlyData = rewards.reduce((acc, reward) => {
      const date = new Date(reward.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          totalPoints: 0,
          employeePoints: 0,
          referralPoints: 0
        }
      }
      
      acc[monthKey].totalPoints += reward.points
      
      if (reward.reward_description.toLowerCase().includes('employee card')) {
        acc[monthKey].employeePoints += reward.points
      }
      
      if (reward.reward_description.toLowerCase().includes('referral')) {
        acc[monthKey].referralPoints += reward.points
      }
      
      return acc
    }, {} as Record<string, any>)
    
    // Convert to array and sort by date
    const chartData = Object.values(monthlyData).sort((a: any, b: any) => 
      a.month.localeCompare(b.month)
    )
    
    // Format month labels
    return chartData.map((item: any) => ({
      ...item,
      month: new Date(item.month + '-01').toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      })
    }))
  }, [filters])
}
