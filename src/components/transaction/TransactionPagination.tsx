
import * as React from "react"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Transaction } from "@/types/transaction"

interface TransactionPaginationProps {
  table: Table<Transaction>
  showAll: boolean
  filteredRowCount: number
  onShowAll: () => void
  onShowPaginated: () => void
}

export function TransactionPagination({ 
  table, 
  showAll, 
  filteredRowCount, 
  onShowAll, 
  onShowPaginated 
}: TransactionPaginationProps) {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="text-sm text-muted-foreground">
        {showAll 
          ? `Showing all ${filteredRowCount} results`
          : `Showing ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to ${Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredRowCount)} of ${filteredRowCount} results`
        }
      </div>
      <div className="space-x-2">
        {showAll ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onShowPaginated}
          >
            Show Paginated
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            {filteredRowCount > 10 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onShowAll}
              >
                All
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
