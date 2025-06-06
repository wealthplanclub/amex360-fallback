
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountsTabProps {
  accountChartData: any[];
}

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

export const AccountsTab = ({ accountChartData }: AccountsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Activity</CardTitle>
        <CardDescription>Detailed breakdown by credit card account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accountChartData.map((account, index) => (
            <div key={account.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="font-medium">{account.name}</span>
              </div>
              <span className="text-lg font-bold">${account.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
