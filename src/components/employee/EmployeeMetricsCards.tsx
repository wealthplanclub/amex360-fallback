
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployeeTransaction } from "./EmployeeTransactionColumns"

interface EmployeeMetricsCardsProps {
  filteredTransactions: EmployeeTransaction[]
  selectedCardType?: string
  selectedLastFive?: string
}

export function EmployeeMetricsCards({
  filteredTransactions,
  selectedCardType,
  selectedLastFive
}: EmployeeMetricsCardsProps) {
  // Calculate metrics based on the filtered transactions
  const metrics = React.useMemo(() => {
    // Calculate expenses (negative amounts - charges)
    const expenses = filteredTransactions.filter(transaction => transaction.amount < 0)
    const totalExpenses = expenses.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0)
    
    // Calculate payments (positive amounts)
    const payments = filteredTransactions.filter(transaction => transaction.amount > 0)
    const totalPayments = payments.reduce((sum, transaction) => sum + transaction.amount, 0)

    // Calculate average transaction amount (absolute value)
    const avgTransaction = filteredTransactions.length > 0 
      ? filteredTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / filteredTransactions.length 
      : 0

    // Calculate total points (sum of amounts * point multiples for expenses only)
    const totalPoints = expenses.reduce((sum, transaction) => 
      sum + (Math.abs(transaction.amount) * transaction.point_multiple), 0
    )

    return {
      totalExpenses,
      totalPayments,
      avgTransaction,
      totalPoints,
      transactionCount: filteredTransactions.length
    }
  }, [filteredTransactions])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${metrics.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground">
            Charges across all cards
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-[#008767]">
            +${metrics.totalPayments.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground">
            Credits and payments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${metrics.avgTransaction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-muted-foreground">
            Average per transaction
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(metrics.totalPoints).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Points earned from expenses
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
