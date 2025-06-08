
import React from "react"
import { Input } from "@/components/ui/input"

interface EmployeeCardSearchProps {
  value: string
  onChange: (value: string) => void
  isVisible: boolean
}

export function EmployeeCardSearch({ value, onChange, isVisible }: EmployeeCardSearchProps) {
  if (!isVisible) {
    return null
  }

  return (
    <div className="mb-4 mt-1 transition-all duration-300 ease-in-out">
      <Input
        placeholder="Search last 5 digits"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-auto"
      />
    </div>
  )
}
