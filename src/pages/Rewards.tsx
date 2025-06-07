
import React from "react";
import { RewardCard } from "@/components/RewardCard";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useFilterState } from "@/hooks/useFilterState";
import { RewardMetricsCards } from "@/components/reward/RewardMetricsCards";
import { RewardChart } from "@/components/reward/RewardChart";
import { CardAccounts } from "@/components/CardAccounts";

const Rewards = () => {
  const { filters, updateFilter, updateMultipleFilters, clearFilter, clearAllFilters } = useFilterState("ytd");

  const handleTransactionDropdownChange = (cardSelection: string) => {
    console.log("Reward dropdown changed:", cardSelection);
    updateFilter('selectedCard', cardSelection);
  };

  const handleDateClick = (date: string) => {
    console.log("Date clicked:", date);
    updateFilter('selectedDate', date);
  };

  const handleTimeRangeChange = (timeRange: string) => {
    console.log("Time range changed:", timeRange);
    updateFilter('selectedTimeRange', timeRange);
  };

  const handleCardClick = (cardType: string, topCardAccount?: string) => {
    console.log("Card clicked:", cardType, topCardAccount);
    if (cardType === "top-card" && topCardAccount) {
      updateFilter('selectedCard', topCardAccount);
    }
  };

  const clearDateFilter = () => {
    updateMultipleFilters({
      selectedDate: undefined,
      selectedTimeRange: 'ytd'
    });
  };

  const clearTimeRangeFilter = () => {
    updateFilter('selectedTimeRange', 'ytd');
  };

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen w-full"
        style={{
          backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
          backgroundRepeat: 'repeat'
        }}
      >
        <AppSidebar />
        
        <AppHeader />
        
        <div className="max-w-7xl mx-auto px-6 mb-8">
          {/* Header with Logo */}
          <div className="flex justify-center items-center">
            <img 
              src="https://i.imgur.com/1fFddP4.png" 
              alt="Amex Logo" 
              className="mx-auto"
              style={{ width: '276px' }}
            />
          </div>
          
          {/* Metrics Cards */}
          <div className="mt-8 px-4 lg:px-6">
            <RewardMetricsCards 
              filters={filters}
              onCardClick={handleCardClick}
            />
          </div>

          {/* Chart */}
          <div className="mt-8 px-4 lg:px-6">
            <RewardChart
              onDateClick={handleDateClick}
              selectedTimeRange={filters.selectedTimeRange}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </div>

          {/* Card Accounts */}
          <div className="mt-8 px-4 lg:px-6">
            <CardAccounts />
          </div>
          
          {/* Rewards Table */}
          <div className="mt-8 px-4 lg:px-6">
            <RewardCard 
              filters={filters}
              onClearDateFilter={clearDateFilter}
              onClearTimeRangeFilter={clearTimeRangeFilter}
              onDropdownChange={handleTransactionDropdownChange}
              onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Rewards;
