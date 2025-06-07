
import * as React from "react"
import { Reward } from "@/types/reward"
import { FilterState } from "@/hooks/useFilterState"
import { rewardFilterService } from "@/services/rewardFilterService"

interface RewardFiltersProps {
  filters: FilterState
}

export function useRewardFilters({
  filters
}: RewardFiltersProps) {
  return React.useMemo(() => {
    return rewardFilterService.getFilteredRewards(filters)
  }, [filters])
}
