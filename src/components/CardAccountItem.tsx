
import { Card, CardContent } from "@/components/ui/card";
import { getCardImage } from "@/utils/cardImageUtils";
import { CardData } from "@/utils/cardDataUtils";

interface CardAccountItemProps {
  card: CardData;
  index: number;
  selectedCard?: string | null;
}

export function CardAccountItem({ card, index, selectedCard }: CardAccountItemProps) {
  const isSelected = selectedCard === card.fullName || 
    (selectedCard === 'BUSINESS_GREEN_COMBINED' && card.name === 'Business Green\n(-2007)');

  return (
    <Card 
      className={`bg-gradient-to-b from-white to-gray-50 transition-all animate-fade-in ${
        isSelected ? 'bg-accent' : ''
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: 'both'
      }}
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
              {card.name}
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
