import { supabase } from "@/integrations/supabase/client"

export interface AccountInfo {
  account_type: string
  last_five: string
  card_key: string
  display_name: string
  is_primary: boolean
  is_employee: boolean
}

export class AccountExtractor {
  public static async extractAccountsFromTransactions(): Promise<{ success: boolean; accounts?: AccountInfo[]; message: string }> {
    try {
      // Get the current user from the auth context
      const sessionToken = localStorage.getItem('session_token');
      if (!sessionToken) {
        console.error('No session token found')
        return { 
          success: false, 
          message: 'User authentication required to access transaction data' 
        }
      }

      // Get user session to find user_id
      const { data: session, error: sessionError } = await supabase
        .from('user_sessions')
        .select('user_id')
        .eq('session_token', sessionToken)
        .single();

      if (sessionError || !session) {
        console.error('Invalid session:', sessionError)
        return { 
          success: false, 
          message: 'Invalid session. Please log in again.' 
        }
      }

      console.log('Current user ID:', session.user_id)

      // First, let's see what user_id values actually exist in the database
      const { data: userIds, error: userIdsError } = await supabase
        .from('master_transactions')
        .select('user_id')
        .limit(10)

      console.log('Sample user_id values in database:', userIds)
      
      if (userIdsError) {
        console.error('Error fetching sample user IDs:', userIdsError)
      }

      // Get unique user_ids to see all available users
      const { data: uniqueUserIds, error: uniqueError } = await supabase
        .from('master_transactions')
        .select('user_id')
        .group('user_id')

      console.log('All unique user_id values:', uniqueUserIds)

      // Query transactions for this specific user
      const { data: transactions, error, count } = await supabase
        .from('master_transactions')
        .select('account_type, last_five', { count: 'exact' })
        .eq('user_id', session.user_id)
        .order('account_type, last_five')
      
      console.log('Query result:', { transactions, error, count })
      
      if (error) {
        console.error('Error fetching transactions:', error)
        return { 
          success: false, 
          message: `Failed to fetch transactions: ${error.message}` 
        }
      }

      if (!transactions || transactions.length === 0) {
        console.log('No transactions found for user. Total count:', count)
        
        // Check if there are any transactions in the table at all (admin check)
        const { count: totalCount } = await supabase
          .from('master_transactions')
          .select('*', { count: 'exact', head: true })
        
        console.log('Total transactions in database:', totalCount)
        
        return { 
          success: false, 
          message: `No transactions found for current user. Database contains ${totalCount || 0} total transactions. Check console for debugging info about user_id values.` 
        }
      }

      // Create unique combinations
      const uniqueAccounts = new Map<string, AccountInfo>()
      
      transactions.forEach(transaction => {
        const cardKey = `${transaction.account_type}-${transaction.last_five}`
        
        if (!uniqueAccounts.has(cardKey)) {
          const accountInfo: AccountInfo = {
            account_type: transaction.account_type,
            last_five: transaction.last_five,
            card_key: cardKey,
            display_name: this.generateDisplayName(transaction.account_type),
            is_primary: this.classifyAsPrimary(transaction.account_type),
            is_employee: this.classifyAsEmployee(transaction.account_type)
          }
          
          uniqueAccounts.set(cardKey, accountInfo)
        }
      })

      const accounts = Array.from(uniqueAccounts.values())
      
      console.log(`Extracted ${accounts.length} unique accounts:`, accounts)
      
      return { 
        success: true, 
        accounts,
        message: `Successfully extracted ${accounts.length} unique accounts` 
      }
      
    } catch (error) {
      console.error('Account extraction error:', error)
      return { 
        success: false, 
        message: `Failed to extract accounts: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }
    }
  }

  private static generateDisplayName(accountType: string): string {
    // Clean up the account type name for display
    return accountType
      .replace(/\b(card|rewards)\b/gi, '')
      .trim()
      .replace(/\s+/g, ' ')
  }

  private static classifyAsPrimary(accountType: string): boolean {
    // Business rules for primary classification
    const primaryKeywords = ['platinum', 'gold', 'business']
    const accountLower = accountType.toLowerCase()
    
    return primaryKeywords.some(keyword => accountLower.includes(keyword))
  }

  private static classifyAsEmployee(accountType: string): boolean {
    // Business rules for employee classification
    const employeeKeywords = ['green', 'everyday', 'basic']
    const accountLower = accountType.toLowerCase()
    
    return employeeKeywords.some(keyword => accountLower.includes(keyword))
  }

  public static async getAccountStats(): Promise<{ total: number; primary: number; employee: number }> {
    const result = await this.extractAccountsFromTransactions()
    
    if (!result.success || !result.accounts) {
      return { total: 0, primary: 0, employee: 0 }
    }

    const accounts = result.accounts
    const total = accounts.length
    const primary = accounts.filter(account => account.is_primary).length
    const employee = accounts.filter(account => account.is_employee).length

    return { total, primary, employee }
  }
}
