
import React, { useState } from "react";
import { SectionCards } from "@/components/SectionCards";
import { CardAccounts } from "@/components/CardAccounts";
import { TransactionCard } from "@/components/TransactionCard";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { AppHeader } from "@/components/AppHeader";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("ytd");
  const [statCardFilter, setStatCardFilter] = useState<{
    cardType: string;
    timeRange: string;
    topCardAccount?: string;
  } | null>(null);
  
  const isMobile = useIsMobile();

  // State to track the dropdown selection from TransactionCard
  const [transactionDropdownSelection, setTransactionDropdownSelection] = useState<string>("all");

  const handleCardAccountClick = (cardName: string) => {
    console.log("Card account clicked:", cardName);
    setTransactionDropdownSelection(cardName);
    // Clear stat card filter when manually selecting a card
    setStatCardFilter(null);
  };

  const handleTransactionDropdownChange = (cardSelection: string) => {
    console.log("Transaction dropdown changed:", cardSelection);
    setTransactionDropdownSelection(cardSelection);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  const clearDateFilter = () => {
    setSelectedDate("");
  };

  const handleTimeRangeChange = (timeRange: string) => {
    console.log("Time range change requested:", timeRange, "isMobile:", isMobile);
    console.log("Current selectedTimeRange before change:", selectedTimeRange);
    setSelectedTimeRange(timeRange);
    console.log("Time range state should be updated to:", timeRange);
  };

  const clearTimeRangeFilter = () => {
    console.log("Clearing time range filter, isMobile:", isMobile);
    setSelectedTimeRange("ytd");
  };

  const handleStatCardClick = (cardType: string, timeRange: string, topCardAccount?: string) => {
    console.log("Stat card clicked:", cardType, timeRange, topCardAccount);
    setStatCardFilter({ cardType, timeRange, topCardAccount });
    // Reset dropdown selection when stat card is clicked
    setTransactionDropdownSelection("all");
    setSelectedDate("");
  };

  const clearStatCardFilter = () => {
    setStatCardFilter(null);
  };

  // Add effect to log time range changes
  React.useEffect(() => {
    console.log("selectedTimeRange state changed to:", selectedTimeRange, "isMobile:", isMobile);
  }, [selectedTimeRange, isMobile]);

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
        
        {/* Section Cards */}
        <div className="mt-8">
          <SectionCards 
            selectedTimeRange={selectedTimeRange} 
            onStatCardClick={handleStatCardClick}
          />
        </div>

        {/* Daily Spending Chart */}
        <div className="mt-8 px-4 lg:px-6">
          <ChartAreaInteractive 
            onDateClick={handleDateClick} 
            selectedTimeRange={selectedTimeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
        </div>

        {/* Transaction Card and Card Spend Grid */}
        <div className="mt-8 px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionCard 
                cardAccountSelection={transactionDropdownSelection}
                selectedDate={selectedDate}
                onClearDateFilter={clearDateFilter}
                statCardFilter={statCardFilter}
                onClearStatCardFilter={clearStatCardFilter}
                selectedTimeRange={selectedTimeRange}
                onClearTimeRangeFilter={clearTimeRangeFilter}
                onDropdownChange={handleTransactionDropdownChange}
              />
            </div>
            <div className="lg:col-span-1">
              <CardAccounts 
                onCardClick={handleCardAccountClick} 
                selectedTimeRange={selectedTimeRange}
                transactionDropdownSelection={transactionDropdownSelection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
