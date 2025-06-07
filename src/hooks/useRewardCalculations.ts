
import { useMemo } from 'react'
import { FilterState } from './useFilterState'
import { rewardFilterService } from '@/services/rewardFilterService'

export function useRewardCalculations(filters: FilterState) {
  return useMemo(() => {
    const rewards = rewardFilterService.getFilteredRewards(filters)
    
    const totalPoints = rewards.reduce((sum, reward) => sum + reward.points, 0)
    const totalRewards = rewards.length
    
    // Group by card to find top performer
    const cardStats = rewards.reduce((acc, reward) => {
      if (!acc[reward.card]) {
        acc[reward.card] = { points: 0, count: 0 }
      }
      acc[reward.card].points += reward.points
      acc[reward.card].count += 1
      return acc
    }, {} as Record<string, { points: number; count: number }>)
    
    const topCardEntry = Object.entries(cardStats).reduce(
      (max, [card, stats]) => stats.points > max.points ? { card, ...stats } : max,
      { card: '', points: 0, count: 0 }
    )
    
    const topCardPercentage = totalPoints > 0 ? Math.round((topCardEntry.points / totalPoints) * 100) : 0
    const topCardDisplayName = topCardEntry.card.replace(/\bcard\b/gi, '').trim() || 'No rewards'
    const averagePointsPerReward = totalRewards > 0 ? Math.round(totalPoints / totalRewards) : 0
    
    return {
      totalPoints,
      totalRewards,
      rewardsCount: totalRewards,
      topCardPoints: topCardEntry.points,
      topCardAccount: topCardEntry.card,
      topCardDisplayName,
      topCardPercentage,
      averagePointsPerReward
    }
  }, [filters])
}
