
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { MainCards } from "@/components/MainCards";
import { QuickMetricsCards } from "@/components/QuickMetricsCards";
import { ChartDisplay } from "@/components/chart/ChartDisplay";
import { TransactionCard } from "@/components/TransactionCard";
import { CardAccounts } from "@/components/CardAccounts";
import { useFilterState } from "@/hooks/useFilterState";
import { PageLoader } from "@/components/PageLoader";

const Dashboard = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { filters, updateFilter, updateMultipleFilters } = useFilterState("ytd");

  // Show PageLoader while loading
  if (isLoading) {
    return <PageLoader onLoadingComplete={() => setIsLoading(false)} />;
  }

  const handleTransactionDropdownChange = (cardSelection: string) => {
    console.log("Transaction dropdown changed:", cardSelection);
    updateFilter('selectedCard', cardSelection);
  };

  const handleCardClick = (cardSelection: string) => {
    console.log("Card clicked:", cardSelection);
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
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
            
            {/* Main Metrics Cards */}
            <div className="mt-8">
              <MainCards 
                filters={filters}
                onCardClick={(cardType, account) => {
                  console.log("Main card clicked:", cardType, account);
                  if (cardType === "top-card") {
                    updateFilter('selectedCard', account || 'all');
                  }
                }}
              />
            </div>
            
            {/* Quick Metrics Cards */}
            <div className="mt-8">
              <QuickMetricsCards filters={filters} />
            </div>
            
            {/* Chart - Full Width Row */}
            <div className="mt-8">
              <ChartDisplay
                filters={filters}
                onTimeRangeChange={handleTimeRangeChange}
                onDateClick={handleDateClick}
              />
            </div>
            
            {/* Transaction Table and Card Accounts Row */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TransactionCard 
                  filters={filters}
                  onClearDateFilter={clearDateFilter}
                  onClearTimeRangeFilter={clearTimeRangeFilter}
                  onDropdownChange={handleTransactionDropdownChange}
                  onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
                  onClearCardFilter={clearCardFilter}
                />
              </div>
              <div className="lg:col-span-1">
                <CardAccounts 
                  filters={filters} 
                  onCardClick={handleCardClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
