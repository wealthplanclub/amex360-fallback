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
    const transactions = parseTransactionData(staticTxnData);
    
    if (transactions.length === 0) return transactions;
    
    // Use today's date as the reference point instead of latest date from data
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    console.log("Today's date (reference point):", todayString);
    console.log("Selected time range:", selectedTimeRange);
    
    let startDate: Date;
    
    if (selectedTimeRange === "ytd") {
      // Year to date - start from January 1st of the current year
      startDate = new Date(today.getFullYear(), 0, 1);
    } else if (selectedTimeRange === "90d") {
      // 90 days before today
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 90);
    } else if (selectedTimeRange === "30d") {
      // 30 days before today
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 30);
    } else if (selectedTimeRange === "7d") {
      // 7 days before today
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 7);
    } else {
      return transactions;
    }
    
    // Convert start date back to ISO string format for comparison
    const startDateString = startDate.toISOString().split('T')[0];
    console.log("Start date string for filtering:", startDateString);
    console.log("Start date object:", startDate.toISOString());
    console.log("Days between start and today:", Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    const filtered = transactions.filter(transaction => {
      const transactionDate = transaction.date;
      const isIncluded = transactionDate >= startDateString;
      return isIncluded;
    });
    
    console.log("Total transactions:", transactions.length);
    console.log("Filtered transactions:", filtered.length);
    console.log("Date range:", startDateString, "to", todayString);
    
    return filtered;
  }, [selectedTimeRange]);

  // Calculate totals based on filtered transactions only
  const calculations = React.useMemo(() => {
    console.log("Calculating stats from filtered transactions:", filteredTransactions.length);
    
    // Calculate expenses (negative amounts)
    const expenses = filteredTransactions.filter(transaction => transaction.amount < 0);
    const totalExpenses = expenses.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
    
    // Calculate credits (positive amounts)
    const credits = filteredTransactions.filter(transaction => transaction.amount > 0);
    const totalCredits = credits.reduce((sum, transaction) => sum + transaction.amount, 0);

    // Calculate payments to expenses ratio
    const paymentsToExpensesRatio = totalExpenses > 0 ? ((totalCredits / totalExpenses) * 100).toFixed(1) : "0.0";

    // Calculate card expenses grouped by account
    const cardExpenses = expenses.reduce((acc, transaction) => {
      const account = transaction.account;
      if (!acc[account]) {
        acc[account] = 0;
      }
      acc[account] += Math.abs(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

    console.log("Card expenses by account:", cardExpenses);

    const topCardSpend = Object.keys(cardExpenses).length > 0 ? Math.max(...Object.values(cardExpenses)) : 0;
    const lowestCardSpend = Object.keys(cardExpenses).length > 0 ? Math.min(...Object.values(cardExpenses)) : 0;
    const topCardPercentage = totalExpenses > 0 ? ((topCardSpend / totalExpenses) * 100).toFixed(1) : "0.0";
    const lowestCardPercentage = totalExpenses > 0 ? ((lowestCardSpend / totalExpenses) * 100).toFixed(1) : "0.0";

    // Find the account names for highest and lowest spending
    const topCardAccount = Object.entries(cardExpenses).find(([_, amount]) => amount === topCardSpend)?.[0] || "";
    const lowestCardAccount = Object.entries(cardExpenses).find(([_, amount]) => amount === lowestCardSpend)?.[0] || "";

    // Remove the word "card" from account names
    const topCardDisplayName = topCardAccount.replace(/\bcard\b/gi, '').trim();
    const lowestCardDisplayName = lowestCardAccount.replace(/\bcard\b/gi, '').trim();

    console.log("Calculation results:", {
      totalExpenses,
      totalCredits,
      topCardSpend,
      lowestCardSpend,
      topCardDisplayName,
      lowestCardDisplayName
    });

    return {
      totalExpenses,
      totalCredits,
      paymentsToExpensesRatio,
      topCardSpend,
      lowestCardSpend,
      topCardPercentage,
      lowestCardPercentage,
      topCardDisplayName,
      lowestCardDisplayName
    };
  }, [filteredTransactions]);

  // Get time range description
  const getTimeRangeDescription = () => {
    if (selectedTimeRange === "ytd") return "(YTD)";
    if (selectedTimeRange === "90d") return "(90d)";
    if (selectedTimeRange === "30d") return "(30d)";
    if (selectedTimeRange === "7d") return "(7d)";
    return "(YTD)";
  };

  const cardData = [
    {
      title: "Total Expenses",
      value: calculations.totalExpenses,
      badge: "+100%",
      icon: TrendingUp,
      footer: "Trending up this month",
      description: `Total spend ${getTimeRangeDescription()}`
    },
    {
      title: "Total Payments/Credits",
      value: calculations.totalCredits,
      badge: `${calculations.paymentsToExpensesRatio}%`,
      icon: TrendingUp,
      footer: "Steady incoming payments",
      description: `Payments and credits ${getTimeRangeDescription()}`
    },
    {
      title: "Top Card Spend",
      value: calculations.topCardSpend,
      badge: `${calculations.topCardPercentage}%`,
      icon: TrendingUp,
      footer: calculations.topCardDisplayName,
      description: `Account with most expenses ${getTimeRangeDescription()}`
    },
    {
      title: "Lowest Card Spend",
      value: calculations.lowestCardSpend,
      badge: `${calculations.lowestCardPercentage}%`,
      icon: TrendingDown,
      footer: calculations.lowestCardDisplayName,
      description: `Account with least expenses ${getTimeRangeDescription()}`
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => {
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
