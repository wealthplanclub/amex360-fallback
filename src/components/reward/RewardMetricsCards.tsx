
import { CreditCard, Users, UserPlus } from "lucide-react"
import { StatCard } from "@/components/StatCard"
import { useRewardCalculations } from "@/hooks/useRewardCalculations"
import { FilterState } from "@/hooks/useFilterState"

interface RewardMetricsCardsProps {
  filters: FilterState
  isVisible: boolean
  numbersKey: number
  onCardClick?: (cardType: string, topCardAccount?: string) => void
}

export function RewardMetricsCards({ 
  filters, 
  isVisible, 
  numbersKey, 
  onCardClick 
}: RewardMetricsCardsProps) {
  const calculations = useRewardCalculations(filters)

  const getTimeRangeDescription = (selectedTimeRange: string) => {
    if (selectedTimeRange === "ytd") return "(YTD)";
    if (selectedTimeRange === "90d") return "(90d)";
    if (selectedTimeRange === "30d") return "(30d)";
    if (selectedTimeRange === "7d") return "(7d)";
    return "(YTD)";
  };

  const cardData = [
    {
      title: "Bonus Awards",
      value: calculations.totalRewardPoints,
      badge: "+100%",
      icon: () => <img src="https://i.imgur.com/dTz9vVm.png" alt="Points" className="h-4 w-4" />,
      footer: "Bonuses earned",
      description: `Total bonus points ${getTimeRangeDescription(filters.selectedTimeRange)}`,
      clickable: false,
      showHover: true,
      cardType: "total-rewards"
    },
    {
      title: "Employee Card Awards",
      value: calculations.employeeCardRewards,
      badge: `${calculations.employeeCardPercentage}%`,
      icon: Users,
      footer: `${calculations.employeeCardCount} total employee cards`,
      description: `Employee bonus points ${getTimeRangeDescription(filters.selectedTimeRange)}`,
      clickable: true,
      cardType: "employee-rewards"
    },
    {
      title: "Referral Awards",
      value: calculations.referralRewards,
      badge: `${calculations.referralPercentage}%`,
      icon: UserPlus,
      footer: `${calculations.referralCount} total referrals`,
      description: `Referral bonus points ${getTimeRangeDescription(filters.selectedTimeRange)}`,
      clickable: true,
      cardType: "referral-rewards"
    },
    {
      title: "Top Bonus Card",
      value: calculations.topCardRewards,
      badge: `${calculations.topCardPercentage}%`,
      icon: CreditCard,
      footer: calculations.topCardDisplayName,
      description: `Highest earning card ${getTimeRangeDescription(filters.selectedTimeRange)}`,
      clickable: true,
      cardType: "top-card",
      topCardAccount: calculations.topCardAccount
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <StatCard
          key={card.title}
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
          showHover={card.showHover}
          cardType={card.cardType}
          topCardAccount={card.topCardAccount}
          onClick={onCardClick}
          formatAsPoints={true}
          showBadge={true}
        />
      ))}
    </div>
  )
}
