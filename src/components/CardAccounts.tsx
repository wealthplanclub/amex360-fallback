
import { staticTxnData } from "@/data/staticData";
import { processCardData, getTimeRangeDescription } from "@/utils/cardDataUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CardAccountItem } from "@/components/CardAccountItem";
import * as React from "react";

interface CardAccountsProps {
  onCardClick?: (cardName: string) => void;
  cardAccountSelection?: string | null;
  selectedTimeRange?: string;
  transactionDropdownSelection?: string;
}

export function CardAccounts({ 
  onCardClick, 
  cardAccountSelection, 
  selectedTimeRange = "ytd",
  transactionDropdownSelection = "all"
}: CardAccountsProps) {
  const allCardData = React.useMemo(() => {
    return processCardData(staticTxnData, selectedTimeRange);
  }, [selectedTimeRange]);

  // Filter cards based on transaction dropdown selection
  const cardData = React.useMemo(() => {
    if (transactionDropdownSelection === "all") {
      return allCardData;
    }
    
    if (transactionDropdownSelection === 'BUSINESS_GREEN_COMBINED') {
      return allCardData.filter(card => card.name === 'Business Green\n(-2007)');
    }
    
    return allCardData.filter(card => card.fullName === transactionDropdownSelection);
  }, [allCardData, transactionDropdownSelection]);

  // Calculate dynamic height based on filtered card count
  const dynamicHeight = React.useMemo(() => {
    const baseHeight = 200; // Minimum height for header and padding
    const cardHeight = 120; // Approximate height per card including spacing
    const maxHeight = 830; // Original maximum height
    
    const calculatedHeight = baseHeight + (cardData.length * cardHeight);
    return Math.min(calculatedHeight, maxHeight);
  }, [cardData.length]);

  const handleCardClick = (cardName: string) => {
    if (onCardClick) {
      onCardClick(cardName);
    }
  };

  return (
    <Card 
      className="bg-gradient-to-b from-white to-gray-100 flex flex-col transition-all duration-300 ease-in-out"
      style={{ height: `${dynamicHeight}px` }}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Card Accounts</CardTitle>
        <CardDescription>
          Total spending by card {getTimeRangeDescription(selectedTimeRange)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 pb-6">
            {cardData.map((card, index) => (
              <CardAccountItem
                key={card.fullName}
                card={card}
                index={index}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
