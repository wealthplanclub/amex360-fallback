
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: number
  badge: string
  icon: React.ComponentType<{ className?: string }>
  footer: string
  description: string
  index: number
  isVisible: boolean
  numbersKey: number
  clickable?: boolean
  showHover?: boolean
  cardType?: string
  topCardAccount?: string
  onClick?: (cardType: string, topCardAccount?: string) => void
  formatAsPoints?: boolean
  variant?: "dashboard" | "rewards"
}

export function StatCard({
  title,
  value,
  badge,
  icon: IconComponent,
  footer,
  description,
  index,
  isVisible,
  numbersKey,
  clickable = false,
  showHover = false,
  cardType,
  topCardAccount,
  onClick,
  formatAsPoints = false,
  variant = "dashboard"
}: StatCardProps) {
  const handleClick = () => {
    if (clickable && cardType && onClick) {
      onClick(cardType, topCardAccount);
    }
  };

  const formatValue = (val: number) => {
    if (formatAsPoints) {
      return val.toLocaleString('en-US');
    }
    return `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getCardClasses = () => {
    const gradientClass = variant === "rewards" 
      ? "bg-gradient-to-b from-white to-blue-50" 
      : "bg-gradient-to-b from-white to-gray-100";
    
    const baseClasses = `relative ${gradientClass}`;
    
    if (clickable) {
      return `${baseClasses} cursor-pointer hover:shadow-lg transition-shadow duration-200`;
    } else if (showHover) {
      return `${baseClasses} hover:shadow-lg transition-shadow duration-200`;
    }
    
    return baseClasses;
  };

  return (
    <Card 
      className={getCardClasses()}
      onClick={handleClick}
    >
      <CardHeader className="pb-6">
        <CardDescription>{title}</CardDescription>
        <CardTitle 
          key={`${title}-${numbersKey}`}
          className={`text-2xl font-semibold tabular-nums lg:text-3xl transition-opacity duration-1000 ease-in-out ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          {formatValue(value)}
        </CardTitle>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="gap-1">
            <IconComponent className="h-3 w-3" />
            {badge}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0 pb-6">
        <div className="flex gap-2 font-medium items-center">
          {footer} <IconComponent className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          {description}
        </div>
      </CardFooter>
    </Card>
  );
}
