
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
import { Reward } from "@/types/reward"
import { globalFilterFn } from "@/utils/transactionUtils"
import { useRewardColumns } from "./RewardColumns"
import { RewardTableContent } from "./RewardTableContent"
import { RewardPagination } from "./RewardPagination"

interface RewardTableProps {
  rewards: Reward[]
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
}

export function RewardTable({ rewards, globalFilter, onGlobalFilterChange }: RewardTableProps) {
  const [showAll, setShowAll] = React.useState(false)
  const columns = useRewardColumns()
  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data: rewards,
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
        pageSize: 10,
      },
    },
  })

  const handleShowAll = () => {
    setShowAll(true)
    table.setPageSize(rewards.length)
  }

  const handleShowPaginated = () => {
    setShowAll(false)
    table.setPageSize(10)
  }

  const filteredRowCount = table.getFilteredRowModel().rows.length

  return (
    <>
      <RewardTableContent 
        table={table} 
        showAll={showAll} 
        columnsLength={columns.length} 
      />
      <RewardPagination
        table={table}
        showAll={showAll}
        filteredRowCount={filteredRowCount}
        onShowAll={handleShowAll}
        onShowPaginated={handleShowPaginated}
      />
    </>
  )
}
