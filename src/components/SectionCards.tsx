
import * as React from "react"
import { useTransactionCalculations } from "@/hooks/useTransactionCalculations"
import { generateCardData } from "@/utils/statCardUtils"
import { StatCard } from "@/components/StatCard"

interface SectionCardsProps {
  selectedTimeRange: string;
  onStatCardClick?: (cardType: string, timeRange: string, topCardAccount?: string) => void;
}

export function SectionCards({ selectedTimeRange, onStatCardClick }: SectionCardsProps) {
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

  const handleCardClick = (cardType: string, topCardAccount?: string) => {
    if (onStatCardClick) {
      onStatCardClick(cardType, selectedTimeRange, topCardAccount);
    }
  };

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
          clickable={card.clickable}
          cardType={card.cardType}
          topCardAccount={card.topCardAccount}
          index={index}
          isVisible={isVisible}
          numbersKey={numbersKey}
          onClick={handleCardClick}
        />
      ))}
    </div>
  )
}
