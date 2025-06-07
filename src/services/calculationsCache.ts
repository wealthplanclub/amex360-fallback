
import { FilterState } from "@/hooks/useFilterState"

interface CachedCalculations {
  timestamp: number
  dataHash: string
  calculations: any
}

interface CacheKey {
  type: 'transaction' | 'reward'
  filters: string
}

export class CalculationsCacheService {
  private static instance: CalculationsCacheService
  private cache = new Map<string, CachedCalculations>()

  private constructor() {}

  public static getInstance(): CalculationsCacheService {
    if (!CalculationsCacheService.instance) {
      CalculationsCacheService.instance = new CalculationsCacheService()
    }
    return CalculationsCacheService.instance
  }

  private generateCacheKey(type: 'transaction' | 'reward', filters: any): string {
    const filterString = JSON.stringify(filters)
    return `${type}_${filterString}`
  }

  private generateDataHash(data: any[]): string {
    // Simple hash based on data length and last item
    const lastItem = data[data.length - 1]
    return `${data.length}_${lastItem?.id || 'empty'}_${lastItem?.date || 'no-date'}`
  }

  public getCachedCalculations(
    type: 'transaction' | 'reward',
    filters: any,
    currentData: any[],
    calculateFn: () => any
  ): any {
    const cacheKey = this.generateCacheKey(type, filters)
    const dataHash = this.generateDataHash(currentData)
    const cached = this.cache.get(cacheKey)

    // Check if cache is valid (only based on data hash, no time expiration)
    if (cached && cached.dataHash === dataHash) {
      console.log(`Using cached ${type} calculations for:`, filters)
      return cached.calculations
    }

    // Calculate fresh values
    console.log(`Calculating fresh ${type} calculations for:`, filters)
    const calculations = calculateFn()

    // Store in cache
    this.cache.set(cacheKey, {
      timestamp: Date.now(),
      dataHash,
      calculations
    })

    return calculations
  }

  public invalidateCache(type?: 'transaction' | 'reward'): void {
    if (type) {
      // Remove all entries for specific type
      const keysToDelete = Array.from(this.cache.keys()).filter(key => key.startsWith(type))
      keysToDelete.forEach(key => this.cache.delete(key))
      console.log(`Invalidated ${type} cache`)
    } else {
      // Clear entire cache
      this.cache.clear()
      console.log('Cleared entire calculations cache')
    }
  }

  public getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    }
  }
}

export const calculationsCacheService = CalculationsCacheService.getInstance()
