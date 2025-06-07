
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
  selectedCard?: string;
  selectedTimeRange?: string;
}

export function CardAccounts({ onCardClick, selectedCard, selectedTimeRange = "ytd" }: CardAccountsProps) {
  const cardData = React.useMemo(() => {
    return processCardData(staticTxnData, selectedTimeRange);
  }, [selectedTimeRange]);

  // Filter cards based on selectedCard
  const filteredCardData = React.useMemo(() => {
    if (!selectedCard || selectedCard === "all") {
      return cardData;
    }
    
    // Handle special case for Business Green Combined
    if (selectedCard === "BUSINESS_GREEN_COMBINED") {
      return cardData.filter(card => card.name === 'Business Green\n(-2007)');
    }
    
    // Filter by matching fullName with selectedCard
    return cardData.filter(card => card.fullName === selectedCard);
  }, [cardData, selectedCard]);

  const handleCardClick = (cardName: string) => {
    if (onCardClick) {
      onCardClick(cardName);
    }
  };

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100 h-[830px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Card Accounts</CardTitle>
        <CardDescription>
          Total spending by card {getTimeRangeDescription(selectedTimeRange)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 pb-6">
            {filteredCardData.map((card, index) => (
              <CardAccountItem
                key={card.fullName}
                card={card}
                index={index}
                selectedCard={selectedCard}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
