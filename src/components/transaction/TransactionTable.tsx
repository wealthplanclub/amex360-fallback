import * as React from "react"
import {
  ColumnDef,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Transaction } from "@/types/transaction"
import { formatAccountName, globalFilterFn } from "@/utils/transactionUtils"

interface TransactionTableProps {
  transactions: Transaction[]
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
}

export function TransactionTable({ transactions, globalFilter, onGlobalFilterChange }: TransactionTableProps) {
  const [showAll, setShowAll] = React.useState(false)
  
  const columns: ColumnDef<Transaction>[] = React.useMemo(() => [
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ChevronsUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const dateString = row.getValue("date") as string;
        // Parse ISO date string directly without timezone conversion
        const [year, month, day] = dateString.split('-').map(Number);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        return (
          <div className="text-sm text-center">
            {monthNames[month - 1]} {day}
          </div>
        );
      },
      size: 60,
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ChevronsUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate text-sm font-medium">
          {row.getValue("description")}
        </div>
      ),
      filterFn: "includesString",
    },
    {
      accessorKey: "account",
      header: "Account",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {formatAccountName(row.getValue("account") as string)}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue("category") || "—"}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const isNegative = amount < 0
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Math.abs(amount))

        return (
          <div className={`text-right font-medium tabular-nums ${
            isNegative ? 'text-sm font-medium' : 'text-green-600'
          }`}>
            {isNegative ? '-' : '+'}{formatted}
          </div>
        )
      },
    },
  ], []);

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
        pageSize: 10,
      },
    },
  })

  const handleShowAll = () => {
    setShowAll(true)
    table.setPageSize(transactions.length) // Show all rows
  }

  const handleShowPaginated = () => {
    setShowAll(false)
    table.setPageSize(10) // Reset to 10 rows per page
  }

  const filteredRowCount = table.getFilteredRowModel().rows.length

  const tableContent = (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )

  return (
    <>
      <div className="rounded-md border">
        {showAll ? (
          <ScrollArea className="h-[600px]">
            {tableContent}
          </ScrollArea>
        ) : (
          tableContent
        )}
      </div>
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
              onClick={handleShowPaginated}
            >
              Show Pages
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
                  onClick={handleShowAll}
                >
                  All
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
