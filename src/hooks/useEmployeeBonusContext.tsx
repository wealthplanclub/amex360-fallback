
import React, { createContext, useContext } from 'react'
import { EmployeeTransaction } from '@/components/employee/EmployeeTransactionColumns'
import { 
  updateCardBonusStatus, 
  getCardBonusStatus, 
  getAllCardBonuses, 
  getBonusCardCount 
} from '@/data/staticEmployeeCards'

interface EmployeeBonusContextType {
  toggleStates: Record<string, boolean>
  toggleCardBonus: (cardKey: string) => void
  isCardBonusActive: (cardKey: string) => boolean
  getAdjustedMetrics: (
    baseTransactions: EmployeeTransaction[], 
    selectedCardType?: string, 
    selectedLastFive?: string
  ) => {
    totalSpend: number
    totalPoints: number
    avgPointsPerDollar: number
    totalCards: number
  }
}

const EmployeeBonusContext = createContext<EmployeeBonusContextType | undefined>(undefined)

export const useEmployeeBonus = () => {
  const context = useContext(EmployeeBonusContext)
  if (!context) {
    throw new Error('useEmployeeBonus must be used within an EmployeeBonusProvider')
  }
  return context
}

interface EmployeeBonusProviderProps {
  children: React.ReactNode
}

export const EmployeeBonusProvider: React.FC<EmployeeBonusProviderProps> = ({ children }) => {
  // Force update state to trigger re-renders when toggle states change
  const [forceUpdate, setForceUpdate] = React.useState(0)

  const toggleCardBonus = (cardKey: string) => {
    const currentState = getCardBonusStatus(cardKey)
    updateCardBonusStatus(cardKey, !currentState)
    // Force re-render by updating a dummy state
    setForceUpdate(prev => prev + 1)
  }

  const isCardBonusActive = (cardKey: string) => {
    return getCardBonusStatus(cardKey)
  }

  // Convert array to record format for compatibility
  const getToggleStatesRecord = (): Record<string, boolean> => {
    const allCards = getAllCardBonuses()
    const record: Record<string, boolean> = {}
    allCards.forEach(card => {
      record[card.cardKey] = card.hasBonus
    })
    return record
  }

  const getAdjustedMetrics = (
    baseTransactions: EmployeeTransaction[], 
    selectedCardType?: string, 
    selectedLastFive?: string
  ) => {
    // Calculate base metrics
    const totalSpend = baseTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    const basePoints = baseTransactions.reduce((sum, transaction) => sum + (Math.abs(transaction.amount) * transaction.point_multiple), 0)
    
    // Count unique card combinations and calculate bonus points
    const uniqueCardCombinations = new Set(baseTransactions.map(transaction => `${transaction.card_type}-${transaction.last_five}`))
    const totalCards = uniqueCardCombinations.size
    
    // Calculate bonus points based on current filter state
    let bonusPoints = 0
    
    if (selectedCardType && selectedCardType !== "all" && selectedLastFive && selectedLastFive !== "all") {
      // State C: Specific card selected - only apply bonus for this exact card
      const specificCardKey = `${selectedCardType}-${selectedLastFive}`
      if (getCardBonusStatus(specificCardKey)) {
        bonusPoints = 15000
      }
    } else if (selectedCardType && selectedCardType !== "all") {
      // State B: Card type selected - apply bonuses for all active cards of this type
      uniqueCardCombinations.forEach(cardKey => {
        const [cardType] = cardKey.split('-')
        if (cardType === selectedCardType && getCardBonusStatus(cardKey)) {
          bonusPoints += 15000
        }
      })
    } else {
      // State A: All cards - apply all active bonuses
      bonusPoints = getBonusCardCount() * 15000
    }
    
    const totalPoints = Math.round(basePoints + bonusPoints)
    const avgPointsPerDollar = totalSpend > 0 ? totalPoints / totalSpend : 0

    return {
      totalSpend,
      totalPoints,
      avgPointsPerDollar: Number(avgPointsPerDollar.toFixed(2)),
      totalCards
    }
  }

  const value = {
    toggleStates: getToggleStatesRecord(),
    toggleCardBonus,
    isCardBonusActive,
    getAdjustedMetrics
  }

  return (
    <EmployeeBonusContext.Provider value={value}>
      {children}
    </EmployeeBonusContext.Provider>
  )
}
