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

interface CardSpendGridProps {
  children?: React.ReactNode;
}

export function CardSpendGrid({ children }: CardSpendGridProps) {
  // Parse the CSV data and calculate totals
  const transactions = parseTransactionData(staticTxnData);
  const totalExpenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
  
  const totalCredits = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Calculate payments to expenses ratio
  const paymentsToExpensesRatio = totalExpenses > 0 ? ((totalCredits / totalExpenses) * 100).toFixed(1) : "0.0";

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

  // Remove the word "card" from account names
  const topCardDisplayName = topCardAccount.replace(/\bcard\b/gi, '').trim();
  const lowestCardDisplayName = lowestCardAccount.replace(/\bcard\b/gi, '').trim();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-3">
      {/* Analytics and Insights Card */}
      <div className="lg:col-span-2">
        <Card className="h-full bg-gradient-to-b from-white to-gray-100">
          <CardHeader>
            <CardTitle>Analytics and Insights</CardTitle>
            <CardDescription>Daily spending trends and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {Object.entries(cardExpenses).map(([account, amount]) => {
          const displayName = account.replace(/\bcard\b/gi, '').trim();
          const percentage = ((amount / totalExpenses) * 100).toFixed(1);
          const isHighest = amount === topCardSpend;
          const isLowest = amount === lowestCardSpend;
          
          return (
            <Card key={account} className="relative bg-gradient-to-b from-white to-gray-100">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <CardDescription className="text-xs uppercase tracking-wide font-medium text-muted-foreground">
                    {displayName}
                  </CardDescription>
                  <Badge variant="outline" className="gap-1 text-xs">
                    {isHighest ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {percentage}%
                  </Badge>
                </div>
                <div className="flex justify-between items-end">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Spend
                  </CardTitle>
                  <CardTitle className="text-2xl font-semibold tabular-nums text-right">
                    ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0 pb-4">
                <div className="flex gap-2 font-medium items-center text-xs">
                  {isHighest ? "Highest spend" : isLowest ? "Lowest spend" : "Regular usage"} 
                  {isHighest ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                </div>
                <div className="text-muted-foreground text-xs">
                  Account activity this period
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  )
}
