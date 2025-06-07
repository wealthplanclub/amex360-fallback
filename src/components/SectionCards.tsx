import { TrendingDown, TrendingUp } from "lucide-react"
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"
import * as React from "react"

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
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

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
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Total Expenses",
          value: totalExpenses,
          badge: "+100%",
          icon: TrendingUp,
          footer: "Trending up this month",
          description: "Total spend YTD"
        },
        {
          title: "Total Payments/Credits",
          value: totalCredits,
          badge: `${paymentsToExpensesRatio}%`,
          icon: TrendingUp,
          footer: "Steady incoming payments",
          description: "Payments and credits applied"
        },
        {
          title: "Top Card Spend",
          value: topCardSpend,
          badge: `${topCardPercentage}%`,
          icon: TrendingUp,
          footer: topCardDisplayName,
          description: "Account with most expenses"
        },
        {
          title: "Lowest Card Spend",
          value: lowestCardSpend,
          badge: `${lowestCardPercentage}%`,
          icon: TrendingDown,
          footer: lowestCardDisplayName,
          description: "Account with least expenses"
        }
      ].map((card, index) => {
        const IconComponent = card.icon;
        return (
          <Card 
            key={card.title}
            className={`relative bg-gradient-to-b from-white to-gray-100 transform transition-all duration-700 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{
              transitionDelay: `${index * 150}ms`
            }}
          >
            <CardHeader className="pb-6">
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums lg:text-3xl">
                ${card.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </CardTitle>
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="gap-1">
                  <IconComponent className="h-3 w-3" />
                  {card.badge}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0 pb-6">
              <div className="flex gap-2 font-medium items-center">
                {card.footer} <IconComponent className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground">
                {card.description}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  )
}
