
import React from "react"
import { EmployeeTransaction } from "@/components/employee/EmployeeTransactionColumns"

export function useEmployeeCardData(
  transactions: EmployeeTransaction[],
  selectedCardType?: string,
  lastFiveFilter?: string
) {
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

  // Filter cards based on selected card type from dropdown and last 5 filter
  const filteredCardData = React.useMemo(() => {
    let filtered = cardData

    // Filter by card type
    if (selectedCardType && selectedCardType !== "all") {
      filtered = filtered.filter(card => card.cardType === selectedCardType)
    }
    
    // Filter by last 5 digits
    if (lastFiveFilter && lastFiveFilter.trim()) {
      filtered = filtered.filter(card => 
        card.lastFive.toLowerCase().includes(lastFiveFilter.toLowerCase())
      )
    }

    return filtered
  }, [cardData, selectedCardType, lastFiveFilter])

  return {
    cardData,
    filteredCardData
  }
}
