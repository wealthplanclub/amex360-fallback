import React, { useState } from "react";
import { SectionCards } from "@/components/SectionCards";
import { CardAccounts } from "@/components/CardAccounts";
import { TransactionCard } from "@/components/TransactionCard";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { AppHeader } from "@/components/AppHeader";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [selectedCard, setSelectedCard] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("ytd");
  const [statCardFilter, setStatCardFilter] = useState<{
    cardType: string;
    timeRange: string;
    topCardAccount?: string;
  } | null>(null);
  const [selectedCardFromDropdown, setSelectedCardFromDropdown] = useState<string>("all");
  
  const isMobile = useIsMobile();

  const handleCardClick = (cardName: string) => {
    setSelectedCard(cardName);
    // Clear stat card filter when manually selecting a card
    setStatCardFilter(null);
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
    // Reset other filters when stat card is clicked
    setSelectedCard("all");
    setSelectedDate("");
  };

  const clearStatCardFilter = () => {
    setStatCardFilter(null);
  };

  const handleCardSelectionFromDropdown = (card: string) => {
    setSelectedCardFromDropdown(card);
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
                selectedCardFromGrid={selectedCard} 
                selectedDate={selectedDate}
                onClearDateFilter={clearDateFilter}
                statCardFilter={statCardFilter}
                onClearStatCardFilter={clearStatCardFilter}
                selectedTimeRange={selectedTimeRange}
                onClearTimeRangeFilter={clearTimeRangeFilter}
                onCardSelectionChange={handleCardSelectionFromDropdown}
              />
            </div>
            <div className="lg:col-span-1">
              <CardAccounts 
                onCardClick={handleCardClick} 
                selectedCard={selectedCardFromDropdown} 
                selectedTimeRange={selectedTimeRange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
