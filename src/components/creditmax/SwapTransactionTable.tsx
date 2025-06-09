
import React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
} from "@tanstack/react-table"
import { useState } from "react"
import { SwapTransactionTableContent } from "./SwapTransactionTableContent"
import { SwapTransactionPagination } from "./SwapTransactionPagination"
import { useSwapTransactionColumns } from "./SwapTransactionColumns"
import { SwapTransaction } from "@/utils/swapParser"

interface SwapTransactionTableProps {
  transactions: SwapTransaction[]
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
}

export function SwapTransactionTable({
  transactions,
  globalFilter,
  onGlobalFilterChange,
}: SwapTransactionTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [showAll, setShowAll] = useState(false)
  
  const columns = useSwapTransactionColumns()

  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    globalFilterFn: (row, columnId, value) => {
      const search = value.toLowerCase()
      return (
        row.original.counterparty.toLowerCase().includes(search) ||
        row.original.card.toLowerCase().includes(search) ||
        row.original.direction.toLowerCase().includes(search)
      )
    },
    onGlobalFilterChange,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className="w-full">
      <SwapTransactionTableContent 
        table={table}
        showAll={showAll}
        columnsLength={columns.length}
      />
      <SwapTransactionPagination 
        table={table}
        showAll={showAll}
        setShowAll={setShowAll}
      />
    </div>
  )
}
