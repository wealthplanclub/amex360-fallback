import { useState } from "react";
import { SectionCards } from "@/components/SectionCards";
import { CardAccounts } from "@/components/CardAccounts";
import { TransactionCard } from "@/components/TransactionCard";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { AppHeader } from "@/components/AppHeader";

const Index = () => {
  const [selectedCard, setSelectedCard] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("ytd");
  const [statCardFilter, setStatCardFilter] = useState<{
    cardType: string;
    timeRange: string;
    topCardAccount?: string;
    lowestCardAccount?: string;
  } | null>(null);

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
    setSelectedTimeRange(timeRange);
  };

  const handleStatCardClick = (cardType: string, timeRange: string, topCardAccount?: string, lowestCardAccount?: string) => {
    console.log("Stat card clicked:", cardType, timeRange, topCardAccount, lowestCardAccount);
    setStatCardFilter({ cardType, timeRange, topCardAccount, lowestCardAccount });
    // Reset other filters when stat card is clicked
    setSelectedCard("all");
    setSelectedDate("");
  };

  const clearStatCardFilter = () => {
    setStatCardFilter(null);
  };

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
              />
            </div>
            <div className="lg:col-span-1">
              <CardAccounts 
                onCardClick={handleCardClick} 
                selectedCard={selectedCard} 
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
