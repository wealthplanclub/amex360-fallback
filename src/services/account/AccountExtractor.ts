
import { supabase } from "@/integrations/supabase/client"

export interface AccountInfo {
  account_type: string
  last_five: string
  card_key: string
  display_name: string
  is_primary: boolean
  is_employee: boolean
}

export interface AccountConfiguration {
  id: string
  account_type: string
  last_five: string
  is_primary: boolean
  is_employee: boolean
  notes?: string
  created_at: string
  updated_at: string
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
        return { 
          success: false, 
          message: `No transactions found for current user.` 
        }
      }

      // Get account configurations from the database
      const { data: configurations, error: configError } = await supabase
        .from('account_configurations')
        .select('*')

      if (configError) {
        console.error('Error fetching account configurations:', configError)
        return { 
          success: false, 
          message: `Failed to fetch account configurations: ${configError.message}` 
        }
      }

      // Create a map for quick lookup of configurations
      const configMap = new Map<string, AccountConfiguration>()
      configurations?.forEach(config => {
        const key = `${config.account_type}-${config.last_five}`
        configMap.set(key, config)
      })

      // Create unique combinations with configuration-based classification
      const uniqueAccounts = new Map<string, AccountInfo>()
      
      transactions.forEach(transaction => {
        const cardKey = `${transaction.account_type}-${transaction.last_five}`
        
        if (!uniqueAccounts.has(cardKey)) {
          const config = configMap.get(cardKey)
          
          const accountInfo: AccountInfo = {
            account_type: transaction.account_type,
            last_five: transaction.last_five,
            card_key: cardKey,
            display_name: this.generateDisplayName(transaction.account_type),
            is_primary: config?.is_primary || false,
            is_employee: config?.is_employee || false
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

  // New methods for managing account configurations
  public static async getAllConfigurations(): Promise<{ success: boolean; configurations?: AccountConfiguration[]; message: string }> {
    try {
      const { data, error } = await supabase
        .from('account_configurations')
        .select('*')
        .order('account_type, last_five')

      if (error) {
        return { success: false, message: `Failed to fetch configurations: ${error.message}` }
      }

      return { success: true, configurations: data || [], message: 'Configurations fetched successfully' }
    } catch (error) {
      return { success: false, message: `Failed to fetch configurations: ${error instanceof Error ? error.message : 'Unknown error'}` }
    }
  }

  public static async updateConfiguration(id: string, updates: Partial<Pick<AccountConfiguration, 'is_primary' | 'is_employee' | 'notes'>>): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('account_configurations')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) {
        return { success: false, message: `Failed to update configuration: ${error.message}` }
      }

      return { success: true, message: 'Configuration updated successfully' }
    } catch (error) {
      return { success: false, message: `Failed to update configuration: ${error instanceof Error ? error.message : 'Unknown error'}` }
    }
  }
}
