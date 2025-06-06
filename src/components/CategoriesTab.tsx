
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoriesTabProps {
  categoryChartData: any[];
  superPhoneSpending: number;
  creditMaxSpending: number;
  aiSpending: number;
}

export const CategoriesTab = ({ categoryChartData, superPhoneSpending, creditMaxSpending, aiSpending }: CategoriesTabProps) => {
  return (
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
  );
};
