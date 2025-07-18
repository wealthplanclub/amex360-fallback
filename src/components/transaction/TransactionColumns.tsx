import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Transaction } from "@/types/transaction"
import { useAuth } from "@/contexts/AuthContext"

interface UseTransactionColumnsOptions {
  hideLastFive?: boolean
}

export const useTransactionColumns = (options: UseTransactionColumnsOptions = {}): ColumnDef<Transaction>[] => {
  const { isAdmin } = useAuth()
  const { hideLastFive = false } = options

  return React.useMemo(() => {
    console.log("Building transaction columns, isAdmin:", isAdmin());
    
    const columns: ColumnDef<Transaction>[] = [
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
      }
    ];

    // Only show description column for admin users
    if (isAdmin()) {
      console.log("Adding description column for admin user");
      columns.push({
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
      });
    } else {
      console.log("Skipping description column for non-admin user");
    }

    // Add remaining columns - these should show for ALL users
    console.log("Adding account_type column for all users");
    columns.push({
      accessorKey: "account_type",
      header: "Card Type",
      cell: ({ row }) => {
        // Support both new account_type and legacy card_type fields
        const accountType = row.getValue("account_type") as string | undefined;
        const cardType = row.getValue("card_type") as string | undefined;
        const displayValue = accountType || cardType;
        console.log("Rendering account_type:", displayValue);
        return (
          <div className="text-sm text-muted-foreground">
            {displayValue || "N/A"}
          </div>
        );
      },
    });

    // Only add last_five column if not hidden
    if (!hideLastFive) {
      console.log("Adding last_five column");
      columns.push({
        accessorKey: "last_five",
        header: "Last 5",
        cell: ({ row }) => {
          const lastFive = row.getValue("last_five") as string | undefined;
          console.log("Rendering last_five:", lastFive);
          return (
            <div className="text-sm font-mono">
              {lastFive || "N/A"}
            </div>
          );
        },
      });
    }

    // Add amount and point_multiple columns
    columns.push(
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("amount"))
          const absAmount = Math.abs(amount)
          
          // Format the absolute amount
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(absAmount)
          
          // Add prefix based on whether it's positive (credit/payment) or negative (charge/debit)
          const displayAmount = amount >= 0 ? `+${formatted}` : formatted
          const textColor = amount >= 0 ? "text-[#008767]" : ""

          return (
            <div className={`text-right font-medium tabular-nums text-sm ${textColor}`}>
              {displayAmount}
            </div>
          )
        },
      },
      {
        accessorKey: "point_multiple",
        header: () => <div className="text-right">Multiple</div>,
        cell: ({ row }) => {
          const multiple = row.getValue("point_multiple") as number | undefined
          return (
            <div className="text-right font-medium">
              {multiple ? `${multiple}x` : "1.0x"}
            </div>
          )
        },
      }
    );

    console.log("Final columns array length:", columns.length);
    return columns;
  }, [isAdmin, hideLastFive]);
}
