

import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardSpendGrid() {
  // Parse the CSV data and calculate totals per card
  const transactions = parseTransactionData(staticTxnData);
  
  // Calculate expenses by card account
  const cardExpenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => {
      const account = transaction.account;
      if (!acc[account]) {
        acc[account] = 0;
      }
      acc[account] += Math.abs(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

  // Convert to array and apply special handling for Business Green cards
  const cardData = Object.entries(cardExpenses)
    .reduce((acc, [account, amount]) => {
      // Check if this is a Business Green Rewards card
      if (account.toLowerCase().includes('business green rewards')) {
        // Find existing Business Green entry or create new one
        const existingBusinessGreen = acc.find(card => card.name === 'Business Green\n(-2007)');
        if (existingBusinessGreen) {
          existingBusinessGreen.amount += amount;
        } else {
          acc.push({
            name: 'Business Green\n(-2007)',
            fullName: 'Business Green Rewards Combined',
            amount
          });
        }
      } else {
        // Regular card handling
        acc.push({
          name: account.replace(/\bcard\b/gi, '').trim().replace(/\s*(\([^)]+\))/, '\n$1'),
          fullName: account,
          amount
        });
      }
      return acc;
    }, [] as Array<{ name: string; fullName: string; amount: number }>)
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="px-4 lg:px-6">
      <h2 className="text-xl font-semibold mb-4">Card Spending Breakdown</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cardData.map((card) => (
          <Card key={card.fullName} className="bg-gradient-to-b from-white to-gray-50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium leading-tight whitespace-pre-line">
                {card.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold tabular-nums">
                ${card.amount.toLocaleString('en-US', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Total spent
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

