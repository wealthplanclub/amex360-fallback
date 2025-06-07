"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ChevronsUpDown, ChevronDown, CreditCard } from "lucide-react"

import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  account: string
  category: string
}

// Custom global filter function for descriptions and amounts
const globalFilterFn = (row: any, columnId: string, value: string) => {
  const description = String(row.getValue("description")).toLowerCase()
  const amount = String(row.getValue("amount")).toLowerCase()
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(parseFloat(row.getValue("amount")))).toLowerCase()
  
  const searchValue = value.toLowerCase()
  
  return description.includes(searchValue) || 
         amount.includes(searchValue) || 
         formattedAmount.includes(searchValue)
}

// Function to format account names according to the rules
const formatAccountName = (accountName: string): string => {
  let formatted = accountName.replace(/\bcard\b/gi, '').trim()
  
  // Apply conditional formatting rules
  formatted = formatted.replace(/business/gi, '').trim()
  formatted = formatted.replace(/rewards/gi, '').trim()
  formatted = formatted.replace(/charles/gi, '').trim()
  
  // Clean up extra spaces
  formatted = formatted.replace(/\s+/g, ' ').trim()
  
  return formatted
}

interface TransactionCardProps {
  selectedCardFromGrid?: string;
}

export function TransactionCard({ selectedCardFromGrid }: TransactionCardProps) {
  // Parse the CSV data and get all transactions - memoize this to prevent re-parsing
  const allTransactions: Transaction[] = React.useMemo(() => {
    const rawTransactions = parseTransactionData(staticTxnData);
    
    return rawTransactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((transaction, index) => ({
        id: `txn-${index}`,
        ...transaction
      }));
  }, []);

  // Extract unique credit cards
  const creditCards = React.useMemo(() => {
    const uniqueCards = Array.from(new Set(allTransactions.map(t => formatAccountName(t.account))))
      .filter(card => card.length > 0)
      .sort()
    return uniqueCards
  }, [allTransactions]);

  const [selectedCard, setSelectedCard] = React.useState<string>("all")

  // Sync with the card selected from the grid
  React.useEffect(() => {
    if (selectedCardFromGrid && selectedCardFromGrid !== "all") {
      setSelectedCard(selectedCardFromGrid);
    }
  }, [selectedCardFromGrid]);

  // Filter transactions by selected card
  const transactions = React.useMemo(() => {
    if (selectedCard === "all") {
      return allTransactions
    }
    
    // Special handling for combined Business Green cards
    if (selectedCard === 'BUSINESS_GREEN_COMBINED') {
      return allTransactions.filter(transaction => 
        transaction.account.toLowerCase().includes('business green rewards')
      )
    }
    
    return allTransactions.filter(transaction => 
      transaction.account === selectedCard
    )
  }, [allTransactions, selectedCard]);

  // Memoize columns to prevent recreation on every render
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
        const date = new Date(row.getValue("date"));
        return (
          <div className="text-sm text-center">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric"
            })}
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
  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
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

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
        <CardDescription className="mb-0">
          Latest transaction activity with advanced filtering and sorting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Search descriptions and amounts..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <CreditCard className="mr-2 h-4 w-4" />
                  {selectedCard === "all" ? "All Cards" : 
                   selectedCard === "BUSINESS_GREEN_COMBINED" ? "Business Green Combined" :
                   formatAccountName(selectedCard)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                  checked={selectedCard === "all"}
                  onCheckedChange={() => setSelectedCard("all")}
                >
                  All Cards
                </DropdownMenuCheckboxItem>
                {creditCards.map((card) => (
                  <DropdownMenuCheckboxItem
                    key={card}
                    checked={selectedCard === card}
                    onCheckedChange={() => setSelectedCard(card)}
                  >
                    {formatAccountName(card)}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
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
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2">
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
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
