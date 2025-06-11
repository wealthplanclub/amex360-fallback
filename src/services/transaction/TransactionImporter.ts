
import { supabase } from "@/integrations/supabase/client"
import { Transaction } from "@/types/transaction"

export class TransactionImporter {
  public static async importFromCSV(csvData: string): Promise<{ success: boolean; message: string; count?: number }> {
    try {
      const lines = csvData.trim().split('\n')
      const headers = lines[0].split('\t')
      
      // Parse each data row
      const transactions = []
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t')
        
        // Create transaction object, omitting empty id field
        const transaction: any = {}
        
        headers.forEach((header, index) => {
          const value = values[index]?.trim()
          
          // Skip empty id fields - let database auto-generate
          if (header === 'id' && (!value || value === '')) {
            return
          }
          
          // Handle amount as number
          if (header === 'amount') {
            transaction[header] = parseFloat(value) || 0
          }
          // Handle point_multiple as number
          else if (header === 'point_multiple') {
            transaction[header] = value ? parseFloat(value) : 1.0
          }
          // Handle other fields as strings
          else {
            transaction[header] = value || null
          }
        })
        
        // Ensure required fields are present
        if (transaction.date && transaction.user_id && transaction.account_type && transaction.last_five && transaction.description) {
          transactions.push(transaction)
        }
      }
      
      console.log(`Preparing to import ${transactions.length} transactions`)
      
      // Insert transactions into database
      const { data, error } = await supabase
        .from('master_transactions')
        .insert(transactions)
        .select()
      
      if (error) {
        console.error('Import error:', error)
        return { 
          success: false, 
          message: `Failed to import data: ${error.message}` 
        }
      }
      
      return { 
        success: true, 
        message: `Successfully imported ${transactions.length} transactions`,
        count: transactions.length
      }
      
    } catch (error) {
      console.error('CSV parsing error:', error)
      return { 
        success: false, 
        message: `Failed to parse CSV: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }
    }
  }
}
