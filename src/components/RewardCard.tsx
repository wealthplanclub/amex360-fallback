
"use client"

import * as React from "react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Reward } from "@/types/reward"
import { RewardCardHeader } from "@/components/reward/RewardCardHeader"
import { TransactionCardControls } from "@/components/transaction/TransactionCardControls"
import { useRewardFilters } from "@/components/reward/RewardFilters"
import { RewardTable } from "@/components/reward/RewardTable"
import { FilterState } from "@/hooks/useFilterState"
import { rewardFilterService } from "@/services/rewardFilterService"

interface RewardCardProps {
  filters: FilterState;
  onClearDateFilter?: () => void;
  onClearTimeRangeFilter?: () => void;
  onDropdownChange?: (cardSelection: string) => void;
  onGlobalFilterChange?: (value: string) => void;
}

export function RewardCard({ 
  filters,
  onClearDateFilter,
  onClearTimeRangeFilter,
  onDropdownChange,
  onGlobalFilterChange
}: RewardCardProps) {
  // Get unique credit cards from the service
  const creditCards = React.useMemo(() => {
    return rewardFilterService.getUniqueCardAccounts()
  }, []);

  const handleCardChange = (card: string) => {
    if (onDropdownChange) {
      onDropdownChange(card);
    }
  };

  // Filter rewards using the centralized service
  const rewards = useRewardFilters({ filters })

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100">
      <RewardCardHeader
        selectedDate={filters.selectedDate}
        onClearDateFilter={onClearDateFilter}
        selectedTimeRange={filters.selectedTimeRange}
        onClearTimeRangeFilter={onClearTimeRangeFilter}
        filters={filters}
      />
      <CardContent>
        <div className="w-full">
          <TransactionCardControls
            globalFilter={filters.globalFilter}
            onGlobalFilterChange={onGlobalFilterChange || (() => {})}
            selectedCard={filters.selectedCard}
            creditCards={creditCards}
            onCardChange={handleCardChange}
          />
          <RewardTable
            rewards={rewards}
            globalFilter={filters.globalFilter}
            onGlobalFilterChange={onGlobalFilterChange || (() => {})}
          />
        </div>
      </CardContent>
    </Card>
  )
}
