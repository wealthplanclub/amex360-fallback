
import React from "react"
import { EmployeeTransactionTable } from "./EmployeeTransactionTable"
import { Input } from "@/components/ui/input"
import { CardFilterDropdown } from "@/components/transaction/CardFilterDropdown"
import { X } from "lucide-react"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"

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
  // Calculate metrics from filtered transactions
  const metrics = React.useMemo(() => {
    const totalSpend = filteredTransactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    const totalPoints = filteredTransactions.reduce((sum, transaction) => sum + (Math.abs(transaction.amount) * transaction.point_multiple), 0)
    const avgPointsPerDollar = totalSpend > 0 ? totalPoints / totalSpend : 0

    return {
      totalSpend,
      totalPoints: Math.round(totalPoints),
      avgPointsPerDollar: Number(avgPointsPerDollar.toFixed(2))
    }
  }, [filteredTransactions])

  return (
    <div className="lg:col-span-2">
      <div className="bg-gradient-to-b from-white to-gray-100 rounded-lg border">
        <div className="p-6 pb-2">
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

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-sm text-muted-foreground">Total Spend</div>
              <div className="text-lg font-semibold" style={{ color: '#00175a' }}>
                ${metrics.totalSpend.toFixed(2)}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-sm text-muted-foreground">Total Points</div>
              <div className="text-lg font-semibold" style={{ color: '#00175a' }}>
                {metrics.totalPoints.toLocaleString()}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-sm text-muted-foreground">Avg Points/$</div>
              <div className="text-lg font-semibold" style={{ color: '#00175a' }}>
                {metrics.avgPointsPerDollar}
              </div>
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
            <Input
              placeholder="Search descriptions..."
              value={globalFilter ?? ""}
              onChange={(event) => onGlobalFilterChange(event.target.value)}
              className="max-w-sm"
            />
            <CardFilterDropdown
              selectedCard={getCardDropdownDisplayText()}
              creditCards={uniqueCardTypes}
              onCardChange={handleCardDropdownChange}
            />
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
