
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CardFilterDropdown } from "@/components/transaction/CardFilterDropdown"
import { EmployeeTransactionTable } from "./EmployeeTransactionTable"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"
import { getAllPrimaryCards } from "@/data/staticPrimaryCards"

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
  // Get primary card display names
  const primaryCards = getAllPrimaryCards()
  const primaryCardDisplayNames = primaryCards.map(card => card.displayName)

  return (
    <Card className="bg-gradient-to-b from-white to-gray-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Employee Transactions</CardTitle>
          {hasAnyFilter && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {getFilterDisplayText()}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllFilters}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
          <Input
            placeholder="Search descriptions..."
            value={globalFilter ?? ""}
            onChange={(event) => onGlobalFilterChange(event.target.value)}
            className="max-w-sm"
          />
          <CardFilterDropdown
            selectedCard={getCardDropdownDisplayText()}
            creditCards={primaryCardDisplayNames}
            onCardChange={handleCardDropdownChange}
          />
        </div>
        <EmployeeTransactionTable
          transactions={filteredTransactions}
          globalFilter={globalFilter}
          onGlobalFilterChange={onGlobalFilterChange}
        />
      </CardContent>
    </Card>
  )
}
