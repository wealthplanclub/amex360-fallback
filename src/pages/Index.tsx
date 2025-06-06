
import { useState } from "react";
import { staticTxnData } from "@/data/staticData";
import { parseTransactionData } from "@/utils/transactionParser";
import { 
  calculateFinancials, 
  getCategoryData, 
  getAccountData, 
  getDailyFlowData, 
  getSpecialSpending 
} from "@/utils/dataProcessing";
import { StatsGrid } from "@/components/StatsGrid";
import { DashboardTabs } from "@/components/DashboardTabs";

const rawTransactions = parseTransactionData(staticTxnData);

const Index = () => {
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Data processing
  const { totalExpenses, totalIncome, netCashFlow } = calculateFinancials(rawTransactions);
  const categoryChartData = getCategoryData(rawTransactions);
  const accountChartData = getAccountData(rawTransactions);
  const dailyChartData = getDailyFlowData(rawTransactions);
  const { aiSpending, superPhoneSpending, creditMaxSpending } = getSpecialSpending(rawTransactions);

  return (
    <div 
      className="min-h-screen p-6"
      style={{
        backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
        backgroundRepeat: 'repeat'
      }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">R's Amex 360°</h1>
          <p className="text-muted-foreground">YTD view of spending across all cards</p>
        </div>

        {/* Summary Cards */}
        <StatsGrid
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
          netCashFlow={netCashFlow}
          aiSpending={aiSpending}
        />

        {/* Analysis Tabs */}
        <DashboardTabs
          dailyChartData={dailyChartData}
          categoryChartData={categoryChartData}
          accountChartData={accountChartData}
          superPhoneSpending={superPhoneSpending}
          creditMaxSpending={creditMaxSpending}
          aiSpending={aiSpending}
        />
      </div>
    </div>
  );
};

export default Index;
