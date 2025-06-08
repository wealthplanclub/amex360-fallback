
import React from "react"
import { EmployeeTransactionTable } from "./EmployeeTransactionTable"
import { Input } from "@/components/ui/input"
import { CardFilterDropdown } from "@/components/transaction/CardFilterDropdown"
import { X } from "lucide-react"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"
import { getCardImage } from "@/utils/cardImageUtils"

interface EmployeeTransactionSectionProps {
  filteredTransactions: EmployeeTransaction[]
  hasAnyFilter: boolean
  getFilterDisplayText: () => string
  handleClearAllFilters: () => void
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  getCardDropdownDisplayText: () => string
  uniqueCardTypes: string[]
  handleCardDropdownChange: (card: string) => void
}

export function EmployeeTransactionSection({
  filteredTransactions,
  hasAnyFilter,
  getFilterDisplayText,
  handleClearAllFilters,
  globalFilter,
  onGlobalFilterChange,
  getCardDropdownDisplayText,
  uniqueCardTypes,
  handleCardDropdownChange
}: EmployeeTransactionSectionProps) {
  const selectedCardType = getCardDropdownDisplayText()
  
  // Show card image whenever there's a card type filter active (not "all")
  const showCardImage = selectedCardType && selectedCardType !== "all"
  
  // Extract the base card type for the image (remove any parentheses content)
  const baseCardType = selectedCardType?.split('(')[0]?.trim() || selectedCardType

  return (
    <div className="lg:col-span-2">
      <div className="bg-gradient-to-b from-white to-gray-100 rounded-lg border">
        <div className="p-6 pb-2">
          {/* Header with card image in top right */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Employee card transactions</h2>
              
              {/* Filter indicator directly below title when card is showing */}
              {showCardImage && hasAnyFilter && (
                <div className="mt-2">
                  <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                    Filtered by: {getFilterDisplayText()}
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
                  View and filter employee card activity
                </p>
              )}
            </div>
            
            {showCardImage && (
              <div className="ml-4">
                <img 
                  src={getCardImage(baseCardType)} 
                  alt={`${baseCardType} card`}
                  className="w-16 h-10 object-cover rounded shadow-sm"
                />
              </div>
            )}
          </div>

          {/* Filter indicator and controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end mb-4">
            {/* Left column - filter indicator and search */}
            <div>
              {!showCardImage && hasAnyFilter && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                    Filtered by: {getFilterDisplayText()}
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
              
              <div>
                <Input
                  placeholder="Search descriptions..."
                  value={globalFilter ?? ""}
                  onChange={(event) => onGlobalFilterChange(event.target.value)}
                  className="max-w-sm"
                />
              </div>
            </div>

            {/* Right column - dropdown */}
            <div className="flex justify-end">
              <CardFilterDropdown
                selectedCard={getCardDropdownDisplayText()}
                creditCards={uniqueCardTypes}
                onCardChange={handleCardDropdownChange}
              />
            </div>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <EmployeeTransactionTable
            transactions={filteredTransactions}
            globalFilter={globalFilter}
            onGlobalFilterChange={onGlobalFilterChange}
          />
        </div>
      </div>
    </div>
  )
}
