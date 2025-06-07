
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

  const handleDateClick = (date: string) => {
    // When a specific date is selected, clear the time range filter
    updateMultipleFilters({
      selectedDate: date,
      selectedTimeRange: undefined
    });
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

  const clearCardFilter = () => {
    updateFilter('selectedCard', 'all');
  };

  const handleTimeRangeChange = (timeRange: string) => {
    // When a time range is selected, clear the specific date filter
    updateMultipleFilters({
      selectedTimeRange: timeRange,
      selectedDate: undefined
    });
  };

  const scrollToTable = () => {
    const tableElement = document.querySelector('[data-testid="reward-table"]');
    if (tableElement) {
      tableElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handleCardClick = (cardType: string, topCardAccount?: string) => {
    console.log("Card clicked:", cardType, topCardAccount);
    
    if (cardType === "employee-rewards") {
      // Scroll to table and add employee card filter
      scrollToTable();
      updateFilter('globalFilter', 'employee card');
    } else if (cardType === "referral-rewards") {
      // Scroll to table, clear card filter, and add referral description filter
      scrollToTable();
      updateMultipleFilters({
        globalFilter: 'referral',
        selectedCard: 'all'
      });
    } else if (cardType === "top-card") {
      // Scroll to table, clear description filter, and add top card selection
      scrollToTable();
      updateMultipleFilters({
        globalFilter: '',
        selectedCard: topCardAccount || 'all'
      });
    }
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
              onDateClick={handleDateClick}
            />
          </div>
          
          {/* Table and Card List Row */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6">
            <div className="lg:col-span-2" data-testid="reward-table">
              <RewardCard 
                filters={filters}
                onClearDateFilter={clearDateFilter}
                onClearTimeRangeFilter={clearTimeRangeFilter}
                onDropdownChange={handleTransactionDropdownChange}
                onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
                onClearCardFilter={clearCardFilter}
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
