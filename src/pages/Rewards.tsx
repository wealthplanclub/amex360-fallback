import React from "react";
import { RewardCard } from "@/components/RewardCard";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useFilterState } from "@/hooks/useFilterState";
import { RewardMetricsCards } from "@/components/reward/RewardMetricsCards";
import { RewardChartDisplay } from "@/components/reward/RewardChartDisplay";
import { RewardCardList } from "@/components/reward/RewardCardList";
import { Skeleton } from "@/components/ui/skeleton";

const RewardsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 mb-8">
    {/* Header with Logo Skeleton */}
    <div className="flex justify-center items-center">
      <Skeleton className="h-16 w-64" />
    </div>
    
    {/* Metrics Cards Skeleton */}
    <div className="mt-8 px-4 lg:px-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="pt-4">
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Chart Skeleton */}
    <div className="mt-8 px-4 lg:px-6">
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
    
    {/* Table and Card List Row Skeleton */}
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6">
      {/* Reward Table Skeleton */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border">
          <div className="p-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-32 ml-auto" />
            </div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32 flex-1" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Card List Skeleton */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border p-6">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48 mb-4" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Rewards = () => {
  const { filters, updateFilter, updateMultipleFilters, clearFilter, clearAllFilters } = useFilterState("ytd");
  const [isVisible, setIsVisible] = React.useState(false);
  const [numbersKey, setNumbersKey] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
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
      // Scroll to table and add referral filter
      scrollToTable();
      updateFilter('globalFilter', 'referral');
    } else if (cardType === "top-card") {
      // Scroll to table, clear description filter, and add top card selection
      scrollToTable();
      updateMultipleFilters({
        globalFilter: '',
        selectedCard: topCardAccount || 'all'
      });
    }
  };

  if (isLoading) {
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
          <RewardsSkeleton />
        </div>
      </SidebarProvider>
    );
  }

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
