
import { EmployeeTransaction } from "@/components/employee/EmployeeTransactionColumns"

export const parseEmployeeData = (data: string): EmployeeTransaction[] => {
  const lines = data.trim().split('\n')
  const headers = lines[0].split('\t')
  
  return lines.slice(1).map(line => {
    const values = line.split('\t')
    
    return {
      date: values[0] || '',
      description: values[1] || '',
      card_type: values[2] || '',
      last_five: values[3] || '',
      amount: parseFloat(values[4]) || 0,
      point_multiple: parseFloat(values[5]) || 1.0
    }
  })
}
