import { useMemo } from 'react'
import { rewardFilterService } from '@/services/rewardFilterService'
import { FilterState } from '@/hooks/useFilterState'

export function useRewardCalculations(filters: FilterState) {
  return useMemo(() => {
    const filteredRewards = rewardFilterService.getFilteredRewards(filters)
    
    // Memoize employee card filtering
    const employeeCardRewards = useMemo(() => 
      filteredRewards.filter(reward => reward.reward_description.toLowerCase().includes('employee card')),
      [filteredRewards]
    )
    
    // Memoize referral filtering
    const referralRewards = useMemo(() =>
      filteredRewards.filter(reward => reward.reward_description.toLowerCase().includes('referral')),
      [filteredRewards]
    )
    
    // Calculate total reward points
    const totalRewardPoints = filteredRewards.reduce((sum, reward) => sum + reward.points, 0)
    
    // Calculate employee card metrics
    const employeeCardPoints = employeeCardRewards.reduce((sum, reward) => sum + reward.points, 0)
    const employeeCardCount = employeeCardRewards.length
    
    // Calculate referral metrics
    const referralPoints = referralRewards.reduce((sum, reward) => sum + reward.points, 0)
    const referralCount = referralRewards.length
    
    // Calculate top card rewards (memoized)
    const cardTotals = useMemo(() => 
      filteredRewards.reduce((acc, reward) => {
        const cardName = reward.card
        acc[cardName] = (acc[cardName] || 0) + reward.points
        return acc
      }, {} as Record<string, number>),
      [filteredRewards]
    )
    
    const topCardEntry = useMemo(() =>
      Object.entries(cardTotals).reduce((max, [card, points]) => 
        points > max.points ? { card, points } : max
      , { card: '', points: 0 }),
      [cardTotals]
    )
    
    // Updated logic to show full card name minus "card" word but keep last 4 digits
    const topCardDisplayName = topCardEntry.card
      .replace(/\bcard\b/gi, '') // Remove the word "card"
      .trim() // Remove extra spaces
    
    // Calculate percentages
    const employeeCardPercentage = totalRewardPoints > 0 ? 
      Math.round((employeeCardPoints / totalRewardPoints) * 100) : 0
    const referralPercentage = totalRewardPoints > 0 ? 
      Math.round((referralPoints / totalRewardPoints) * 100) : 0
    const topCardPercentage = totalRewardPoints > 0 ? 
      Math.round((topCardEntry.points / totalRewardPoints) * 100) : 0
    
    return {
      totalRewardPoints,
      employeeCardRewards: employeeCardPoints,
      employeeCardCount,
      referralRewards: referralPoints,
      referralCount,
      topCardRewards: topCardEntry.points,
      topCardDisplayName,
      employeeCardPercentage,
      referralPercentage,
      topCardPercentage,
      topCardAccount: topCardEntry.card
    }
  }, [filters])
}
