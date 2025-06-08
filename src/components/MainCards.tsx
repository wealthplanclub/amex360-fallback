
import * as React from "react"
import { useTransactionCalculations } from "@/hooks/useTransactionCalculations"
import { generateCardData } from "@/utils/statCardUtils"
import { StatCard } from "@/components/StatCard"

interface MainCardsProps {
  selectedTimeRange: string;
  onStatCardClick?: (cardType: string, topCardAccount?: string) => void;
}

export function MainCards({ selectedTimeRange, onStatCardClick }: MainCardsProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [numbersKey, setNumbersKey] = React.useState(0)

  React.useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    // Reset and re-trigger number animation when time range changes
    setNumbersKey(prev => prev + 1)
  }, [selectedTimeRange])

  const calculations = useTransactionCalculations(selectedTimeRange);
  const cardData = generateCardData(calculations, selectedTimeRange);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
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
          clickable={true} // Make all cards clickable
          cardType={card.cardType}
          topCardAccount={card.topCardAccount}
          onClick={onStatCardClick}
          showBadge={true}
        />
      ))}
    </div>
  )
}
