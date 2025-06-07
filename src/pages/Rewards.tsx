
import React from "react";
import { RewardCard } from "@/components/RewardCard";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useFilterState } from "@/hooks/useFilterState";

const Rewards = () => {
  const { filters, updateFilter, updateMultipleFilters, clearFilter, clearAllFilters } = useFilterState("ytd");

  const handleTransactionDropdownChange = (cardSelection: string) => {
    console.log("Reward dropdown changed:", cardSelection);
    updateFilter('selectedCard', cardSelection);
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
          
          {/* Rewards Card */}
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
