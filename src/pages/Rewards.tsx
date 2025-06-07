
import React from "react";
import { RewardCard } from "@/components/RewardCard";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useFilterState } from "@/hooks/useFilterState";
import { RewardMetricsCards } from "@/components/reward/RewardMetricsCards";
import { RewardChartDisplay } from "@/components/reward/RewardChartDisplay";
import { RewardCardList } from "@/components/reward/RewardCardList";

const Rewards = () => {
  const { filters, updateFilter, updateMultipleFilters, clearFilter, clearAllFilters } = useFilterState("ytd");
  const [isVisible, setIsVisible] = React.useState(false);
  const [numbersKey, setNumbersKey] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    setNumbersKey(prev => prev + 1);
  }, [filters.selectedTimeRange, filters.selectedDate, filters.selectedCard]);

  const handleTransactionDropdownChange = (cardSelection: string) => {
    console.log("Reward dropdown changed:", cardSelection);
    updateFilter('selectedCard', cardSelection);
  };

  const handleRewardCardClick = (cardSelection: string) => {
    console.log("Reward card clicked:", cardSelection);
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

  const handleTimeRangeChange = (timeRange: string) => {
    updateFilter('selectedTimeRange', timeRange);
  };

  const handleCardClick = (cardType: string, topCardAccount?: string) => {
    console.log("Card clicked:", cardType, topCardAccount);
    // Handle card click logic here if needed
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
              isVisible={isVisible}
              numbersKey={numbersKey}
              onCardClick={handleCardClick}
            />
          </div>
          
          {/* Chart - Full Width Row */}
          <div className="mt-8 px-4 lg:px-6">
            <RewardChartDisplay
              filters={filters}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </div>
          
          {/* Table and Card List Row */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6">
            <div className="lg:col-span-2">
              <RewardCard 
                filters={filters}
                onClearDateFilter={clearDateFilter}
                onClearTimeRangeFilter={clearTimeRangeFilter}
                onDropdownChange={handleTransactionDropdownChange}
                onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
              />
            </div>
            <div className="lg:col-span-1">
              <RewardCardList 
                filters={filters} 
                onCardClick={handleRewardCardClick}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Rewards;
