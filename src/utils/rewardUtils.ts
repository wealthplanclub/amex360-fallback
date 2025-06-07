
import { Row } from "@tanstack/react-table"
import { Reward } from "@/types/reward"

export const rewardGlobalFilterFn = (
  row: Row<Reward>,
  columnId: string,
  filterValue: string
): boolean => {
  if (!filterValue) return true
  
  const searchValue = filterValue.toLowerCase()
  
  // Search in reward description
  const description = row.getValue("reward_description") as string
  if (description?.toLowerCase().includes(searchValue)) {
    return true
  }
  
  return false
}
