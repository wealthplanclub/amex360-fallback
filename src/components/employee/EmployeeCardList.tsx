
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { staticEmpData } from "@/data/staticEmpData"
import { getCardImage } from "@/utils/cardImageUtils"
import * as React from "react"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"

interface EmployeeCardListProps {
  selectedCard?: string
  onCardClick?: (cardType: string) => void
  transactions: EmployeeTransaction[]
}

export function EmployeeCardList({ selectedCard, onCardClick, transactions }: EmployeeCardListProps) {
  // Calculate card totals by card type
  const cardData = React.useMemo(() => {
    const cardTotals = transactions.reduce((acc, transaction) => {
      const cardType = transaction.card_type
      if (!acc[cardType]) {
        acc[cardType] = {
          amount: 0,
          count: 0,
          uniqueCards: new Set<string>()
        }
      }
      acc[cardType].amount += transaction.amount
      acc[cardType].count += 1
      acc[cardType].uniqueCards.add(transaction.last_five)
      return acc
    }, {} as Record<string, { amount: number, count: number, uniqueCards: Set<string> }>)

    return Object.entries(cardTotals)
      .map(([cardType, data]) => ({
        name: cardType,
        fullName: cardType,
        amount: data.amount,
        cardType: cardType,
        count: data.count,
        uniqueCardCount: data.uniqueCards.size,
        displayName: cardType
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  // Filter cards based on selected card
  const filteredCardData = React.useMemo(() => {
    if (!selectedCard || selectedCard === "all") {
      return cardData
    }
    
    return cardData.filter(card => card.fullName === selectedCard)
  }, [cardData, selectedCard])

  // Calculate dynamic height based on filtered card count
  const dynamicHeight = React.useMemo(() => {
    const baseHeight = 200
    const cardHeight = 120
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

  const getSelectedCard = (card: any) => {
    if (!selectedCard || selectedCard === "all") return false
    return card.fullName === selectedCard
  }

  return (
    <Card 
      className="bg-gradient-to-b from-white to-gray-100 flex flex-col transition-all duration-300 ease-in-out"
      style={{ height: `${dynamicHeight}px` }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Employee cards</CardTitle>
        <CardDescription>
          Employee spending by card type
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 pb-6">
            {filteredCardData.map((card, index) => (
              <Card 
                key={card.fullName}
                className={`bg-gradient-to-b from-white to-gray-50 cursor-pointer transition-all hover:shadow-md animate-fade-in ${
                  getSelectedCard(card) ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
                onClick={() => handleCardClick(card)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <img 
                        src={getCardImage(card.cardType)} 
                        alt="Card placeholder" 
                        className="w-16 h-10 object-cover rounded"
                      />
                      <div className="text-sm font-medium leading-tight">
                        {card.displayName}
                      </div>
                    </div>
                    <div className="flex items-center justify-end sm:justify-end">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          Total spending ({card.count} transactions, {card.uniqueCardCount} cards)
                        </p>
                        <div className="text-lg font-bold tabular-nums" style={{ color: '#00175a' }}>
                          ${card.amount.toLocaleString()}
                        </div>
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
