
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./OverviewTab";
import { CategoriesTab } from "./CategoriesTab";
import { AccountsTab } from "./AccountsTab";

interface DashboardTabsProps {
  dailyChartData: any[];
  categoryChartData: any[];
  accountChartData: any[];
  superPhoneSpending: number;
  creditMaxSpending: number;
  aiSpending: number;
}

export const DashboardTabs = ({
  dailyChartData,
  categoryChartData,
  accountChartData,
  superPhoneSpending,
  creditMaxSpending,
  aiSpending
}: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="accounts">Accounts</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <OverviewTab
          dailyChartData={dailyChartData}
          accountChartData={accountChartData}
        />
      </TabsContent>

      <TabsContent value="categories" className="space-y-6">
        <CategoriesTab
          categoryChartData={categoryChartData}
          superPhoneSpending={superPhoneSpending}
          creditMaxSpending={creditMaxSpending}
          aiSpending={aiSpending}
        />
      </TabsContent>

      <TabsContent value="accounts" className="space-y-6">
        <AccountsTab accountChartData={accountChartData} />
      </TabsContent>
    </Tabs>
  );
};
