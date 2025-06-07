
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function TransactionCard() {
  // Parse the CSV data and get recent transactions
  const transactions = parseTransactionData(staticTxnData);
  
  // Sort transactions by date (most recent first) and take the first 10
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    const isNegative = amount < 0;
    const formattedAmount = `$${Math.abs(amount).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
    
    return {
      amount: formattedAmount,
      isNegative
    };
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
        <CardDescription>
          Latest transaction activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => {
            const { amount, isNegative } = formatAmount(transaction.amount);
            
            return (
              <Card key={index} className="bg-gradient-to-b from-white to-gray-50">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm leading-tight truncate">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDate(transaction.date)} • {transaction.account.replace(/\bcard\b/gi, '').trim()}
                      </div>
                      {transaction.category && (
                        <div className="text-xs text-muted-foreground">
                          {transaction.category}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-end sm:justify-end">
                      <div className="text-right">
                        <div className={`text-lg font-bold tabular-nums ${
                          isNegative ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {isNegative ? '-' : '+'}{amount}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
