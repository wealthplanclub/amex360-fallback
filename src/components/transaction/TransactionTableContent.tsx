
import * as React from "react"
import { Table as ReactTable, flexRender } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Transaction } from "@/types/transaction"
import { VirtualizedTransactionTableContent } from "./VirtualizedTransactionTableContent"

interface TransactionTableContentProps {
  table: ReactTable<Transaction>
  showAll: boolean
  columnsLength: number
}

const VIRTUALIZATION_THRESHOLD = 100

export function TransactionTableContent({ table, showAll, columnsLength }: TransactionTableContentProps) {
  const rowCount = table.getRowModel().rows.length
  
  // Use virtualization for large datasets when showing all
  if (showAll && rowCount > VIRTUALIZATION_THRESHOLD) {
    return (
      <VirtualizedTransactionTableContent 
        table={table} 
        columnsLength={columnsLength} 
      />
    )
  }

  // Regular table for pagination or small datasets
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
              colSpan={columnsLength}
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
    <div className="rounded-md border">
      {tableContent}
    </div>
  )
}
