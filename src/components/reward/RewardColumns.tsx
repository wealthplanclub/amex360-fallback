
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Reward } from "@/types/reward"

export function useRewardColumns(): ColumnDef<Reward>[] {
  return [
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-100"
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue("date") as string
        const [year, month, day] = date.split('-').map(Number)
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        
        return <div className="font-medium">{monthNames[month - 1]} {day}, {year}</div>
      },
    },
    {
      accessorKey: "award_code",
      header: "Award Code",
      cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("award_code")}</div>,
    },
    {
      accessorKey: "card",
      header: "Card",
      cell: ({ row }) => {
        const card = row.getValue("card") as string
        const displayName = card.replace(/\bcard\b/gi, '').trim()
        return <div className="max-w-[200px] truncate" title={card}>{displayName}</div>
      },
    },
    {
      accessorKey: "reward_description",
      header: "Description",
      cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue("reward_description")}</div>,
    },
    {
      accessorKey: "points",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-100"
          >
            Points
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const points = row.getValue("points") as number
        return <div className="text-right font-medium text-green-600">+{points.toLocaleString()}</div>
      },
    },
    {
      accessorKey: "required_spend",
      header: "Required Spend",
      cell: ({ row }) => {
        const spend = row.getValue("required_spend") as number | undefined
        return spend ? <div className="text-right">${spend.toLocaleString()}</div> : <div className="text-right text-gray-400">-</div>
      },
    },
  ]
}
