
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { TransactionImporter } from '@/services/transaction'
import { toast } from 'sonner'

export function TransactionImportComponent() {
  const [csvData, setCsvData] = useState('')
  const [isImporting, setIsImporting] = useState(false)

  const handleImport = async () => {
    if (!csvData.trim()) {
      toast.error('Please paste CSV data')
      return
    }

    setIsImporting(true)
    
    try {
      const result = await TransactionImporter.importFromCSV(csvData)
      
      if (result.success) {
        toast.success(result.message)
        setCsvData('') // Clear the textarea on success
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Import failed')
      console.error('Import error:', error)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div>
        <h3 className="text-lg font-semibold mb-2">Import Transactions from CSV</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Paste your tab-separated CSV data below. Make sure it includes headers: id, user_id, date, account_type, last_five, amount, description, category, point_multiple
        </p>
      </div>
      
      <Textarea
        placeholder="Paste your CSV data here..."
        value={csvData}
        onChange={(e) => setCsvData(e.target.value)}
        rows={10}
        className="font-mono text-sm"
      />
      
      <Button 
        onClick={handleImport} 
        disabled={isImporting || !csvData.trim()}
        className="w-full"
      >
        {isImporting ? 'Importing...' : 'Import Transactions'}
      </Button>
    </div>
  )
}
