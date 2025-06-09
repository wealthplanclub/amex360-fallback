
import React from "react"
import { CreditMaxCounterpartyList } from "./CreditMaxCounterpartyList"
import { SwapTransaction } from "@/utils/swapParser"

interface CreditMaxCounterpartySectionProps {
  selectedCounterparty?: string
  handleCounterpartyClick: (counterparty: string) => void
  transactionsToShow: SwapTransaction[]
}

export function CreditMaxCounterpartySection({
  selectedCounterparty,
  handleCounterpartyClick,
  transactionsToShow
}: CreditMaxCounterpartySectionProps) {
  return (
    <div className="lg:col-span-1">
      <CreditMaxCounterpartyList 
        selectedCounterparty={selectedCounterparty}
        onCounterpartyClick={handleCounterpartyClick}
        transactions={transactionsToShow}
      />
    </div>
  )
}
