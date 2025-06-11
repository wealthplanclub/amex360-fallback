
import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import { Transaction } from "@/types/transaction"
import { globalFilterFn } from "@/utils/transactionUtils"
import { useTransactionColumns } from "./TransactionColumns"
import { TransactionTableContent } from "./TransactionTableContent"
import { TransactionPagination } from "./TransactionPagination"

interface TransactionTableProps {
  transactions: Transaction[]
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
}

export function TransactionTable({ transactions, globalFilter, onGlobalFilterChange }: TransactionTableProps) {
  const [showAll, setShowAll] = React.useState(false)
  const columns = useTransactionColumns()
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: onGlobalFilterChange,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 50, // Increase from 10 to 50 to show more records per page
      },
    },
  })

  const handleShowAll = () => {
    setShowAll(true)
    table.setPageSize(table.getFilteredRowModel().rows.length) // Show all filtered rows
  }

  const handleShowPaginated = () => {
    setShowAll(false)
    table.setPageSize(50) // Reset to 50 rows per page
  }

  const filteredRowCount = table.getFilteredRowModel().rows.length

  // Add console log to track transaction counts
  React.useEffect(() => {
    console.log(`TransactionTable: Total transactions: ${transactions.length}, Filtered: ${filteredRowCount}`)
  }, [transactions.length, filteredRowCount])

  return (
    <>
      <TransactionTableContent 
        table={table} 
        showAll={showAll} 
        columnsLength={columns.length} 
      />
      <TransactionPagination
        table={table}
        showAll={showAll}
        filteredRowCount={filteredRowCount}
        onShowAll={handleShowAll}
        onShowPaginated={handleShowPaginated}
      />
    </>
  )
}
