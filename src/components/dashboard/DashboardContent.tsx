
import React from "react";
import { MainCards } from "@/components/MainCards";
import { CardAccounts } from "@/components/CardAccounts";
import { TransactionCard } from "@/components/TransactionCard";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { QuickMetricsCards } from "@/components/QuickMetricsCards";
import { FilterState } from "@/hooks/useFilterState";

interface DashboardContentProps {
  filters: FilterState;
  showContent: boolean;
  updateFilter: (key: keyof FilterState, value: any) => void;
  updateMultipleFilters: (updates: Partial<FilterState>) => void;
}

export const DashboardContent = ({ 
  filters, 
  showContent, 
  updateFilter, 
  updateMultipleFilters 
}: DashboardContentProps) => {
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
      updateMultipleFilters({
        expenseFilter: true,
        creditFilter: undefined,
        selectedCard: "all"
      });
    } else if (cardType === "credits") {
      updateMultipleFilters({
        expenseFilter: undefined,
        creditFilter: true,
        selectedCard: "all"
      });
    } else if (cardType === "top-card" && topCardAccount) {
      updateMultipleFilters({
        expenseFilter: undefined,
        creditFilter: undefined,
        selectedCard: topCardAccount
      });
    } else if (cardType === "lowest-card" && topCardAccount) {
      updateMultipleFilters({
        expenseFilter: undefined,
        creditFilter: undefined,
        selectedCard: topCardAccount
      });
    }

    setTimeout(() => {
      const transactionSection = document.getElementById('transaction-section');
      if (transactionSection) {
        transactionSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleClearStatCardFilter = () => {
    updateMultipleFilters({
      expenseFilter: undefined,
      creditFilter: undefined,
      selectedCard: "all"
    });
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

  const handleTimeRangeChange = (timeRange: string) => {
    console.log("Time range change requested:", timeRange);
    updateMultipleFilters({
      selectedTimeRange: timeRange,
      selectedDate: undefined
    });
  };

  const clearTimeRangeFilter = () => {
    console.log("Clearing time range filter");
    updateFilter('selectedTimeRange', 'ytd');
  };

  return (
    <>
      {/* Quick Metrics Cards */}
      <div className="mt-8">
        <QuickMetricsCards />
      </div>

      {/* Main Cards */}
      <div className="mt-8">
        <MainCards 
          selectedTimeRange={filters.selectedTimeRange || 'ytd'} 
          onStatCardClick={handleStatCardClick}
        />
      </div>

      {/* Daily Spending Chart with fade-in animation */}
      <div className={`mt-8 px-4 lg:px-6 transition-all duration-700 delay-100 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <ChartAreaInteractive 
          onDateClick={handleDateClick} 
          selectedTimeRange={filters.selectedTimeRange || 'ytd'}
          onTimeRangeChange={handleTimeRangeChange}
        />
      </div>

      {/* Transaction Card and Card Spend Grid with staggered fade-in animations */}
      <div id="transaction-section" className="mt-8 px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`lg:col-span-2 transition-all duration-700 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <TransactionCard 
              filters={filters}
              onClearDateFilter={clearDateFilter}
              onClearTimeRangeFilter={clearTimeRangeFilter}
              onDropdownChange={handleTransactionDropdownChange}
              onClearStatCardFilter={handleClearStatCardFilter}
              onGlobalFilterChange={(value) => updateFilter('globalFilter', value)}
            />
          </div>
          <div className={`lg:col-span-1 transition-all duration-700 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <CardAccounts 
              onCardClick={handleCardAccountClick} 
              selectedTimeRange={filters.selectedTimeRange || 'ytd'}
              transactionDropdownSelection={filters.selectedCard}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </>
  );
};
