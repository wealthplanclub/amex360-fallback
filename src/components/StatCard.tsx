
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  badgeLabel: string;
  footerTitle: string;
  footerDescription: string;
  valueColor?: string;
  badgeIcon: LucideIcon;
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  badgeLabel,
  footerTitle,
  footerDescription,
  valueColor = "text-foreground",
  badgeIcon: BadgeIcon
}: StatCardProps) => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${valueColor}`}>
          {value}
        </CardTitle>
        <div className="mt-2">
          <Badge variant="outline">
            <BadgeIcon className="size-4 mr-1" />
            {badgeLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {footerTitle} <Icon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          {footerDescription}
        </div>
      </CardFooter>
    </Card>
  );
};
