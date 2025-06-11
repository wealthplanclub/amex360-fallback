import { Transaction } from "@/types/transaction"
import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"

export class TransactionDataProcessor {
  public static processStaticData(): Transaction[] {
    const rawTransactions = parseTransactionData(staticTxnData)
    return rawTransactions
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((transaction, index) => ({
        id: `txn-${index}`,
        user_id: 'static-user', // Mock user_id for static data
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount,
        account_type: transaction.account, // Map legacy account to account_type
        last_five: this.extractLastFive(transaction.account), // Extract or generate last_five
        category: transaction.category,
        point_multiple: 1.0, // Default point multiple
        // Keep legacy fields for backward compatibility
        account: transaction.account,
        card_type: transaction.account
      }))
  }

  private static extractLastFive(account: string): string {
    // Try to extract last 5 digits from account name, or generate a mock one
    const match = account.match(/\((-?\d+)\)/)
    if (match) {
      return match[1]
    }
    // Generate a mock last_five based on account name hash
    const hash = account.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return Math.abs(hash % 10000).toString().padStart(4, '0')
  }

  public static getUniqueCardAccounts(transactions: Transaction[]): string[] {
    const uniqueCards = Array.from(new Set(transactions.map(t => t.account || t.account_type)))
      .filter(card => card && card.length > 0)
      .sort()
    return uniqueCards
  }
}
