import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { staticEmpData } from "@/data/staticEmpData"
import { getCardImage } from "@/utils/cardImageUtils"
import * as React from "react"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"
import { useEmployeeBonus } from "@/hooks/useEmployeeBonusContext"
import { ChevronDown, ChevronUp } from "lucide-react"

interface EmployeeCardListProps {
  selectedCard?: string
  onCardClick?: (lastFive: string, cardType?: string) => void
  transactions: EmployeeTransaction[]
  selectedCardType?: string
}

type SortOption = 'spend-desc' | 'spend-asc' | 'lastFive-desc' | 'lastFive-asc'

// Fixed employee card image for all cards in the list
const EMPLOYEE_CARD_IMAGE = "https://icm.aexp-static.com/acquisition/card-art/NUS000000322_160x102_straight_withname.png"

export function EmployeeCardList({ selectedCard, onCardClick, transactions, selectedCardType }: EmployeeCardListProps) {
  const { toggleCardBonus, isCardBonusActive } = useEmployeeBonus()
  const [sortOption, setSortOption] = React.useState<SortOption>('spend-desc')

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
      .sort((a, b) => {
        switch (sortOption) {
          case 'spend-desc':
            return b.amount - a.amount
          case 'spend-asc':
            return a.amount - b.amount
          case 'lastFive-desc':
            return b.lastFive.localeCompare(a.lastFive)
          case 'lastFive-asc':
            return a.lastFive.localeCompare(b.lastFive)
          default:
            return b.amount - a.amount
        }
      })
  }, [transactions, sortOption])

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

  const handleSwitchChange = (cardKey: string) => {
    console.log('Switch toggled for card:', cardKey)
    toggleCardBonus(cardKey)
  }

  const getSortOptionLabel = (option: SortOption) => {
    switch (option) {
      case 'spend-desc':
        return 'spend'
      case 'spend-asc':
        return 'spend'
      case 'lastFive-desc':
        return 'last 5'
      case 'lastFive-asc':
        return 'last 5'
      default:
        return 'spend'
    }
  }

  const getSortArrow = (option: SortOption) => {
    const isDescending = option.includes('-desc')
    return isDescending ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />
  }

  return (
    <Card 
      className="bg-gradient-to-b from-white to-gray-100 flex flex-col transition-all duration-300 ease-in-out"
      style={{ height: `${dynamicHeight}px` }}
    >
      <CardHeader>
        <div className="grid gap-3">
          <div>
            <CardTitle className="text-xl font-semibold">Employee cards</CardTitle>
            <CardDescription className="mt-1">
              Employee spending by card (last 5 digits)
            </CardDescription>
          </div>
          
          {/* Sort Controls in grid item */}
          <div className="flex items-center gap-2">
            <Select value={sortOption} onValueChange={(value: SortOption) => setSortOption(value)}>
              <SelectTrigger className="w-auto h-8">
                <SelectValue>
                  <div className="flex items-center gap-1">
                    Sorted by {getSortOptionLabel(sortOption)} {getSortArrow(sortOption)}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spend-desc">
                  <div className="flex items-center gap-1">
                    spend <ChevronDown className="h-3 w-3" />
                  </div>
                </SelectItem>
                <SelectItem value="spend-asc">
                  <div className="flex items-center gap-1">
                    spend <ChevronUp className="h-3 w-3" />
                  </div>
                </SelectItem>
                <SelectItem value="lastFive-desc">
                  <div className="flex items-center gap-1">
                    last 5 <ChevronDown className="h-3 w-3" />
                  </div>
                </SelectItem>
                <SelectItem value="lastFive-asc">
                  <div className="flex items-center gap-1">
                    last 5 <ChevronUp className="h-3 w-3" />
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 pb-6">
            {filteredCardData.map((card, index) => {
              const isCardSelected = selectedCard === card.lastFive && selectedCardType === card.cardType
              const isBonusActive = isCardBonusActive(card.cardKey)
              
              // Debug logging
              console.log('Card debug info:', {
                cardKey: card.cardKey,
                isBonusActive,
                isCardSelected,
                cardType: card.cardType,
                lastFive: card.lastFive
              })
              
              return (
                <Card 
                  key={card.cardKey}
                  className="bg-gradient-to-b from-white to-gray-50 transition-all hover:shadow-md animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <CardContent className="p-4">
                    <div 
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer"
                      onClick={() => handleCardClick(card)}
                    >
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
                          <div className="flex items-center gap-2">
                            {isBonusActive && (
                              <img 
                                src="https://i.imgur.com/dTz9vVm.png" 
                                alt="Boost active" 
                                className="w-4 h-4"
                              />
                            )}
                            <div className="text-lg font-bold tabular-nums" style={{ color: '#00175a' }}>
                              ${card.amount.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {isCardSelected && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            +15,000 bonus awarded
                          </span>
                          <div onClick={(e) => e.stopPropagation()}>
                            <Switch 
                              checked={isBonusActive}
                              onCheckedChange={() => handleSwitchChange(card.cardKey)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
