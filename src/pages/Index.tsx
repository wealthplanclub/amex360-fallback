import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { MainCards } from "@/components/MainCards";
import { TransactionCard } from "@/components/TransactionCard";
import { CardAccounts } from "@/components/CardAccounts";
import { ChartDisplay } from "@/components/chart/ChartDisplay";
import { useFilterState } from "@/hooks/useFilterState";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 mb-8">
    {/* Header Skeleton */}
    <div className="flex justify-center items-center mb-8">
      <Skeleton className="h-16 w-64" />
    </div>
    
    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
    
    {/* Chart Skeleton */}
    <div className="px-4 lg:px-6 mb-8">
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
    
    {/* Table and Cards Grid Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6">
      {/* Transaction Table Skeleton */}
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
      
      {/* Card Accounts Skeleton */}
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

const Index = () => {
  const { filters, updateFilter, updateMultipleFilters, clearFilter, clearAllFilters } = useFilterState("ytd");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleStatCardClick = (cardType: string, topCardAccount?: string) => {
    console.log("Stat card clicked:", cardType, topCardAccount);
    
    if (cardType === "expenses") {
      updateFilter('expenseFilter', true);
    } else if (cardType === "credits") {
      updateFilter('creditFilter', true);
    } else if (cardType === "top-card") {
      updateFilter('topCardFilter', topCardAccount || '');
    } else if (cardType === "lowest-card") {
      updateFilter('lowestCardFilter', topCardAccount || '');
    }
  };

  const handleTransactionDropdownChange = (cardSelection: string) => {
    console.log("Transaction dropdown changed:", cardSelection);
    updateFilter('selectedCard', cardSelection);
  };

  const handleCardClick = (cardSelection: string) => {
    console.log("Card clicked:", cardSelection);
    updateFilter('selectedCard', cardSelection);
  };

  const handleDateClick = (date: string) => {
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

  const clearStatCardFilter = () => {
    updateMultipleFilters({
      expenseFilter: false,
      creditFilter: false,
      topCardFilter: '',
      lowestCardFilter: ''
    });
  };

  const handleTimeRangeChange = (timeRange: string) => {
    updateMultipleFilters({
      selectedTimeRange: timeRange,
      selectedDate: undefined
    });
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
          <DashboardSkeleton />
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
          
          {/* Main Cards */}
          <div className="mt-8">
            <MainCards 
              selectedTimeRange={filters.selectedTimeRange}
              onStatCardClick={handleStatCardClick}
            />
          </div>
          
          {/* Chart - Full Width Row */}
          <div className="mt-8 px-4 lg:px-6">
            <ChartDisplay
              selectedTimeRange={filters.selectedTimeRange}
              onTimeRangeChange={handleTimeRangeChange}
              onDateClick={handleDateClick}
            />
          </div>
          
          {/* Table and Cards Grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 lg:px-6">
            <div className="lg:col-span-2">
              <TransactionCard 
                filters={filters}
                onClearDateFilter={clearDateFilter}
                onClearTimeRangeFilter={clearTimeRangeFilter}
                onDropdownChange={handleTransactionDropdownChange}
                onClearStatCardFilter={clearStatCardFilter}
                onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
              />
            </div>
            <div className="lg:col-span-1">
              <CardAccounts 
                filters={filters} 
                onCardClick={handleCardClick}
                selectedTimeRange={filters.selectedTimeRange}
                transactionDropdownSelection={filters.selectedCard}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
