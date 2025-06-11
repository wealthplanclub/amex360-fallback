
import { TrendingDown, TrendingUp } from "lucide-react"

export const getTimeRangeDescription = (selectedTimeRange: string) => {
  if (selectedTimeRange === "ytd") return "(YTD)";
  if (selectedTimeRange === "90d") return "(90d)";
  if (selectedTimeRange === "30d") return "(30d)";
  if (selectedTimeRange === "7d") return "(7d)";
  return "(YTD)";
};

export const generateCardData = (calculations: any, selectedTimeRange: string) => {
  return [
    {
      title: "Total Expenses",
      value: calculations.totalExpenses,
      badge: "+100%",
      icon: TrendingUp,
      footer: "Trending up this month",
      description: `Total spend ${getTimeRangeDescription(selectedTimeRange)}`,
      clickable: true,
      cardType: "expenses"
    },
    {
      title: "Total Payments/Credits",
      value: calculations.totalCredits,
      badge: `${calculations.paymentsToExpensesRatio}%`,
      icon: TrendingUp,
      footer: "Steady incoming payments",
      description: `Payments and credits ${getTimeRangeDescription(selectedTimeRange)}`,
      clickable: true,
      cardType: "credits"
    },
    {
      title: "Top Card Spend",
      value: calculations.topCardSpend,
      badge: `${calculations.topCardPercentage}%`,
      icon: TrendingUp,
      footer: calculations.topCardDisplayName,
      description: `Account with most expenses ${getTimeRangeDescription(selectedTimeRange)}`,
      clickable: true,
      cardType: "top-card",
      topCardAccount: calculations.topCardAccount
    },
    {
      title: "Lowest Card Spend",
      value: calculations.lowestCardSpend,
      badge: `${calculations.lowestCardPercentage}%`,
      icon: TrendingDown,
      footer: calculations.lowestCardDisplayName,
      description: `Account with least expenses ${getTimeRangeDescription(selectedTimeRange)}`,
      clickable: true,
      cardType: "lowest-card",
      topCardAccount: calculations.lowestCardAccount
    }
  ];
};
