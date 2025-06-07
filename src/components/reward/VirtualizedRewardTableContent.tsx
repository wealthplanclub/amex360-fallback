
import * as React from "react"
import { FixedSizeList as List } from "react-window"
import { Table as TanstackTable, flexRender } from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Reward } from "@/types/reward"

interface VirtualizedRewardTableContentProps {
  table: TanstackTable<Reward>
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

export function VirtualizedRewardTableContent({ 
  table, 
  columnsLength 
}: VirtualizedRewardTableContentProps) {
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
                No rewards found.
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
      <div className="relative">
        <List
          height={600}
          width="100%"
          itemCount={rows.length}
          itemSize={ROW_HEIGHT}
          itemData={{ rows, columns }}
        >
          {Row}
        </List>
      </div>
    </div>
  )
}
