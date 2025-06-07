
import * as React from "react"
import { FixedSizeList as List } from "react-window"
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

interface VirtualizedTransactionTableContentProps {
  table: ReactTable<Transaction>
  columnsLength: number
}

const ROW_HEIGHT = 60

interface RowProps {
  index: number
  style: React.CSSProperties
  data: {
    rows: any[]
    columns: any[]
  }
}

const Row = ({ index, style, data }: RowProps) => {
  const { rows, columns } = data
  const row = rows[index]

  return (
    <div style={style}>
      <TableRow className="border-b">
        {row.getVisibleCells().map((cell: any) => (
          <TableCell key={cell.id} className="p-4">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    </div>
  )
}

export function VirtualizedTransactionTableContent({ 
  table, 
  columnsLength 
}: VirtualizedTransactionTableContentProps) {
  const rows = table.getRowModel().rows
  const columns = table.getAllColumns()

  if (!rows?.length) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columnsLength} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      </Table>
      <div className="relative overflow-hidden">
        <List
          height={600}
          width="100%"
          itemCount={rows.length}
          itemSize={ROW_HEIGHT}
          itemData={{ rows, columns }}
          style={{ overflow: 'auto' }}
        >
          {Row}
        </List>
      </div>
    </div>
  )
}
