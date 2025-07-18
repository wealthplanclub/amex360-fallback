
import { Card, CardContent } from "@/components/ui/card";
import { getCardImage } from "@/utils/cardImageUtils";
import { CardData } from "@/utils/cardDataUtils";

interface CardAccountItemProps {
  card: CardData;
  index: number;
  onCardClick: (cardName: string) => void;
  isSelected: boolean;
}

export function CardAccountItem({ card, index, onCardClick, isSelected }: CardAccountItemProps) {
  const handleClick = () => {
    if (isSelected) {
      // If this card is already selected, toggle to "all"
      onCardClick('all');
    } else {
      // If this card is not selected, select it using default logic
      onCardClick(card.fullName);
    }
  };

  // Map display name for specific cards
  const getDisplayName = (cardName: string) => {
    console.log("Card name being processed:", JSON.stringify(cardName));
    if (cardName === 'Bonvoy Business Amex\n(-1009)') {
      return 'Marriott Bonvoy Business\n(-1009)';
    }
    if (cardName === 'Amazon Prime\n(-2003)') {
      return 'Amazon Business Prime\n(-2003)';
    }
    // Also check for the version without line break
    if (cardName === 'Amazon Prime (-2003)') {
      return 'Amazon Business Prime (-2003)';
    }
    return cardName;
  };

  return (
    <Card 
      className="bg-gradient-to-b from-white to-gray-50 cursor-pointer transition-all hover:shadow-md animate-fade-in"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <img 
              src={getCardImage(card.fullName)} 
              alt="Card placeholder" 
              className="w-16 h-10 object-cover rounded"
            />
            <div className="text-sm font-medium leading-tight whitespace-pre-line">
              {getDisplayName(card.name)}
            </div>
          </div>
          <div className="flex items-center justify-end sm:justify-end">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Total spend
              </p>
              <div className="text-lg font-bold tabular-nums">
                ${card.amount.toLocaleString('en-US', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
