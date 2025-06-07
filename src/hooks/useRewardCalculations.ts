
import { useMemo } from 'react'
import { rewardFilterService } from '@/services/rewardFilterService'
import { FilterState } from '@/hooks/useFilterState'

export function useRewardCalculations(filters: FilterState) {
  return useMemo(() => {
    const filteredRewards = rewardFilterService.getFilteredRewards(filters)
    
    // Calculate total reward points
    const totalRewardPoints = filteredRewards.reduce((sum, reward) => sum + reward.points, 0)
    
    // Calculate employee card rewards
    const employeeCardRewards = filteredRewards
      .filter(reward => reward.reward_description.toLowerCase().includes('employee card'))
      .reduce((sum, reward) => sum + reward.points, 0)
    
    // Calculate referral rewards
    const referralRewards = filteredRewards
      .filter(reward => reward.reward_description.toLowerCase().includes('referral'))
      .reduce((sum, reward) => sum + reward.points, 0)
    
    // Calculate top card rewards
    const cardTotals = filteredRewards.reduce((acc, reward) => {
      const cardName = reward.card
      acc[cardName] = (acc[cardName] || 0) + reward.points
      return acc
    }, {} as Record<string, number>)
    
    const topCardEntry = Object.entries(cardTotals).reduce((max, [card, points]) => 
      points > max.points ? { card, points } : max
    , { card: '', points: 0 })
    
    const topCardDisplayName = topCardEntry.card.replace(/\bcard\b/gi, '').replace(/\(-\d+\)/g, '').trim()
    
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
      referralRewards,
      topCardRewards: topCardEntry.points,
      topCardDisplayName,
      employeeCardPercentage,
      referralPercentage,
      topCardPercentage,
      topCardAccount: topCardEntry.card
    }
  }, [filters])
}
