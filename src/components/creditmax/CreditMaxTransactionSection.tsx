
import React from "react"
import { CreditMaxTransactionTable } from "./CreditMaxTransactionTable"
import { Input } from "@/components/ui/input"
import { CardFilterDropdown } from "@/components/transaction/CardFilterDropdown"
import { X } from "lucide-react"
import { SwapTransaction } from "@/utils/swapParser"

interface CreditMaxTransactionSectionProps {
  filteredTransactions: SwapTransaction[]
  hasAnyFilter: boolean
  getFilterDisplayText: () => string
  handleClearAllFilters: () => void
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  getCounterpartyDropdownDisplayText: () => string
  uniqueCounterparties: string[]
  handleCounterpartyDropdownChange: (counterparty: string) => void
}

export function CreditMaxTransactionSection({
  filteredTransactions,
  hasAnyFilter,
  getFilterDisplayText,
  handleClearAllFilters,
  globalFilter,
  onGlobalFilterChange,
  getCounterpartyDropdownDisplayText,
  uniqueCounterparties,
  handleCounterpartyDropdownChange
}: CreditMaxTransactionSectionProps) {
  const filterText = getFilterDisplayText()

  return (
    <div className="lg:col-span-2">
      <div className="bg-gradient-to-b from-white to-gray-100 rounded-lg border">
        <div className="p-6 pb-2">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Swap transactions</h2>
              
              {/* Filter indicator */}
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
                  View and filter swap transaction activity
                </p>
              )}
            </div>
          </div>

          {/* Filter controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end mb-4">
            {/* Left column - search */}
            <div>
              <Input
                placeholder="Search transactions..."
                value={globalFilter ?? ""}
                onChange={(event) => onGlobalFilterChange(event.target.value)}
                className="max-w-sm"
              />
            </div>

            {/* Right column - dropdown */}
            <div className="flex justify-end">
              <CardFilterDropdown
                selectedCard={getCounterpartyDropdownDisplayText()}
                creditCards={uniqueCounterparties}
                onCardChange={handleCounterpartyDropdownChange}
              />
            </div>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <CreditMaxTransactionTable
            transactions={filteredTransactions}
            globalFilter={globalFilter}
            onGlobalFilterChange={onGlobalFilterChange}
          />
        </div>
      </div>
    </div>
  )
}
