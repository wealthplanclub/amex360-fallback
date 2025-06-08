
export interface EmployeeTransaction {
  date: string
  description: string
  card_type: string
  last_five: string
  amount: number
  point_multiple: number
}

export const staticEmpData: EmployeeTransaction[] = [
  {
    date: "2025-01-01",
    description: "ENTRECENTER         MIAMI BEACH         FL",
    card_type: "Blue Plus I",
    last_five: "-01026",
    amount: 2000.00,
    point_multiple: 2.0
  },
  {
    date: "2025-01-01", 
    description: "ENTRECENTER         MIAMI BEACH         FL",
    card_type: "Blue Plus I",
    last_five: "-01018",
    amount: 4000.00,
    point_multiple: 2.0
  }
]
