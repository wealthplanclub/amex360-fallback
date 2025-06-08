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
  onCardClick?: (lastFive: string, cardType?: string) => void
  transactions: EmployeeTransaction[]
  selectedCardType?: string
}

// Fixed employee card image for all cards in the list
const EMPLOYEE_CARD_IMAGE = "https://icm.aexp-static.com/acquisition/card-art/NUS000000322_160x102_straight_withname.png"

export function EmployeeCardList({ selectedCard, onCardClick, transactions, selectedCardType }: EmployeeCardListProps) {
  // Calculate card totals by unique combination of card type and last 5 digits
  const cardData = React.useMemo(() => {
    const cardTotals = transactions.reduce((acc, transaction) => {
      const cardKey = `${transaction.card_type}-${transaction.last_five}`
      if (!acc[cardKey]) {
        acc[cardKey] = {
          amount: 0,
          cardType: transaction.card_type,
          lastFive: transaction.last_five,
          count: 0
        }
      }
      acc[cardKey].amount += transaction.amount
      acc[cardKey].count += 1
      return acc
    }, {} as Record<string, { amount: number, cardType: string, lastFive: string, count: number }>)

    return Object.entries(cardTotals)
      .map(([cardKey, data]) => ({
        name: data.lastFive,
        fullName: data.lastFive,
        amount: data.amount,
        cardType: data.cardType,
        lastFive: data.lastFive,
        count: data.count,
        displayName: `${data.cardType}\n(${data.lastFive})`,
        cardKey: cardKey // unique identifier combining type and last five
      }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  // Filter cards based on selected card type from dropdown
  const filteredCardData = React.useMemo(() => {
    if (!selectedCardType || selectedCardType === "all") {
      return cardData
    }
    
    // Show only cards that match the selected card type
    return cardData.filter(card => card.cardType === selectedCardType)
  }, [cardData, selectedCardType])

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
    
    console.log('Card clicked in list:', { card, selectedCard, selectedCardType })
    
    // Check if this specific card (type + last five combination) is selected
    const isSelected = selectedCard === card.lastFive && selectedCardType === card.cardType
    
    if (isSelected) {
      // If this card is currently selected, pass the card info to allow toggle back to card type
      onCardClick(card.lastFive, card.cardType)
    } else {
      // Pass both the lastFive and cardType to ensure correct filtering
      onCardClick(card.lastFive, card.cardType)
    }
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
                key={card.cardKey}
                className="bg-gradient-to-b from-white to-gray-50 cursor-pointer transition-all hover:shadow-md animate-fade-in"
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
                        src={EMPLOYEE_CARD_IMAGE} 
                        alt="Employee card" 
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
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
