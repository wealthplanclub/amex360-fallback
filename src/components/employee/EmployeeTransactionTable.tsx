
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
import { EmployeeTransaction, useEmployeeTransactionColumns } from "./EmployeeTransactionColumns"
import { EmployeeTransactionTableContent } from "./EmployeeTransactionTableContent"
import { EmployeeTransactionPagination } from "./EmployeeTransactionPagination"

interface EmployeeTransactionTableProps {
  transactions: EmployeeTransaction[]
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
}

export function EmployeeTransactionTable({ transactions, globalFilter, onGlobalFilterChange }: EmployeeTransactionTableProps) {
  const [showAll, setShowAll] = React.useState(false)
  const columns = useEmployeeTransactionColumns()
  
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "date", desc: true }])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: onGlobalFilterChange,
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
        pageSize: 10,
      },
    },
  })

  const handleShowAll = () => {
    setShowAll(true)
    table.setPageSize(table.getFilteredRowModel().rows.length)
  }

  const handleShowPaginated = () => {
    setShowAll(false)
    table.setPageSize(10)
  }

  const filteredRowCount = table.getFilteredRowModel().rows.length

  return (
    <>
      <EmployeeTransactionTableContent 
        table={table} 
        showAll={showAll} 
        columnsLength={columns.length} 
      />
      <EmployeeTransactionPagination
        table={table}
        showAll={showAll}
        filteredRowCount={filteredRowCount}
        onShowAll={handleShowAll}
        onShowPaginated={handleShowPaginated}
      />
    </>
  )
}
