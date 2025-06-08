import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { staticEmpData } from "@/data/staticEmpData"
import { getCardImage } from "@/utils/cardImageUtils"
import * as React from "react"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"

interface EmployeeCardListProps {
  selectedCard?: string
  onCardClick?: (cardType: string) => void
  transactions: EmployeeTransaction[]
  selectedCardType?: string
}

export function EmployeeCardList({ selectedCard, onCardClick, transactions, selectedCardType }: EmployeeCardListProps) {
  // State to track power up toggles for each card
  const [powerUpStates, setPowerUpStates] = React.useState<Record<string, boolean>>({})

  // Calculate card totals by last 5 digits
  const cardData = React.useMemo(() => {
    const cardTotals = transactions.reduce((acc, transaction) => {
      const lastFive = transaction.last_five
      if (!acc[lastFive]) {
        acc[lastFive] = {
          amount: 0,
          cardType: transaction.card_type,
          count: 0,
          totalPoints: 0
        }
      }
      acc[lastFive].amount += transaction.amount
      acc[lastFive].count += 1
      acc[lastFive].totalPoints += transaction.amount * transaction.point_multiple
      return acc
    }, {} as Record<string, { amount: number, cardType: string, count: number, totalPoints: number }>)

    return Object.entries(cardTotals)
      .map(([lastFive, data]) => {
        const isPoweredUp = powerUpStates[lastFive] || false
        const bonusPoints = isPoweredUp ? 15000 : 0
        const finalPoints = data.totalPoints + bonusPoints
        const multiple = data.amount > 0 ? finalPoints / data.amount : 0

        return {
          name: lastFive,
          fullName: lastFive,
          amount: data.amount,
          cardType: data.cardType,
          count: data.count,
          displayName: `${data.cardType}\n(${lastFive})`,
          pointsEarned: Math.round(finalPoints),
          multiple: multiple,
          isPoweredUp: isPoweredUp
        }
      })
      .sort((a, b) => b.amount - a.amount)
  }, [transactions, powerUpStates])

  // Filter cards based on selected card type from dropdown
  const filteredCardData = React.useMemo(() => {
    if (!selectedCardType || selectedCardType === "all") {
      return cardData
    }
    
    // Show all cards that match the selected card type
    return cardData.filter(card => card.cardType === selectedCardType)
  }, [cardData, selectedCardType])

  // Calculate dynamic height based on filtered card count
  const dynamicHeight = React.useMemo(() => {
    const baseHeight = 200
    const cardHeight = 180 // Increased height to accommodate metrics
    const maxHeight = 830
    
    const calculatedHeight = baseHeight + (filteredCardData.length * cardHeight)
    return Math.min(calculatedHeight, maxHeight)
  }, [filteredCardData.length])

  const handleCardClick = (card: any) => {
    if (!onCardClick) return
    
    const isSelected = card.fullName === selectedCard
    
    if (isSelected) {
      onCardClick('all')
    } else {
      onCardClick(card.fullName)
    }
  }

  const handlePowerUpToggle = (cardId: string, checked: boolean) => {
    setPowerUpStates(prev => ({
      ...prev,
      [cardId]: checked
    }))
  }

  return (
    <Card 
      className="bg-gradient-to-b from-white to-gray-100 flex flex-col transition-all duration-300 ease-in-out"
      style={{ height: `${dynamicHeight}px` }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Employee cards</CardTitle>
        <CardDescription>
          Employee spending by card (last 5 digits)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 pb-6">
            {filteredCardData.map((card, index) => (
              <Card 
                key={card.fullName}
                className="bg-gradient-to-b from-white to-gray-50 cursor-pointer transition-all hover:shadow-md animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
                onClick={() => handleCardClick(card)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <img 
                          src={getCardImage(card.cardType)} 
                          alt="Card placeholder" 
                          className="w-16 h-10 object-cover rounded"
                        />
                        <div className="text-sm font-medium leading-tight whitespace-pre-line">
                          {card.displayName}
                        </div>
                      </div>
                      <div className="flex items-center justify-end sm:justify-end">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {card.count} transactions
                          </p>
                          <div className="text-lg font-bold tabular-nums" style={{ color: '#00175a' }}>
                            ${card.amount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Metrics row */}
                    <div className="border-t pt-3 space-y-2">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Points Earned:</span>
                          <div className="font-semibold tabular-nums">{card.pointsEarned.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Multiple:</span>
                          <div className="font-semibold tabular-nums">{card.multiple.toFixed(2)}x</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-muted-foreground">Power Up</span>
                        <Switch
                          checked={card.isPoweredUp}
                          onCheckedChange={(checked) => handlePowerUpToggle(card.fullName, checked)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
