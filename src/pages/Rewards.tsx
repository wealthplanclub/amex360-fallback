import React from "react";
import { RewardCard } from "@/components/RewardCard";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useFilterState } from "@/hooks/useFilterState";
import { RewardMetricsCards } from "@/components/reward/RewardMetricsCards";
import { RewardChartDisplay } from "@/components/reward/RewardChartDisplay";
import { RewardCardList } from "@/components/reward/RewardCardList";
import Lottie from "lottie-react";

const Rewards = () => {
  const { filters, updateFilter, updateMultipleFilters, clearFilter, clearAllFilters } = useFilterState("ytd");
  const [isVisible, setIsVisible] = React.useState(false);
  const [numbersKey, setNumbersKey] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [animationData, setAnimationData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    // Load the loading-geo-b animation
    fetch("/loading-geo-b.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error));

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
      // Start showing content with staggered animations
      setTimeout(() => setShowContent(true), 100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    setNumbersKey(prev => prev + 1);
  }, [filters.selectedTimeRange, filters.selectedDate, filters.selectedCard]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {animationData && (
            <Lottie
              animationData={animationData}
              className="w-32 h-32 mx-auto"
              loop={true}
              autoplay={true}
            />
          )}
        </div>
      </div>
    );
  }

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
          
          {/* Chart - Full Width Row with fade-in animation */}
          <div className={`mt-8 px-4 lg:px-6 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <RewardChartDisplay
              filters={filters}
              onTimeRangeChange={handleTimeRangeChange}
              onDateClick={handleDateClick}
            />
          </div>
          
          {/* Table and Card List Row with staggered fade-in animations */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6">
            <div 
              className={`lg:col-span-2 transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
              data-testid="reward-table"
            >
              <RewardCard 
                filters={filters}
                onClearDateFilter={clearDateFilter}
                onClearTimeRangeFilter={clearTimeRangeFilter}
                onDropdownChange={handleTransactionDropdownChange}
                onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
                onClearCardFilter={clearCardFilter}
              />
            </div>
            <div className={`lg:col-span-1 transition-all duration-700 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
