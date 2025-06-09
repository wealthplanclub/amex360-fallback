
import React from "react"
import { Input } from "@/components/ui/input"

interface CreditMaxCounterpartySearchProps {
  value: string
  onChange: (value: string) => void
  isVisible: boolean
}

export function CreditMaxCounterpartySearch({ value, onChange, isVisible }: CreditMaxCounterpartySearchProps) {
  return (
    <div 
      className={`transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'mb-2 mt-1 opacity-100' 
          : 'mb-0 mt-0 opacity-0'
      }`}
      style={{
        height: isVisible ? 'auto' : '0',
        maxHeight: isVisible ? '120px' : '0'
      }}
    >
      <div className="p-1">
        <Input
          placeholder="Search counterparties"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-auto"
        />
      </div>
    </div>
  )
}
