
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, TrendingDown, CreditCard, DollarSign, Calendar, Filter } from "lucide-react";

// Raw transaction data
const rawTransactions = [
  { date: "1/27/2025", description: "Chronosai Atlanta GA", amount: -2000.00, account: "Business Gold Card (-1002)", category: "CreditMax" },
  { date: "1/27/2025", description: "Twentyfour Ai New York NY", amount: -4000.00, account: "Business Gold Card (-1002)", category: "" },
  { date: "1/26/2025", description: "The Promptshopai Austin TX", amount: -97.00, account: "Blue Business Plus Card (-1000)", category: "CreditMax" },
  { date: "1/26/2025", description: "Topsteptrader Llc Chicago IL", amount: -49.00, account: "Business Green Rewards Card (-1009)", category: "" },
  { date: "1/26/2025", description: "Paypal *webull Tech x7018 Hk", amount: -11.99, account: "Business Platinum Card (-2007)", category: "" },
  { date: "1/26/2025", description: "Online Payment - Thank You", amount: 36.16, account: "Charles Schwab Platinum Card (-1000)", category: "" },
  { date: "1/26/2025", description: "Online Payment - Thank You", amount: 103.93, account: "Charles Schwab Platinum Card (-1000)", category: "" },
  { date: "1/26/2025", description: "Online Payment - Thank You", amount: 174.08, account: "Charles Schwab Platinum Card (-1000)", category: "" },
  { date: "1/26/2025", description: "Online Payment - Thank You", amount: 153.31, account: "Delta SkyMiles Reserve Card (-1006)", category: "" },
  { date: "1/26/2025", description: "Renewal Membership Fee", amount: -695.00, account: "Platinum Card (-1003)", category: "" },
  { date: "1/25/2025", description: "Expressvpn.com Wilmington De", amount: -12.95, account: "Business Gold Card (-1000)", category: "" },
  { date: "1/25/2025", description: "Zapier.com/charge San Francisco CA", amount: -29.99, account: "Business Gold Card (-1000)", category: "" },
  { date: "1/25/2025", description: "Twilio Inc San Francisco CA", amount: -590.36, account: "Business Gold Card (-2008)", category: "SuperPhone" },
  { date: "1/25/2025", description: "Twilio Inc San Francisco CA", amount: -412.93, account: "Business Gold Card (-2008)", category: "SuperPhone" },
  { date: "1/25/2025", description: "Online Payment - Thank You", amount: 123.70, account: "Platinum Card (-1003)", category: "" },
  { date: "1/25/2025", description: "Online Payment - Thank You", amount: 147.57, account: "Platinum Card (-1003)", category: "" },
  { date: "1/25/2025", description: "Online Payment - Thank You", amount: 196.07, account: "Platinum Card (-1003)", category: "" },
  { date: "1/25/2025", description: "Online Payment - Thank You", amount: 392.74, account: "Platinum Card (-1003)", category: "" },
  { date: "1/24/2025", description: "Vital Ai Peekskill NY", amount: -582.48, account: "Business Gold Card (-1000)", category: "" },
  { date: "1/24/2025", description: "Twilio Inc San Francisco CA", amount: -401.08, account: "Business Gold Card (-2008)", category: "SuperPhone" },
  { date: "1/24/2025", description: "Twilio Inc San Francisco CA", amount: -616.95, account: "Business Gold Card (-2008)", category: "SuperPhone" },
  { date: "1/24/2025", description: "Con-struc-tion Culver City CA", amount: -100.00, account: "Business Green Rewards Card (-1009)", category: "CreditMax" },
  { date: "1/24/2025", description: "Acrelytics.ai Clayton NC", amount: -100.00, account: "Business Green Rewards Card (-1009)", category: "CreditMax" },
  { date: "1/24/2025", description: "Paypal *factor Meal x2977 Nl", amount: -41.54, account: "Business Platinum Card (-2007)", category: "" },
  { date: "1/23/2025", description: "Twilio Inc San Francisco CA", amount: -608.45, account: "Business Gold Card (-1002)", category: "SuperPhone" },
  { date: "1/23/2025", description: "Online Payment - Thank You", amount: 608.45, account: "Business Gold Card (-1002)", category: "" },
  { date: "1/23/2025", description: "Chargebee Walnut CA", amount: -1474.00, account: "Business Gold Card (-1002)", category: "SuperPhone" }
];

