
import { EmployeeTransaction } from "@/components/employee/EmployeeTransactionColumns"

export const parseEmployeeData = (data: string): EmployeeTransaction[] => {
  const lines = data.trim().split('\n')
  const headers = lines[0].split('\t')
  
  return lines.slice(1).map(line => {
    const values = line.split('\t')
    
    return {
      date: values[0] || '',
      description: values[3] || '', // reward_description maps to description
      card_type: values[2] || '', // card maps to card_type
      last_five: '', // Not in the data, so empty string
      amount: parseInt(values[4]) || 0, // points maps to amount
      point_multiple: 1.0 // Default value since not in data
    }
  })
}
