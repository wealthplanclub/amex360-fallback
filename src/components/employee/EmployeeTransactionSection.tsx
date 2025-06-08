
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
  const showCardImage = selectedCardType && selectedCardType !== "all" && !selectedCardType.includes('(')

  return (
    <div className="lg:col-span-2">
      <div className="bg-gradient-to-b from-white to-gray-100 rounded-lg border">
        <div className="p-6 pb-2">
          {/* 2-column header layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end mb-4">
            {/* Left column - Title, description, filter indicator, and search */}
            <div>
              <h2 className="text-xl font-semibold">Employee Transactions</h2>
              {!hasAnyFilter && (
                <p className="text-sm text-muted-foreground mt-1">
                  View and manage employee card transactions
                </p>
              )}
              
              {hasAnyFilter && (
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
              
              <div className="mt-4">
                <Input
                  placeholder="Search descriptions..."
                  value={globalFilter ?? ""}
                  onChange={(event) => onGlobalFilterChange(event.target.value)}
                  className="max-w-sm"
                />
              </div>
            </div>

            {/* Right column - Card image and dropdown */}
            <div className="flex flex-col items-end gap-3">
              {showCardImage && (
                <div className="flex justify-end">
                  <img 
                    src={getCardImage(selectedCardType)} 
                    alt={`${selectedCardType} card`}
                    className="w-24 h-15 object-cover rounded shadow-sm"
                  />
                </div>
              )}
              <div className="flex justify-end">
                <CardFilterDropdown
                  selectedCard={getCardDropdownDisplayText()}
                  creditCards={uniqueCardTypes}
                  onCardChange={handleCardDropdownChange}
                />
              </div>
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
