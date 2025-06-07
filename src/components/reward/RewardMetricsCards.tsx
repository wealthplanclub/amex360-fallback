
import * as React from "react"
import { StatCard } from "@/components/StatCard"
import { Award, TrendingUp, CreditCard, Calendar } from "lucide-react"
import { FilterState } from "@/hooks/useFilterState"
import { useRewardCalculations } from "@/hooks/useRewardCalculations"

interface RewardMetricsCardsProps {
  filters: FilterState
  onCardClick?: (cardType: string, topCardAccount?: string) => void
}

export function RewardMetricsCards({ filters, onCardClick }: RewardMetricsCardsProps) {
  const calculations = useRewardCalculations(filters)
  const [isVisible, setIsVisible] = React.useState(false)
  const [numbersKey, setNumbersKey] = React.useState(0)

  React.useEffect(() => {
    setIsVisible(true)
    setNumbersKey(prev => prev + 1)
  }, [calculations])

  const getTimeRangeDescription = (selectedTimeRange: string) => {
    if (selectedTimeRange === "ytd") return "(YTD)";
    if (selectedTimeRange === "90d") return "(90d)";
    if (selectedTimeRange === "30d") return "(30d)";
    if (selectedTimeRange === "7d") return "(7d)";
    return "(YTD)";
  };

  const cardData = [
    {
      title: "Total Points Earned",
      value: calculations.totalPoints,
      badge: "+100%",
      icon: Award,
      footer: "Points accumulated",
      description: `Total reward points ${getTimeRangeDescription(filters.selectedTimeRange)}`,
      clickable: false,
      cardType: "total-points"
    },
    {
      title: "Number of Rewards",
      value: calculations.totalRewards,
      badge: `${calculations.rewardsCount}`,
      icon: TrendingUp,
      footer: "Reward transactions",
      description: `Total rewards earned ${getTimeRangeDescription(filters.selectedTimeRange)}`,
      clickable: false,
      cardType: "reward-count"
    },
    {
      title: "Top Reward Card",
      value: calculations.topCardPoints,
      badge: `${calculations.topCardPercentage}%`,
      icon: CreditCard,
      footer: calculations.topCardDisplayName,
      description: `Card with most points ${getTimeRangeDescription(filters.selectedTimeRange)}`,
      clickable: true,
      cardType: "top-card",
      topCardAccount: calculations.topCardAccount
    },
    {
      title: "Average Points per Reward",
      value: calculations.averagePointsPerReward,
      badge: "avg",
      icon: Calendar,
      footer: "Points per transaction",
      description: `Average reward value ${getTimeRangeDescription(filters.selectedTimeRange)}`,
      clickable: false,
      cardType: "average-points"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <StatCard
          key={card.cardType}
          title={card.title}
          value={card.value}
          badge={card.badge}
          icon={card.icon}
          footer={card.footer}
          description={card.description}
          index={index}
          isVisible={isVisible}
          numbersKey={numbersKey}
          clickable={card.clickable}
          cardType={card.cardType}
          topCardAccount={card.topCardAccount}
          onClick={onCardClick}
        />
      ))}
    </div>
  )
}
