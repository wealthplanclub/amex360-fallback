
export interface EmployeeTransaction {
  date: string
  description: string
  card_type: string
  last_five: string
  amount: number
  point_multiple: number
}

export const staticEmpData: EmployeeTransaction[] = []
