
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

interface SectionCardsProps {
  selectedTimeRange: string;
}

export function SectionCards({ selectedTimeRange }: SectionCardsProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Filter transactions based on selected time range
  const filteredTransactions = React.useMemo(() => {
    const allTransactions = parseTransactionData(staticTxnData);
    
    console.log("SectionCards - selectedTimeRange:", selectedTimeRange);
    console.log("SectionCards - all transactions count:", allTransactions.length);
    
    if (!allTransactions.length) return allTransactions;
    
    // Get the latest date from the data
    const latestDate = allTransactions[allTransactions.length - 1].date;
    console.log("SectionCards - latest date:", latestDate);
    
    let startDate: string;
    const latestDateObj = new Date(latestDate + 'T00:00:00'); // Add time to prevent timezone issues
    
    if (selectedTimeRange === "ytd") {
      // Year to date - start from January 1st of the current year
      startDate = `${latestDateObj.getFullYear()}-01-01`;
    } else if (selectedTimeRange === "90d") {
      const date90DaysAgo = new Date(latestDateObj);
      date90DaysAgo.setDate(date90DaysAgo.getDate() - 90);
      startDate = date90DaysAgo.toISOString().split('T')[0];
    } else if (selectedTimeRange === "30d") {
      const date30DaysAgo = new Date(latestDateObj);
      date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
      startDate = date30DaysAgo.toISOString().split('T')[0];
    } else if (selectedTimeRange === "7d") {
      const date7DaysAgo = new Date(latestDateObj);
      date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);
      startDate = date7DaysAgo.toISOString().split('T')[0];
    } else {
      startDate = allTransactions[0].date;
    }
    
    console.log("SectionCards - start date:", startDate);
    console.log("SectionCards - sample transaction dates:", allTransactions.slice(0, 5).map(t => t.date));
    
    const filtered = allTransactions.filter(transaction => {
      const includeTransaction = transaction.date >= startDate;
      if (!includeTransaction) {
        console.log("SectionCards - excluding transaction:", transaction.date, "start:", startDate);
      }
      return includeTransaction;
    });
    console.log("SectionCards - filtered transactions count:", filtered.length);
    console.log("SectionCards - first few filtered dates:", filtered.slice(0, 5).map(t => t.date));
    console.log("SectionCards - last few filtered dates:", filtered.slice(-5).map(t => t.date));
    
    return filtered;
  }, [selectedTimeRange]);

  // Calculate totals for the filtered period
  const totalExpenses = filteredTransactions
    .filter(transaction => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
  
  const totalCredits = filteredTransactions
    .filter(transaction => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  console.log("SectionCards - total expenses:", totalExpenses);
  console.log("SectionCards - total credits:", totalCredits);

  // Calculate payments to expenses ratio
  const paymentsToExpensesRatio = totalExpenses > 0 ? ((totalCredits / totalExpenses) * 100).toFixed(1) : "0.0";

  // Calculate top card spend
  const cardExpenses = filteredTransactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => {
      const account = transaction.account;
      if (!acc[account]) {
        acc[account] = 0;
      }
      acc[account] += Math.abs(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

  const topCardSpend = Object.values(cardExpenses).length > 0 ? Math.max(...Object.values(cardExpenses)) : 0;
  const lowestCardSpend = Object.values(cardExpenses).length > 0 ? Math.min(...Object.values(cardExpenses)) : 0;
  const topCardPercentage = totalExpenses > 0 ? ((topCardSpend / totalExpenses) * 100).toFixed(1) : "0.0";
  const lowestCardPercentage = totalExpenses > 0 ? ((lowestCardSpend / totalExpenses) * 100).toFixed(1) : "0.0";

  // Find the account names for highest and lowest spending
  const topCardAccount = Object.entries(cardExpenses).find(([_, amount]) => amount === topCardSpend)?.[0] || "";
  const lowestCardAccount = Object.entries(cardExpenses).find(([_, amount]) => amount === lowestCardSpend)?.[0] || "";

  // Remove the word "card" from account names
  const topCardDisplayName = topCardAccount.replace(/\bcard\b/gi, '').trim();
  const lowestCardDisplayName = lowestCardAccount.replace(/\bcard\b/gi, '').trim();

  // Get time range display label
  const getTimeRangeLabel = () => {
    if (selectedTimeRange === "ytd") return "YTD";
    if (selectedTimeRange === "90d") return "90d";
    if (selectedTimeRange === "30d") return "30d";
    if (selectedTimeRange === "7d") return "7d";
    return "YTD";
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Total Expenses",
          value: totalExpenses,
          badge: "+100%",
          icon: TrendingUp,
          footer: "Trending up this period",
          description: `Total spend ${getTimeRangeLabel()}`
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
          footer: topCardDisplayName || "No data",
          description: "Account with most expenses"
        },
        {
          title: "Lowest Card Spend",
          value: lowestCardSpend,
          badge: `${lowestCardPercentage}%`,
          icon: TrendingDown,
          footer: lowestCardDisplayName || "No data",
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
