
import { supabase } from "@/integrations/supabase/client"

export interface AccountInfo {
  account_type: string
  last_five: string
  card_key: string
  display_name: string
  is_primary: boolean
}

export interface AccountConfiguration {
  id: string
  account_type: string
  last_five: string
  is_primary: boolean
  notes?: string
  created_at: string
  updated_at: string
}

export class AccountExtractor {
  public static async extractAccountsFromTransactions(): Promise<{ success: boolean; accounts?: AccountInfo[]; message: string }> {
    try {
      // Since we're using static data and there are no database tables for transactions,
      // we'll work with the static transaction data instead
      console.log('Note: Using static data approach - no database tables available')
      
      // For now, we'll return a message indicating that this feature requires database setup
      return { 
        success: false, 
        message: 'This feature requires database tables to be set up. Currently using static data only.' 
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
    const employee = total - primary

    return { total, primary, employee }
  }

  // Placeholder methods for managing account configurations
  // These would need actual database tables to function properly
  public static async getAllConfigurations(): Promise<{ success: boolean; configurations?: AccountConfiguration[]; message: string }> {
    try {
      // Return empty configurations since we don't have database tables
      return { 
        success: true, 
        configurations: [], 
        message: 'No configurations available - database tables not set up' 
      }
    } catch (error) {
      return { 
        success: false, 
        message: `Failed to fetch configurations: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }
    }
  }

  public static async updateConfiguration(id: string, updates: Partial<Pick<AccountConfiguration, 'is_primary' | 'notes'>>): Promise<{ success: boolean; message: string }> {
    try {
      // Return a message indicating this feature is not available without database
      return { 
        success: false, 
        message: 'Configuration updates require database tables to be set up' 
      }
    } catch (error) {
      return { 
        success: false, 
        message: `Failed to update configuration: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }
    }
  }
}
