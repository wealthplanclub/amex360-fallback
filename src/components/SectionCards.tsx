
import { TrendingDown, TrendingUp } from "lucide-react"
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  // Parse the CSV data and calculate totals
  const transactions = parseTransactionData(staticTxnData);
  const totalExpenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
  
  const totalCredits = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Calculate top card spend
  const cardExpenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => {
      const account = transaction.account;
      if (!acc[account]) {
        acc[account] = 0;
      }
      acc[account] += Math.abs(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

  const topCardSpend = Math.max(...Object.values(cardExpenses));
  const lowestCardSpend = Math.min(...Object.values(cardExpenses));
  const topCardPercentage = ((topCardSpend / totalExpenses) * 100).toFixed(1);
  const lowestCardPercentage = ((lowestCardSpend / totalExpenses) * 100).toFixed(1);

  // Find the account names for highest and lowest spending
  const topCardAccount = Object.entries(cardExpenses).find(([_, amount]) => amount === topCardSpend)?.[0] || "";
  const lowestCardAccount = Object.entries(cardExpenses).find(([_, amount]) => amount === lowestCardSpend)?.[0] || "";

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="relative bg-gradient-to-b from-white to-gray-100">
        <CardHeader className="pb-6">
          <CardDescription>Total Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums lg:text-3xl">
            ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0 pb-6">
          <div className="flex gap-2 font-medium items-center">
            Trending up this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      
      <Card className="relative bg-gradient-to-b from-white to-gray-100">
        <CardHeader className="pb-6">
          <CardDescription>Total Payments/Credits</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums lg:text-3xl">
            ${totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +8.2%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0 pb-6">
          <div className="flex gap-2 font-medium items-center">
            Steady incoming payments <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">
            Credits and refunds received
          </div>
        </CardFooter>
      </Card>
      
      <Card className="relative bg-gradient-to-b from-white to-gray-100">
        <CardHeader className="pb-6">
          <CardDescription>Top Card Spend</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums lg:text-3xl">
            ${topCardSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              {topCardPercentage}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0 pb-6">
          <div className="flex gap-2 font-medium items-center">
            {topCardAccount} <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">Account with most expenses</div>
        </CardFooter>
      </Card>
      
      <Card className="relative bg-gradient-to-b from-white to-gray-100">
        <CardHeader className="pb-6">
          <CardDescription>Lowest Card Spend</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums lg:text-3xl">
            ${lowestCardSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="gap-1">
              <TrendingDown className="h-3 w-3" />
              {lowestCardPercentage}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0 pb-6">
          <div className="flex gap-2 font-medium items-center">
            {lowestCardAccount} <TrendingDown className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">Account with least expenses</div>
        </CardFooter>
      </Card>
    </div>
  )
}
