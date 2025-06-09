
import React, { useState } from "react"
import { SwapTransactionTable } from "./SwapTransactionTable"
import { Input } from "@/components/ui/input"
import { CounterpartyFilterDropdown } from "./CounterpartyFilterDropdown"
import { X } from "lucide-react"
import { SwapTransaction } from "@/utils/swapParser"

interface SwapTransactionSectionProps {
  filteredTransactions: SwapTransaction[]
  hasAnyFilter: boolean
  getFilterDisplayText: () => string
  handleClearAllFilters: () => void
  selectedCounterparty: string
  uniqueCounterparties: string[]
  handleCounterpartyDropdownChange: (counterparty: string) => void
}

export function SwapTransactionSection({
  filteredTransactions,
  hasAnyFilter,
  getFilterDisplayText,
  handleClearAllFilters,
  selectedCounterparty,
  uniqueCounterparties,
  handleCounterpartyDropdownChange
}: SwapTransactionSectionProps) {
  // Local state for search input
  const [globalFilter, setGlobalFilter] = useState("")
  
  const filterText = getFilterDisplayText()

  return (
    <div className="lg:col-span-2">
      <div className="bg-gradient-to-b from-white to-gray-100 rounded-lg border">
        <div className="p-6 pb-2">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">CreditMax transactions</h2>
              
              {hasAnyFilter && (
                <div className="mt-2">
                  <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                    Filtered by: {filterText}
                    <button 
                      onClick={handleClearAllFilters}
                      className="hover:bg-gray-200 rounded p-0.5"
                      title="Clear all filters"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </div>
              )}
              
              {!hasAnyFilter && (
                <p className="text-sm text-muted-foreground mt-1">
                  View and filter swap transactions
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end mb-4">
            <div>
              <Input
                placeholder="Search transactions..."
                value={globalFilter ?? ""}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="max-w-sm"
              />
            </div>

            <div className="flex justify-end">
              <CounterpartyFilterDropdown
                selectedCounterparty={selectedCounterparty}
                counterparties={uniqueCounterparties}
                onCounterpartyChange={handleCounterpartyDropdownChange}
              />
            </div>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <SwapTransactionTable
            transactions={filteredTransactions}
            globalFilter={globalFilter}
            onGlobalFilterChange={setGlobalFilter}
          />
        </div>
      </div>
    </div>
  )
}
