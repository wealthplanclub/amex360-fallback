
import { parseTransactionData } from "@/utils/transactionParser";

export interface CardData {
  name: string;
  fullName: string;
  amount: number;
}

export const filterTransactionsByTimeRange = (transactions: any[], selectedTimeRange: string) => {
  if (transactions.length === 0) return transactions;
  
  const today = new Date();
  let startDate: Date;
  
  if (selectedTimeRange === "ytd") {
    startDate = new Date(today.getFullYear(), 0, 1);
  } else if (selectedTimeRange === "90d") {
    startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 90);
  } else if (selectedTimeRange === "30d") {
    startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 30);
  } else if (selectedTimeRange === "7d") {
    startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 7);
  } else {
    return transactions;
  }
  
  const startDateString = startDate.toISOString().split('T')[0];
  
  return transactions.filter(transaction => {
    return transaction.date >= startDateString;
  });
};

export const processCardData = (staticTxnData: string, selectedTimeRange: string): CardData[] => {
  const transactions = parseTransactionData(staticTxnData);
  const filteredTransactions = filterTransactionsByTimeRange(transactions, selectedTimeRange);
  
  const cardExpenses = filteredTransactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => {
      const account = transaction.account;
      if (!acc[account]) {
        acc[account] = 0;
      }
      acc[account] += Math.abs(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

  const cardData = Object.entries(cardExpenses)
    .reduce((acc, [account, amount]) => {
      if (account.toLowerCase().includes('business green rewards')) {
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
        let displayName = account.replace(/\bcard\b/gi, '').trim().replace(/\s*(\([^)]+\))/, '\n$1');
        if (account.toLowerCase().includes('amazon business prime')) {
          displayName = displayName.replace(/\bbusiness\b/gi, '').trim().replace(/\s+/g, ' ');
        }
        
        acc.push({
          name: displayName,
          fullName: account,
          amount
        });
      }
      return acc;
    }, [] as CardData[])
    .sort((a, b) => b.amount - a.amount);

  return cardData;
};

export const getTimeRangeDescription = (selectedTimeRange: string) => {
  if (selectedTimeRange === "ytd") return "(YTD)";
  if (selectedTimeRange === "90d") return "(90d)";
  if (selectedTimeRange === "30d") return "(30d)";
  if (selectedTimeRange === "7d") return "(7d)";
  return "(YTD)";
};
