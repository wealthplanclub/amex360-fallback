
export type Transaction = {
  id: string
  user_id: string
  date: string
  description: string
  amount: number
  account_type: string
  last_five: string
  category?: string
  point_multiple?: number
  created_at?: string
  // Legacy fields for backward compatibility with existing static data
  account?: string
  card_type?: string
}
