
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AccountExtractor, AccountInfo } from '@/services/account/AccountExtractor'
import { toast } from 'sonner'

export function AccountExtractorComponent() {
  const [isExtracting, setIsExtracting] = useState(false)
  const [extractedAccounts, setExtractedAccounts] = useState<AccountInfo[]>([])
  const [stats, setStats] = useState<{ total: number; primary: number; employee: number } | null>(null)

  const handleExtraction = async () => {
    setIsExtracting(true)
    
    try {
      const result = await AccountExtractor.extractAccountsFromTransactions()
      
      if (result.success && result.accounts) {
        setExtractedAccounts(result.accounts)
        const accountStats = await AccountExtractor.getAccountStats()
        setStats(accountStats)
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Extraction failed')
      console.error('Extraction error:', error)
    } finally {
      setIsExtracting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account List Extraction</CardTitle>
          <p className="text-sm text-muted-foreground">
            Extract unique account combinations from imported transaction data
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleExtraction} 
            disabled={isExtracting}
            className="w-full"
          >
            {isExtracting ? 'Extracting Accounts...' : 'Extract Account List'}
          </Button>

          {stats && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Accounts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.primary}</div>
                <div className="text-sm text-muted-foreground">Primary Cards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.employee}</div>
                <div className="text-sm text-muted-foreground">Employee Cards</div>
              </div>
            </div>
          )}

          {extractedAccounts.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold">Extracted Accounts:</h4>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {extractedAccounts.map((account) => (
                  <div 
                    key={account.card_key} 
                    className="flex justify-between items-center p-2 bg-white border rounded text-sm"
                  >
                    <div>
                      <span className="font-medium">{account.display_name}</span>
                      <span className="text-muted-foreground ml-2">({account.last_five})</span>
                    </div>
                    <div>
                      {account.is_primary ? (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          Primary
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          Employee
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
