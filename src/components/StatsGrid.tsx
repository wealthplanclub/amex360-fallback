
import { TrendingUp, TrendingDown, CreditCard } from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsGridProps {
  totalExpenses: number;
  totalIncome: number;
  netCashFlow: number;
  aiSpending: number;
}

export const StatsGrid = ({ totalExpenses, totalIncome, netCashFlow, aiSpending }: StatsGridProps) => {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 md:grid-cols-4">
      <StatCard
        title="Total Expenses"
        value={`$${totalExpenses.toLocaleString()}`}
        description="Year-to-date spending"
        icon={TrendingDown}
        badgeIcon={TrendingDown}
        badgeLabel="Expenses"
        footerTitle="Across all accounts"
        footerDescription="Year-to-date spending"
        valueColor="text-destructive"
      />

      <StatCard
        title="Total Payments"
        value={`$${totalIncome.toLocaleString()}`}
        description="Total payments received"
        icon={TrendingUp}
        badgeIcon={TrendingUp}
        badgeLabel="Payments"
        footerTitle="Credit card payments"
        footerDescription="Total payments received"
        valueColor="text-green-500"
      />

      <StatCard
        title="Net Cash Flow"
        value={`$${Math.abs(netCashFlow).toLocaleString()}`}
        description="Income vs expenses balance"
        icon={netCashFlow < 0 ? TrendingDown : TrendingUp}
        badgeIcon={netCashFlow < 0 ? TrendingDown : TrendingUp}
        badgeLabel={netCashFlow < 0 ? 'Outflow' : 'Inflow'}
        footerTitle={netCashFlow < 0 ? 'Net outflow' : 'Net inflow'}
        footerDescription="Income vs expenses balance"
        valueColor={netCashFlow < 0 ? 'text-destructive' : 'text-green-500'}
      />

      <StatCard
        title="AI/Tech Spending"
        value={`$${aiSpending.toLocaleString()}`}
        description="Technology investments"
        icon={CreditCard}
        badgeIcon={CreditCard}
        badgeLabel="Tech"
        footerTitle="AI-related expenses"
        footerDescription="Technology investments"
        valueColor="text-primary"
      />
    </div>
  );
};
