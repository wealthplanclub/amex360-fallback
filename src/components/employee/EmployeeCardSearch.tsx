
import React from "react"
import { Input } from "@/components/ui/input"

interface EmployeeCardSearchProps {
  value: string
  onChange: (value: string) => void
  isVisible: boolean
}

export function EmployeeCardSearch({ value, onChange, isVisible }: EmployeeCardSearchProps) {
  return (
    <div 
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isVisible 
          ? 'mb-5 mt-1 opacity-100' 
          : 'mb-0 mt-0 opacity-0'
      }`}
      style={{
        height: isVisible ? 'auto' : '0',
        maxHeight: isVisible ? '100px' : '0'
      }}
    >
      <Input
        placeholder="Search last 5 digits"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-auto"
      />
    </div>
  )
}
