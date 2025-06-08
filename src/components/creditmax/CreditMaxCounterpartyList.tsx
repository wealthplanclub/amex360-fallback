
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SwapTransaction } from "@/utils/swapParser"

interface CreditMaxCounterpartyListProps {
  transactions: SwapTransaction[]
}

interface CounterpartyData {
  name: string
  totalVolume: number
  swapCount: number
  lastSwapDate: string
}

export function CreditMaxCounterpartyList({ transactions }: CreditMaxCounterpartyListProps) {
  // Process transactions to get counterparty data
  const counterpartyData = React.useMemo(() => {
    const counterpartyMap = new Map<string, CounterpartyData>()
    
    transactions.forEach(transaction => {
      const existing = counterpartyMap.get(transaction.counterparty)
      if (existing) {
        existing.totalVolume += transaction.amount
        existing.swapCount += 1
        if (new Date(transaction.date) > new Date(existing.lastSwapDate)) {
          existing.lastSwapDate = transaction.date
        }
      } else {
        counterpartyMap.set(transaction.counterparty, {
          name: transaction.counterparty,
          totalVolume: transaction.amount,
          swapCount: 1,
          lastSwapDate: transaction.date
        })
      }
    })
    
    return Array.from(counterpartyMap.values())
      .sort((a, b) => b.totalVolume - a.totalVolume)
  }, [transactions])

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Counterparties</CardTitle>
        <CardDescription>
          Total swap volume by counterparty
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4 pt-3 pb-6">
            {counterpartyData.map((counterparty, index) => (
              <div
                key={counterparty.name}
                className="p-4 rounded-lg border bg-white/50 hover:bg-white/80 transition-all duration-200 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {counterparty.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {counterparty.swapCount} swap{counterparty.swapCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    ${Math.round(counterparty.totalVolume / 1000)}K
                  </span>
                  <span className="text-xs text-gray-500">
                    Last: {new Date(counterparty.lastSwapDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
