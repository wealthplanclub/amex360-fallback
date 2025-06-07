
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from "lucide-react"
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
            <ChevronsUpDown className="ml-1 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue("date") as string
        // Parse ISO date correctly to avoid timezone issues
        const [year, month, day] = date.split('-').map(Number)
        const dateObj = new Date(year, month - 1, day) // Create date in local timezone
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric'
        })
        
        return <div className="font-medium text-center">{formattedDate}</div>
      },
    },
    {
      accessorKey: "reward_description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.getValue("reward_description") as string
        const cleanDescription = description.replace(/\bspend\b/gi, '').replace(/\s+/g, ' ').trim()
        return <div className="max-w-[300px] truncate">{cleanDescription}</div>
      },
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
      accessorKey: "award_code",
      header: "Award Code",
      cell: ({ row }) => <div className="font-mono text-xs">{row.getValue("award_code")}</div>,
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
            <ChevronsUpDown className="ml-1 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const points = row.getValue("points") as number
        return <div className="text-right font-medium" style={{ color: '#006fcf' }}>+{points.toLocaleString()}</div>
      },
    },
  ]
}
