
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
            {cardData.map((card, index) => (
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
