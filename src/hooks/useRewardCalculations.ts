
import { useMemo } from 'react'
import { rewardFilterService } from '@/services/rewardFilterService'
import { FilterState } from '@/hooks/useFilterState'
import { rewardCacheService } from '@/services/calculationsCache'

export function useRewardCalculations(filters: FilterState) {
  return useMemo(() => {
    const filteredRewards = rewardFilterService.getFilteredRewards(filters)
    
    return rewardCacheService.getCachedCalculations(
      'reward',
      filters,
      filteredRewards,
      () => {
        // Calculate total reward points
        const totalRewardPoints = filteredRewards.reduce((sum, reward) => sum + reward.points, 0)
        
        // Calculate employee card rewards and count
        const employeeCardRewards = filteredRewards
          .filter(reward => reward.reward_description.toLowerCase().includes('employee card'))
          .reduce((sum, reward) => sum + reward.points, 0)
        
        const employeeCardCount = filteredRewards
          .filter(reward => reward.reward_description.toLowerCase().includes('employee card'))
          .length
        
        // Calculate referral rewards and count
        const referralRewards = filteredRewards
          .filter(reward => reward.reward_description.toLowerCase().includes('referral'))
          .reduce((sum, reward) => sum + reward.points, 0)
        
        const referralCount = filteredRewards
          .filter(reward => reward.reward_description.toLowerCase().includes('referral'))
          .length
        
        // Calculate top card rewards
        const cardTotals = filteredRewards.reduce((acc, reward) => {
          const cardName = reward.card
          acc[cardName] = (acc[cardName] || 0) + reward.points
          return acc
        }, {} as Record<string, number>)
        
        const topCardEntry = Object.entries(cardTotals).reduce((max, [card, points]) => 
          points > max.points ? { card, points } : max
        , { card: '', points: 0 })
        
        // Updated logic to show full card name minus "card" word but keep last 4 digits
        const topCardDisplayName = topCardEntry.card
          .replace(/\bcard\b/gi, '') // Remove the word "card"
          .trim() // Remove extra spaces
        
        // Calculate percentages
        const employeeCardPercentage = totalRewardPoints > 0 ? 
          Math.round((employeeCardRewards / totalRewardPoints) * 100) : 0
        const referralPercentage = totalRewardPoints > 0 ? 
          Math.round((referralRewards / totalRewardPoints) * 100) : 0
        const topCardPercentage = totalRewardPoints > 0 ? 
          Math.round((topCardEntry.points / totalRewardPoints) * 100) : 0
        
        return {
          totalRewardPoints,
          employeeCardRewards,
          employeeCardCount,
          referralRewards,
          referralCount,
          topCardRewards: topCardEntry.points,
          topCardDisplayName,
          employeeCardPercentage,
          referralPercentage,
          topCardPercentage,
          topCardAccount: topCardEntry.card
        }
      }
    )
  }, [filters])
}
