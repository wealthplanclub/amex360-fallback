
import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CounterpartyData {
  name: string
  totalOutbound: number
  transactionCount: number
}

interface CreditMaxCounterpartyItemProps {
  counterparty: CounterpartyData
  index: number
  isCounterpartySelected: boolean
  selectedCounterparty?: string
  onCounterpartyClick: (counterparty: CounterpartyData) => void
}

// Placeholder circle images for counterparties
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9", 
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  "https://images.unsplash.com/photo-1501286353178-1ec881214838"
]

export function CreditMaxCounterpartyItem({ 
  counterparty, 
  index, 
  isCounterpartySelected, 
  selectedCounterparty, 
  onCounterpartyClick 
}: CreditMaxCounterpartyItemProps) {
  
  const handleCounterpartyClick = () => {
    onCounterpartyClick(counterparty)
  }

  // Get a consistent placeholder image based on counterparty name
  const getPlaceholderImage = (name: string) => {
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return PLACEHOLDER_IMAGES[Math.abs(hash) % PLACEHOLDER_IMAGES.length]
  }

  return (
    <Card 
      className="bg-gradient-to-b from-white to-gray-50 transition-all hover:shadow-md animate-fade-in cursor-pointer"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
      onClick={handleCounterpartyClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <img 
              src={getPlaceholderImage(counterparty.name)} 
              alt="Counterparty avatar" 
              className="w-16 h-16 object-cover rounded-full"
            />
            <div className="text-sm font-medium leading-tight">
              {counterparty.name}
            </div>
          </div>
          <div className="flex items-center justify-end sm:justify-end">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Outbound total
              </p>
              <div className="text-lg font-bold tabular-nums" style={{ color: '#00175a' }}>
                ${counterparty.totalOutbound.toLocaleString('en-US', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
