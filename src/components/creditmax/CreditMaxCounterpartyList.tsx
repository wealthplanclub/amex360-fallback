
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
import { CreditMaxCounterpartyItem } from "./CreditMaxCounterpartyItem"
import { CreditMaxCounterpartySearch } from "./CreditMaxCounterpartySearch"
import { useCreditMaxCounterpartyData } from "@/hooks/useCreditMaxCounterpartyData"

interface CreditMaxCounterpartyListProps {
  selectedCounterparty?: string
  onCounterpartyClick?: (counterparty: string) => void
  transactions: SwapTransaction[]
}

export function CreditMaxCounterpartyList({ selectedCounterparty, onCounterpartyClick, transactions }: CreditMaxCounterpartyListProps) {
  const [counterpartyFilter, setCounterpartyFilter] = React.useState("")

  // Clear search filter when a specific counterparty is selected
  React.useEffect(() => {
    if (selectedCounterparty && selectedCounterparty !== "all") {
      setCounterpartyFilter("")
    }
  }, [selectedCounterparty])

  // Use the custom hook for counterparty data processing
  const { filteredCounterpartyData } = useCreditMaxCounterpartyData(transactions, counterpartyFilter)

  // Check if a specific counterparty is selected
  const isSpecificCounterpartySelected = selectedCounterparty && selectedCounterparty !== "all"

  // Calculate dynamic height based on filtered counterparty count and search bar visibility
  const dynamicHeight = React.useMemo(() => {
    const baseHeight = 200
    const itemHeight = 120
    const maxHeight = 830
    
    const calculatedHeight = baseHeight + (filteredCounterpartyData.length * itemHeight)
    return Math.min(calculatedHeight, maxHeight)
  }, [filteredCounterpartyData.length])

  // Calculate scroll area height (subtract space for search bar only if it's visible)
  const scrollAreaHeight = React.useMemo(() => {
    if (isSpecificCounterpartySelected) {
      return "100%" // No search bar space to subtract
    }
    const searchBarHeight = 56 // height of search input + margin
    return `calc(100% - ${searchBarHeight}px)`
  }, [isSpecificCounterpartySelected])

  const handleCounterpartyClick = (counterparty: any) => {
    if (!onCounterpartyClick) return
    
    console.log('Counterparty clicked in list:', { counterparty, selectedCounterparty })
    
    // Check if this specific counterparty is selected
    const isSelected = selectedCounterparty === counterparty.name
    
    if (isSelected) {
      // If this counterparty is currently selected, go back to "all"
      onCounterpartyClick("all")
    } else {
      // Select this counterparty
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
          Total outbound by counterparty
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <CreditMaxCounterpartySearch
          value={counterpartyFilter}
          onChange={setCounterpartyFilter}
          isVisible={!isSpecificCounterpartySelected}
        />
        <ScrollArea className="pr-4" style={{ height: scrollAreaHeight }}>
          <div className="space-y-4 pt-3 pb-6">
            {filteredCounterpartyData.map((counterparty, index) => {
              const isCounterpartySelected = selectedCounterparty === counterparty.name
              
              return (
                <CreditMaxCounterpartyItem
                  key={counterparty.name}
                  counterparty={counterparty}
                  index={index}
                  isCounterpartySelected={isCounterpartySelected}
                  selectedCounterparty={selectedCounterparty}
                  onCounterpartyClick={handleCounterpartyClick}
                />
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
