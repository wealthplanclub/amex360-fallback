import { useMemo } from 'react'
import { rewardFilterService } from '@/services/rewardFilterService'
import { FilterState } from '@/hooks/useFilterState'
import { useDebounce } from './useDebounce'

export function useRewardChartData(filters: FilterState) {
  // Debounce filters to reduce unnecessary recalculations
  const debouncedFilters = useDebounce(filters, 300)
  
  return useMemo(() => {
    // For chart data, we ignore the selectedDate filter to keep showing the full time range
    const chartFilters = { ...debouncedFilters, selectedDate: undefined }
    const rewards = rewardFilterService.getFilteredRewards(chartFilters)
    
    // Group rewards by date (memoized)
    const dailyData = useMemo(() =>
      rewards.reduce((acc, reward) => {
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
      }, {} as Record<string, any>),
      [rewards]
    )
    
    // Convert to array and sort by date
    const chartData = Object.values(dailyData).sort((a: any, b: any) => 
      a.originalDate.localeCompare(b.originalDate)
    )
    
    // Format date labels for display - parse ISO date correctly to avoid timezone issues
    return chartData.map((item: any) => {
      const [year, month, day] = item.originalDate.split('-').map(Number)
      const date = new Date(year, month - 1, day) // Create date in local timezone
      
      return {
        ...item,
        date: item.originalDate, // Keep ISO date for click handling
        displayDate: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        })
      }
    })
  }, [debouncedFilters])
}
