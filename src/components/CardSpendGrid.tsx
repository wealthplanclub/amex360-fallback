

import { staticTxnData } from "@/data/staticData"
import { parseTransactionData } from "@/utils/transactionParser"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CardSpendGridProps {
  onCardClick?: (cardName: string) => void;
  selectedCard?: string;
}

export function CardSpendGrid({ onCardClick, selectedCard }: CardSpendGridProps) {
  // Parse the CSV data and calculate totals per card
  const transactions = parseTransactionData(staticTxnData);
  
  const cardExpenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => {
      const account = transaction.account;
      if (!acc[account]) {
        acc[account] = 0;
      }
      acc[account] += Math.abs(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

  const cardData = Object.entries(cardExpenses)
    .reduce((acc, [account, amount]) => {
      if (account.toLowerCase().includes('business green rewards')) {
        const existingBusinessGreen = acc.find(card => card.name === 'Business Green\n(-2007)');
        if (existingBusinessGreen) {
          existingBusinessGreen.amount += amount;
        } else {
          acc.push({
            name: 'Business Green\n(-2007)',
            fullName: 'Business Green Rewards Combined',
            amount
          });
        }
      } else {
        acc.push({
          name: account.replace(/\bcard\b/gi, '').trim().replace(/\s*(\([^)]+\))/, '\n$1'),
          fullName: account,
          amount
        });
      }
      return acc;
    }, [] as Array<{ name: string; fullName: string; amount: number }>)
    .sort((a, b) => b.amount - a.amount);

  const getCardImage = (cardName: string) => {
    const lowerCardName = cardName.toLowerCase();
    if (lowerCardName.includes('hilton')) {
      return "https://www.aexp-static.com/online/myca/shared/summary/cardasset/images/NUS000000336_480x304_STRAIGHT_96.jpg";
    } else if (lowerCardName.includes('marriott')) {
      return "https://www.aexp-static.com/online/myca/shared/summary/cardasset/images/NUS000000314_480x304_STRAIGHT_96.jpg";
    } else if (lowerCardName.includes('delta')) {
      return "https://www.aexp-static.com/online/myca/shared/summary/cardasset/images/NUS000000270_480x304_STRAIGHT_96.jpg";
    } else if (lowerCardName.includes('amazon')) {
      return "https://www.aexp-static.com/online/myca/shared/summary/cardasset/images/NUS000000251_480x304_STRAIGHT_96.jpg";
    } else if (lowerCardName.includes('business platinum')) {
      return "https://i.imgur.com/PO79ixr.jpeg";
    } else if (lowerCardName.includes('platinum') && !lowerCardName.includes('schwab')) {
      return "https://www.aexp-static.com/online/myca/shared/summary/cardasset/images/NUS000000237_480x304_STRAIGHT_96.jpg";
    } else if (lowerCardName.includes('blue')) {
      return "https://i.imgur.com/DOm8KGF.jpeg";
    } else if (lowerCardName.includes('green')) {
      return "https://i.imgur.com/fAK8uEB.png";
    } else if (lowerCardName.includes('schwab')) {
      return "https://www.aexp-static.com/online/myca/shared/summary/cardasset/images/NUS000000242_480x304_STRAIGHT_96.jpg";
    } else if (lowerCardName.includes('gold')) {
      if (lowerCardName.includes('-2008')) {
        return "https://i.imgur.com/4zwqhph.jpeg";
      } else if (lowerCardName.includes('-1002')) {
        return "https://i.imgur.com/QLjcloI.jpeg";
      } else if (lowerCardName.includes('-1000')) {
        return "https://i.imgur.com/BvemgNT.png";
      }
      return "https://i.imgur.com/QLjcloI.jpeg"; // fallback for other gold cards
    }
    return "https://i.imgur.com/4zwqhph.jpeg"; // default image
  };

  const handleCardClick = (cardName: string) => {
    if (onCardClick) {
      onCardClick(cardName);
    }
  };

  return (
    <Card className="bg-gradient-to-b from-white to-gray-100 h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Card Spending Breakdown</CardTitle>
        <CardDescription>
          Total spending by credit card
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 pb-6">
            {cardData.map((card) => (
              <Card 
                key={card.fullName} 
                className={`bg-gradient-to-b from-white to-gray-50 cursor-pointer transition-all hover:shadow-md ${
                  selectedCard === card.fullName ? 'bg-accent' : ''
                }`}
                onClick={() => handleCardClick(card.fullName)}
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
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

