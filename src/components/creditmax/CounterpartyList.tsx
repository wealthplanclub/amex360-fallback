
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
import { CounterpartyListItem } from "./CounterpartyListItem"
import { CounterpartySearch } from "./CounterpartySearch"

interface CounterpartyData {
  name: string
  outboundTotal: number
  count: number
}

interface CounterpartyListProps {
  selectedCounterparty?: string
  onCounterpartyClick?: (counterparty: string) => void
  transactions: SwapTransaction[]
}

export function CounterpartyList({ selectedCounterparty, onCounterpartyClick, transactions }: CounterpartyListProps) {
  const [searchFilter, setSearchFilter] = React.useState("")

  // Process transactions to get counterparty data
  const counterpartyData = React.useMemo(() => {
    const counterpartyMap = new Map<string, { outboundTotal: number; count: number }>()
    
    transactions.forEach(transaction => {
      if (!counterpartyMap.has(transaction.counterparty)) {
        counterpartyMap.set(transaction.counterparty, { outboundTotal: 0, count: 0 })
      }
      
      const data = counterpartyMap.get(transaction.counterparty)!
      data.count++
      
      if (transaction.direction === "SWAP_OUT") {
        data.outboundTotal += transaction.amount
      }
    })
    
    return Array.from(counterpartyMap.entries())
      .map(([name, data]) => ({
        name,
        outboundTotal: data.outboundTotal,
        count: data.count
      }))
      .sort((a, b) => b.outboundTotal - a.outboundTotal)
  }, [transactions])

  // Filter counterparties based on selection and search
  const filteredCounterparties = React.useMemo(() => {
    let filtered = counterpartyData

    // If a specific counterparty is selected from dropdown, only show that one
    if (selectedCounterparty && selectedCounterparty !== "all") {
      filtered = filtered.filter(counterparty => counterparty.name === selectedCounterparty)
    }

    // Apply search filter only if no specific counterparty is selected
    if ((!selectedCounterparty || selectedCounterparty === "all") && searchFilter) {
      filtered = filtered.filter(counterparty =>
        counterparty.name.toLowerCase().includes(searchFilter.toLowerCase())
      )
    }

    return filtered
  }, [counterpartyData, searchFilter, selectedCounterparty])

  // Clear search when counterparty is selected
  React.useEffect(() => {
    if (selectedCounterparty && selectedCounterparty !== "all") {
      setSearchFilter("")
    }
  }, [selectedCounterparty])

  const isSpecificCounterpartySelected = selectedCounterparty && selectedCounterparty !== "all"

  // Calculate dynamic height
  const dynamicHeight = React.useMemo(() => {
    const baseHeight = 200
    const itemHeight = 120
    const maxHeight = 830
    
    const calculatedHeight = baseHeight + (filteredCounterparties.length * itemHeight)
    return Math.min(calculatedHeight, maxHeight)
  }, [filteredCounterparties.length])

  const scrollAreaHeight = React.useMemo(() => {
    if (isSpecificCounterpartySelected) {
      return "100%"
    }
    const searchBarHeight = 56
    return `calc(100% - ${searchBarHeight}px)`
  }, [isSpecificCounterpartySelected])

  const handleCounterpartyClick = (counterparty: CounterpartyData) => {
    if (!onCounterpartyClick) return
    
    const isSelected = selectedCounterparty === counterparty.name
    
    if (isSelected) {
      onCounterpartyClick("all")
    } else {
      onCounterpartyClick(counterparty.name)
    }
  }

  return (
    <Card 
      className="bg-gradient-to-b from-white to-gray-100 flex flex-col transition-all duration-300 ease-in-out"
      style={{ height: `${dynamicHeight}px` }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Counterparties</CardTitle>
        <CardDescription>
          Total outbound spending by counterparty
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <CounterpartySearch
          value={searchFilter}
          onChange={setSearchFilter}
          isVisible={!isSpecificCounterpartySelected}
        />
        <ScrollArea className="pr-4" style={{ height: scrollAreaHeight }}>
          <div className="space-y-4 pt-3 pb-6">
            {filteredCounterparties.map((counterparty, index) => {
              const isCounterpartySelected = selectedCounterparty === counterparty.name
              
              return (
                <CounterpartyListItem
                  key={counterparty.name}
                  counterparty={counterparty}
                  index={index}
                  isSelected={isCounterpartySelected}
                  onClick={handleCounterpartyClick}
                />
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
