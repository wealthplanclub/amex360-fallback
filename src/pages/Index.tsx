
import React from "react";
import { MainCards } from "@/components/MainCards";
import { CardAccounts } from "@/components/CardAccounts";
import { TransactionCard } from "@/components/TransactionCard";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFilterState } from "@/hooks/useFilterState";
import Lottie from "lottie-react";

const Index = () => {
  const isMobile = useIsMobile();
  const { filters, updateFilter, updateMultipleFilters, clearFilter, clearAllFilters } = useFilterState("ytd");
  const [isLoading, setIsLoading] = React.useState(true);
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    // Load the cube-loader animation
    fetch("/cube-loader.json")
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Failed to load animation:", error));

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
        selectedCard: "all" // Reset card selection to show all cards for expenses
      });
    } else if (cardType === "credits") {
      // Clear any previous stat card filters and add credit filter
      updateMultipleFilters({
        expenseFilter: undefined,
        creditFilter: true,
        selectedCard: "all" // Reset card selection to show all cards for credits
      });
    } else if (cardType === "top-card" && topCardAccount) {
      // Set the card filter to the top card account and clear other stat filters
      updateMultipleFilters({
        expenseFilter: undefined,
        creditFilter: undefined,
        selectedCard: topCardAccount
      });
    } else if (cardType === "lowest-card" && topCardAccount) {
      // Set the card filter to the lowest card account and clear other stat filters
      updateMultipleFilters({
        expenseFilter: undefined,
        creditFilter: undefined,
        selectedCard: topCardAccount
      });
    }

    // Scroll to transaction card section
    setTimeout(() => {
      const transactionSection = document.getElementById('transaction-section');
      if (transactionSection) {
        transactionSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100); // Small delay to ensure state updates are processed
  };

  const handleClearStatCardFilter = () => {
    updateMultipleFilters({
      expenseFilter: undefined,
      creditFilter: undefined,
      selectedCard: "all"
    });
  };

  const handleDateClick = (date: string) => {
    // When a specific date is selected, clear the time range filter
    updateMultipleFilters({
      selectedDate: date,
      selectedTimeRange: undefined
    });
  };

  const clearDateFilter = () => {
    // When clearing date filter, restore default time range
    updateMultipleFilters({
      selectedDate: undefined,
      selectedTimeRange: 'ytd'
    });
  };

  const handleTimeRangeChange = (timeRange: string) => {
    console.log("Time range change requested:", timeRange, "isMobile:", isMobile);
    // When a time range is selected, clear the specific date filter
    updateMultipleFilters({
      selectedTimeRange: timeRange,
      selectedDate: undefined
    });
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
    <SidebarProvider>
      <div 
        className="min-h-screen w-full"
        style={{
          backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
          backgroundRepeat: 'repeat'
        }}
      >
        <AppSidebar />
        
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
              selectedTimeRange={filters.selectedTimeRange || 'ytd'} 
              onStatCardClick={handleStatCardClick}
            />
          </div>

          {/* Daily Spending Chart */}
          <div className="mt-8 px-4 lg:px-6">
            <ChartAreaInteractive 
              onDateClick={handleDateClick} 
              selectedTimeRange={filters.selectedTimeRange || 'ytd'}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </div>

          {/* Transaction Card and Card Spend Grid */}
          <div id="transaction-section" className="mt-8 px-4 lg:px-6">
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
                  selectedTimeRange={filters.selectedTimeRange || 'ytd'}
                  transactionDropdownSelection={filters.selectedCard}
                  filters={filters}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
