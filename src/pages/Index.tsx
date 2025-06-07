
import { useState } from "react";
import { SectionCards } from "@/components/SectionCards";
import { CardSpendGrid } from "@/components/CardSpendGrid";
import { TransactionCard } from "@/components/TransactionCard";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

const Index = () => {
  const [selectedCard, setSelectedCard] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("ytd");

  const handleCardClick = (cardName: string) => {
    setSelectedCard(cardName);
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

  return (
    <div 
      className="min-h-screen p-6"
      style={{
        backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
        backgroundRepeat: 'repeat'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Image */}
        <div className="text-center mt-4">
          <img 
            src="https://i.imgur.com/1fFddP4.png" 
            alt="Amex Logo" 
            className="mx-auto w-full max-w-[235px] h-auto"
          />
        </div>
        
        {/* Section Cards */}
        <div className="mt-8">
          <SectionCards selectedTimeRange={selectedTimeRange} />
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
              />
            </div>
            <div className="lg:col-span-1">
              <CardSpendGrid onCardClick={handleCardClick} selectedCard={selectedCard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
