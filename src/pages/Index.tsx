import React from "react";
import { MainCards } from "@/components/MainCards";
import { CardAccounts } from "@/components/CardAccounts";
import { TransactionCard } from "@/components/TransactionCard";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { AppHeader } from "@/components/AppHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFilterState } from "@/hooks/useFilterState";

const Index = () => {
  const isMobile = useIsMobile();
  const { filters, updateFilter, updateMultipleFilters, clearFilter, clearAllFilters } = useFilterState("ytd");

  const handleCardAccountClick = (cardName: string) => {
    console.log("Card account clicked:", cardName);
    updateFilter('selectedCard', cardName);
  };

  const handleTransactionDropdownChange = (cardSelection: string) => {
    console.log("Transaction dropdown changed:", cardSelection);
    updateFilter('selectedCard', cardSelection);
  };

  const handleStatCardClick = (cardType: string, topCardAccount?: string) => {
    console.log("Stat card clicked:", cardType, topCardAccount);
    
    if (cardType === "expenses") {
      // Clear any previous stat card filters and add expense filter
      updateMultipleFilters({
        expenseFilter: true,
        creditFilter: undefined,
        topCardFilter: undefined,
        lowestCardFilter: undefined
      });
    } else if (cardType === "credits") {
      // Add credit filter to existing filters
      updateFilter('creditFilter', true);
    } else if (cardType === "top-card" && topCardAccount) {
      // Add top card filter to existing filters
      updateFilter('topCardFilter', topCardAccount);
    } else if (cardType === "lowest-card" && topCardAccount) {
      // Add lowest card filter to existing filters
      updateFilter('lowestCardFilter', topCardAccount);
    }
  };

  const handleClearStatCardFilter = () => {
    updateMultipleFilters({
      expenseFilter: undefined,
      creditFilter: undefined,
      topCardFilter: undefined,
      lowestCardFilter: undefined
    });
  };

  const handleDateClick = (date: string) => {
    updateFilter('selectedDate', date);
  };

  const clearDateFilter = () => {
    clearFilter('selectedDate');
  };

  const handleTimeRangeChange = (timeRange: string) => {
    console.log("Time range change requested:", timeRange, "isMobile:", isMobile);
    updateFilter('selectedTimeRange', timeRange);
  };

  const clearTimeRangeFilter = () => {
    console.log("Clearing time range filter, isMobile:", isMobile);
    updateFilter('selectedTimeRange', 'ytd');
  };

  // Add effect to log time range changes
  React.useEffect(() => {
    console.log("selectedTimeRange state changed to:", filters.selectedTimeRange, "isMobile:", isMobile);
  }, [filters.selectedTimeRange, isMobile]);

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
        backgroundRepeat: 'repeat'
      }}
    >
      {/* Header with Reset and Logout buttons */}
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
        
        {/* Main Cards */}
        <div className="mt-8">
          <MainCards 
            selectedTimeRange={filters.selectedTimeRange} 
            onStatCardClick={handleStatCardClick}
          />
        </div>

        {/* Daily Spending Chart */}
        <div className="mt-8 px-4 lg:px-6">
          <ChartAreaInteractive 
            onDateClick={handleDateClick} 
            selectedTimeRange={filters.selectedTimeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
        </div>

        {/* Transaction Card and Card Spend Grid */}
        <div className="mt-8 px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionCard 
                filters={filters}
                onClearDateFilter={clearDateFilter}
                onClearTimeRangeFilter={clearTimeRangeFilter}
                onDropdownChange={handleTransactionDropdownChange}
                onClearStatCardFilter={handleClearStatCardFilter}
                onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
              />
            </div>
            <div className="lg:col-span-1">
              <CardAccounts 
                onCardClick={handleCardAccountClick} 
                selectedTimeRange={filters.selectedTimeRange}
                transactionDropdownSelection={filters.selectedCard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
