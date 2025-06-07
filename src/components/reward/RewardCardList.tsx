
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRewardCalculations } from "@/hooks/useRewardCalculations"
import { FilterState } from "@/hooks/useFilterState"
import { rewardFilterService } from "@/services/rewardFilterService"

interface RewardCardListProps {
  filters: FilterState
}

export function RewardCardList({ filters }: RewardCardListProps) {
  const calculations = useRewardCalculations(filters)
  
  // Get unique cards and their totals
  const cardTotals = rewardFilterService.getFilteredRewards(filters).reduce((acc, reward) => {
    const cardName = reward.card
    acc[cardName] = (acc[cardName] || 0) + reward.points
    return acc
  }, {} as Record<string, number>)

  const cardEntries = Object.entries(cardTotals)
    .map(([card, points]) => ({
      card,
      points,
      displayName: card.replace(/\bcard\b/gi, '').replace(/\(-\d+\)/g, '').trim()
    }))
    .sort((a, b) => b.points - a.points)

  const getTimeRangeDescription = () => {
    switch (filters.selectedTimeRange) {
      case "ytd": return "year to date"
      case "90d": return "last 90 days"
      case "30d": return "last 30 days"
      case "7d": return "last 7 days"
      default: return "year to date"
    }
  }

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader>
        <CardTitle>Card Rewards</CardTitle>
        <CardDescription>
          Reward points by card {getTimeRangeDescription()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {cardEntries.map(({ card, points, displayName }) => (
            <div key={card} className="flex items-center">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4 space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">{displayName}</p>
                <p className="text-sm text-muted-foreground">{card}</p>
              </div>
              <div className="ml-auto font-medium">
                {points.toLocaleString()} pts
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
