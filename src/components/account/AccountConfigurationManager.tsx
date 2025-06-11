
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { AccountExtractor, AccountConfiguration } from '@/services/account/AccountExtractor'
import { toast } from 'sonner'

export function AccountConfigurationManager() {
  const [configurations, setConfigurations] = useState<AccountConfiguration[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadConfigurations()
  }, [])

  const loadConfigurations = async () => {
    setIsLoading(true)
    try {
      const result = await AccountExtractor.getAllConfigurations()
      if (result.success && result.configurations) {
        setConfigurations(result.configurations)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to load configurations')
      console.error('Load configurations error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateConfiguration = async (id: string, isPrimary: boolean) => {
    try {
      const result = await AccountExtractor.updateConfiguration(id, { is_primary: isPrimary })
      if (result.success) {
        // Update local state
        setConfigurations(prev => 
          prev.map(config => 
            config.id === id 
              ? { ...config, is_primary: isPrimary }
              : config
          )
        )
        toast.success('Configuration updated')
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Failed to update configuration')
      console.error('Update configuration error:', error)
    }
  }

  const filteredConfigurations = configurations.filter(config => 
    config.account_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.last_five.includes(searchTerm)
  )

  const stats = {
    total: configurations.length,
    primary: configurations.filter(c => c.is_primary).length,
    employee: configurations.filter(c => !c.is_primary).length
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Configuration Manager</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure which account types and last 5 digits should be classified as primary cards (unchecked = employee cards)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Configs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.primary}</div>
            <div className="text-sm text-muted-foreground">Primary Cards</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: '#00175a' }}>{stats.employee}</div>
            <div className="text-sm text-muted-foreground">Employee Cards</div>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <Input
            placeholder="Search by account type or last 5 digits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button onClick={loadConfigurations} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh'}
          </Button>
        </div>

        {/* Configuration List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-12 gap-2 p-2 bg-gray-100 rounded text-sm font-medium">
            <div className="col-span-6">Account Type</div>
            <div className="col-span-2">Last 5</div>
            <div className="col-span-2 text-center">Primary Card</div>
            <div className="col-span-2 text-center">Status</div>
          </div>
          
          {filteredConfigurations.map((config) => (
            <div key={config.id} className="grid grid-cols-12 gap-2 p-2 bg-white border rounded text-sm items-center">
              <div className="col-span-6 font-medium">{config.account_type}</div>
              <div className="col-span-2 text-muted-foreground">({config.last_five})</div>
              <div className="col-span-2 flex justify-center">
                <Checkbox
                  checked={config.is_primary}
                  onCheckedChange={(checked) => 
                    updateConfiguration(config.id, checked as boolean)
                  }
                />
              </div>
              <div className="col-span-2 text-center">
                {config.is_primary ? (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    Primary
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-blue-100 rounded-full text-xs" style={{ color: '#00175a' }}>
                    Employee
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredConfigurations.length === 0 && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? 'No configurations match your search.' : 'No configurations found.'}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
