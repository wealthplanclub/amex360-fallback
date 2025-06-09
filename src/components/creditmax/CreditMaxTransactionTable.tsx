
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
import { SwapTransaction } from "@/utils/swapParser"
import { useCreditMaxTransactionColumns } from "./CreditMaxTransactionColumns"
import { CreditMaxTransactionTableContent } from "./CreditMaxTransactionTableContent"
import { CreditMaxTransactionPagination } from "./CreditMaxTransactionPagination"

interface CreditMaxTransactionTableProps {
  transactions: SwapTransaction[]
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
}

export function CreditMaxTransactionTable({ transactions, globalFilter, onGlobalFilterChange }: CreditMaxTransactionTableProps) {
  const [showAll, setShowAll] = React.useState(false)
  const columns = useCreditMaxTransactionColumns()
  
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
      <CreditMaxTransactionTableContent 
        table={table} 
        showAll={showAll} 
        columnsLength={columns.length} 
      />
      <CreditMaxTransactionPagination
        table={table}
        showAll={showAll}
        filteredRowCount={filteredRowCount}
        onShowAll={handleShowAll}
        onShowPaginated={handleShowPaginated}
      />
    </>
  )
}
