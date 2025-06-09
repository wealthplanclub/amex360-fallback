
import { useMemo } from 'react'
import { SwapTransaction } from '@/utils/swapParser'

interface CounterpartyData {
  name: string
  totalOutbound: number
  transactionCount: number
}

export function useCreditMaxCounterpartyData(
  transactions: SwapTransaction[],
  counterpartyFilter: string = ""
) {
  const counterpartyData = useMemo(() => {
    const counterpartyMap = new Map<string, CounterpartyData>()
    
    transactions.forEach(transaction => {
      const { counterparty, amount, direction } = transaction
      
      if (!counterpartyMap.has(counterparty)) {
        counterpartyMap.set(counterparty, {
          name: counterparty,
          totalOutbound: 0,
          transactionCount: 0
        })
      }
      
      const data = counterpartyMap.get(counterparty)!
      data.transactionCount++
      
      // Only count outbound transactions for the total
      if (direction === 'SWAP_OUT') {
        data.totalOutbound += amount
      }
    })
    
    return Array.from(counterpartyMap.values())
      .sort((a, b) => b.totalOutbound - a.totalOutbound)
  }, [transactions])

  const filteredCounterpartyData = useMemo(() => {
    if (!counterpartyFilter) return counterpartyData
    
    return counterpartyData.filter(counterparty =>
      counterparty.name.toLowerCase().includes(counterpartyFilter.toLowerCase())
    )
  }, [counterpartyData, counterpartyFilter])

  return {
    counterpartyData,
    filteredCounterpartyData
  }
}
