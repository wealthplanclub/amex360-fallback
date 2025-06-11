
import { supabase } from "@/integrations/supabase/client"
import { TransactionDataProcessor } from "@/services/transaction/TransactionDataProcessor"

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
      // First try to get transactions from Supabase database
      const { data: dbTransactions, error } = await supabase
        .from('master_transactions')
        .select('account_type, last_five')
        .order('account_type, last_five')
      
      if (error) {
        console.error('Error fetching transactions from database:', error)
        return { 
          success: false, 
          message: `Failed to fetch transactions: ${error.message}` 
        }
      }

      let transactions = dbTransactions || []

      // If no transactions in database, fall back to static data
      if (transactions.length === 0) {
        console.log('No transactions found in database, using static data')
        const staticTransactions = TransactionDataProcessor.processStaticData()
        transactions = staticTransactions.map(tx => ({
          account_type: tx.account_type,
          last_five: tx.last_five
        }))
      }

      if (transactions.length === 0) {
        return { 
          success: false, 
          message: 'No transactions found in database or static data' 
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
      
      const dataSource = dbTransactions && dbTransactions.length > 0 ? 'database' : 'static data'
      
      return { 
        success: true, 
        accounts,
        message: `Successfully extracted ${accounts.length} unique accounts from ${dataSource}` 
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
