import { Transaction } from "@/types/transaction"
import { supabase } from "@/integrations/supabase/client"

export class TransactionDataProcessor {
  public static async processTransactions(): Promise<Transaction[]> {
    try {
      // Get the current user session
      const sessionToken = localStorage.getItem('session_token');
      if (!sessionToken) {
        console.error('No session token found')
        return []
      }

      // Get user session to find user_id
      const { data: session, error: sessionError } = await supabase
        .from('user_sessions')
        .select('user_id')
        .eq('session_token', sessionToken)
        .single();

      if (sessionError || !session) {
        console.error('Invalid session:', sessionError)
        return []
      }

      // Fetch ALL transactions using range() to override the 1000 row default limit
      const { data: transactions, error } = await supabase
        .from('master_transactions')
        .select('*')
        .eq('user_id', session.user_id)
        .order('date', { ascending: false })
        .range(0, 1500) // Explicitly fetch up to 1500 rows to ensure we get all 1410

      if (error) {
        console.error('Error fetching transactions:', error)
        return []
      }

      if (!transactions || transactions.length === 0) {
        console.log('No transactions found for user')
        return []
      }

      console.log(`TransactionDataProcessor: Loaded ${transactions.length} transactions from database (using range 0-1500)`)

      // Transform database transactions to match our Transaction type
      return transactions.map((transaction, index) => ({
        id: transaction.id || `txn-${index}`,
        user_id: transaction.user_id,
        date: transaction.date,
        description: transaction.description,
        amount: Number(transaction.amount),
        account_type: transaction.account_type,
        last_five: transaction.last_five,
        category: transaction.category,
        point_multiple: Number(transaction.point_multiple) || 1.0,
        created_at: transaction.created_at,
        // Keep legacy fields for backward compatibility
        account: transaction.account_type,
        card_type: transaction.account_type
      }))
    } catch (error) {
      console.error('Failed to process transactions:', error)
      return []
    }
  }

  public static async getUniqueCardAccounts(): Promise<string[]> {
    try {
      const transactions = await this.processTransactions()
      
      // Get account configurations to determine primary cards
      const { data: configurations, error: configError } = await supabase
        .from('account_configurations')
        .select('*')

      if (configError) {
        console.error('Error fetching account configurations:', configError)
        // Fallback to simple unique account types
        return Array.from(new Set(transactions.map(t => t.account_type)))
          .filter(account => account && account.length > 0)
          .sort()
      }

      // Create a map of primary cards by account_type
      const primaryCardMap = new Map<string, string>()
      configurations?.forEach(config => {
        if (config.is_primary) {
          primaryCardMap.set(config.account_type, config.last_five)
        }
      })

      // Get unique account types and add primary card last_five info
      const uniqueAccountTypes = Array.from(new Set(transactions.map(t => t.account_type)))
        .filter(account => account && account.length > 0)
        .sort()

      // Return account types with primary card info where available
      return uniqueAccountTypes.map(accountType => {
        const primaryLastFive = primaryCardMap.get(accountType)
        return primaryLastFive ? `${accountType} (${primaryLastFive})` : accountType
      })
    } catch (error) {
      console.error('Failed to get unique card accounts:', error)
      return []
    }
  }

  // Legacy method for backward compatibility with static data
  public static processStaticData(): Transaction[] {
    console.warn('processStaticData is deprecated, use processTransactions instead')
    return []
  }

  public static getUniqueCardAccounts(transactions: Transaction[]): string[] {
    console.warn('getUniqueCardAccounts with transactions parameter is deprecated, use getUniqueCardAccounts() instead')
    return Array.from(new Set(transactions.map(t => t.account_type || t.account)))
      .filter(card => card && card.length > 0)
      .sort()
  }
}
