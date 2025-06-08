
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SwapTransaction } from "@/utils/swapParser"

export function CreditMaxTableColumns(): ColumnDef<SwapTransaction>[] {
  return [
    {
      accessorKey: "date",
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium hover:bg-transparent"
          >
            Date
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return <div className="font-medium">{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "counterparty",
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium hover:bg-transparent"
          >
            Counterparty
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("counterparty")}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium hover:bg-transparent text-right justify-end"
          >
            Amount
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "direction",
      header: "Direction",
      cell: ({ row }) => {
        const direction = row.getValue("direction") as string
        const isSwapIn = direction === "SWAP_IN"
        return (
          <div className={`font-medium ${
            isSwapIn ? "text-green-600" : "text-red-600"
          }`}>
            {direction}
          </div>
        )
      },
    },
    {
      accessorKey: "multiple",
      header: ({ column }) => {
        const isSorted = column.getIsSorted()
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium hover:bg-transparent text-right justify-end"
          >
            Multiple
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        )
      },
      cell: ({ row }) => {
        const multiple = parseFloat(row.getValue("multiple"))
        return <div className="text-right font-medium">{multiple}x</div>
      },
    },
    {
      accessorKey: "card",
      header: "Card",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("card")}</div>
      ),
    },
  ]
}