const Index = () => {
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Data processing
  const totalExpenses = rawTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalIncome = rawTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const netCashFlow = totalIncome - totalExpenses;

  // Category analysis
  const categoryData = rawTransactions
    .filter(t => t.category && t.amount < 0)
    .reduce((acc, t) => {
      const cat = t.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

  // Account analysis
  const accountData = rawTransactions.reduce((acc, t) => {
    const account = t.account.split(' (')[0]; // Clean account name
    acc[account] = (acc[account] || 0) + (t.amount < 0 ? Math.abs(t.amount) : 0);
    return acc;
  }, {} as Record<string, number>);

  const accountChartData = Object.entries(accountData)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Daily cash flow
  const dailyFlow = rawTransactions.reduce((acc, t) => {
    const date = t.date;
    if (!acc[date]) acc[date] = { date, expenses: 0, income: 0 };
    if (t.amount < 0) acc[date].expenses += Math.abs(t.amount);
    else acc[date].income += t.amount;
    return acc;
  }, {} as Record<string, any>);

  const dailyChartData = Object.values(dailyFlow).sort((a: any, b: any) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // AI/Tech spending analysis
  const aiSpending = rawTransactions
    .filter(t => t.description.toLowerCase().includes('ai') && t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const superPhoneSpending = rawTransactions
    .filter(t => t.category === 'SuperPhone' && t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const creditMaxSpending = rawTransactions
    .filter(t => t.category === 'CreditMax' && t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1'];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Financial Analysis Dashboard</h1>
          <p className="text-muted-foreground">January 23-27, 2025 Transaction Analysis</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">${totalExpenses.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">${totalIncome.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Credit card payments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netCashFlow < 0 ? 'text-destructive' : 'text-green-500'}`}>
                ${Math.abs(netCashFlow).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {netCashFlow < 0 ? 'Net outflow' : 'Net inflow'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI/Tech Spending</CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${aiSpending.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">AI-related expenses</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Cash Flow</CardTitle>
                  <CardDescription>Expenses vs Income by day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                      <Bar dataKey="income" fill="#10b981" name="Income" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spending by Account</CardTitle>
                  <CardDescription>Total expenses per account</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={accountChartData.slice(0, 6)}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {accountChartData.slice(0, 6).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Spending analysis by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-700">SuperPhone</h3>
                    <p className="text-2xl font-bold text-purple-900">${superPhoneSpending.toLocaleString()}</p>
                    <p className="text-sm text-purple-600">Communication platform</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-700">CreditMax</h3>
                    <p className="text-2xl font-bold text-blue-900">${creditMaxSpending.toLocaleString()}</p>
                    <p className="text-sm text-blue-600">Business services</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-700">AI Tools</h3>
                    <p className="text-2xl font-bold text-green-900">${aiSpending.toLocaleString()}</p>
                    <p className="text-sm text-green-600">AI-powered services</p>
                  </div>
                </div>
                
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    <Bar dataKey="value" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Findings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary">AI Investment</Badge>
                    <div>
                      <p className="font-medium">Heavy AI Tool Investment</p>
                      <p className="text-sm text-muted-foreground">
                        ${aiSpending.toLocaleString()} spent on AI platforms (Chronosai, Twentyfour Ai, etc.)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary">Communication</Badge>
                    <div>
                      <p className="font-medium">SuperPhone Platform Usage</p>
                      <p className="text-sm text-muted-foreground">
                        ${superPhoneSpending.toLocaleString()} in Twilio/SuperPhone charges
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Badge variant="secondary">Cash Management</Badge>
                    <div>
                      <p className="font-medium">Active Credit Management</p>
                      <p className="text-sm text-muted-foreground">
                        ${totalIncome.toLocaleString()} in credit card payments made
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Consolidate AI Subscriptions</h4>
                    <p className="text-sm text-yellow-700">
                      Consider evaluating AI tool ROI and consolidating similar services
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Monitor SuperPhone Costs</h4>
                    <p className="text-sm text-blue-700">
                      Track communication platform usage to optimize costs
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Cash Flow Positive</h4>
                    <p className="text-sm text-green-700">
                      Good payment discipline with regular credit card payments
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
