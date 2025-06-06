import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, TrendingDown, CreditCard, DollarSign, Calendar, Filter } from "lucide-react";
import { staticTxnData } from "@/data/staticData";

// Parse the static data
const parseTransactionData = (data: string) => {
  const lines = data.trim().split('\n');
  const headers = lines[0].split('\t');
  
  return lines.slice(1).map(line => {
    const values = line.split('\t');
    return {
      date: values[0],
      description: values[1],
      amount: parseFloat(values[2].replace(/[$,]/g, '')),
      account: values[3],
      category: values[4] || ""
    };
  });
};

const rawTransactions = parseTransactionData(staticTxnData);

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
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 md:grid-cols-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Expenses</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-destructive">
                ${totalExpenses.toLocaleString()}
              </CardTitle>
              <div className="mt-2">
                <Badge variant="outline">
                  <TrendingDown className="size-4 mr-1" />
                  Expenses
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Across all accounts <TrendingDown className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Year-to-date spending
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Payments</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-green-500">
                ${totalIncome.toLocaleString()}
              </CardTitle>
              <div className="mt-2">
                <Badge variant="outline">
                  <TrendingUp className="size-4 mr-1" />
                  Payments
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Credit card payments <TrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Total payments received
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Net Cash Flow</CardDescription>
              <CardTitle className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${netCashFlow < 0 ? 'text-destructive' : 'text-green-500'}`}>
                ${Math.abs(netCashFlow).toLocaleString()}
              </CardTitle>
              <div className="mt-2">
                <Badge variant="outline">
                  {netCashFlow < 0 ? <TrendingDown className="size-4 mr-1" /> : <TrendingUp className="size-4 mr-1" />}
                  {netCashFlow < 0 ? 'Outflow' : 'Inflow'}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {netCashFlow < 0 ? 'Net outflow' : 'Net inflow'} {netCashFlow < 0 ? <TrendingDown className="size-4" /> : <TrendingUp className="size-4" />}
              </div>
              <div className="text-muted-foreground">
                Income vs expenses balance
              </div>
            </CardFooter>
          </Card>

          <Card className="@container/card">
            <CardHeader>
              <CardDescription>AI/Tech Spending</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-primary">
                ${aiSpending.toLocaleString()}
              </CardTitle>
              <div className="mt-2">
                <Badge variant="outline">
                  <CreditCard className="size-4 mr-1" />
                  Tech
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                AI-related expenses <CreditCard className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Technology investments
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
