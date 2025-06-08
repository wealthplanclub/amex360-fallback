
import React, { createContext, useContext, useState, useMemo } from 'react'
import { EmployeeTransaction } from '@/components/employee/EmployeeTransactionColumns'

interface EmployeeBonusContextType {
  toggleStates: Record<string, boolean>
  toggleCardBonus: (cardKey: string) => void
  isCardBonusActive: (cardKey: string) => boolean
  getAdjustedMetrics: (baseTransactions: EmployeeTransaction[]) => {
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
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({})

  const toggleCardBonus = (cardKey: string) => {
    setToggleStates(prev => ({
      ...prev,
      [cardKey]: !prev[cardKey]
    }))
  }

  const isCardBonusActive = (cardKey: string) => {
    return toggleStates[cardKey] || false
  }

  const getAdjustedMetrics = (baseTransactions: EmployeeTransaction[]) => {
    // Calculate base metrics
    const totalSpend = baseTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    const basePoints = baseTransactions.reduce((sum, transaction) => sum + (Math.abs(transaction.amount) * transaction.point_multiple), 0)
    
    // Count unique card combinations and calculate bonus points
    const uniqueCardCombinations = new Set(baseTransactions.map(transaction => `${transaction.card_type}-${transaction.last_five}`))
    const totalCards = uniqueCardCombinations.size
    
    // Calculate bonus points from active toggles
    const bonusPoints = Object.values(toggleStates).filter(Boolean).length * 15000
    
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
    toggleStates,
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
