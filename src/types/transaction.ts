
export type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  account: string
  category: string
  card_type?: string
  last_five?: string
  point_multiple?: number
}
