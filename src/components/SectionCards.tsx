
import { TrendingDown, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="relative">
        <CardHeader className="pb-2">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums lg:text-3xl">
            $1,250.00
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0">
          <div className="flex gap-2 font-medium items-center">
            Trending up this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      
      <Card className="relative">
        <CardHeader className="pb-2">
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums lg:text-3xl">
            1,234
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="gap-1">
              <TrendingDown className="h-3 w-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0">
          <div className="flex gap-2 font-medium items-center">
            Down 20% this period <TrendingDown className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      
      <Card className="relative">
        <CardHeader className="pb-2">
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums lg:text-3xl">
            45,678
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0">
          <div className="flex gap-2 font-medium items-center">
            Strong user retention <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      
      <Card className="relative">
        <CardHeader className="pb-2">
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums lg:text-3xl">
            4.5%
          </CardTitle>
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm pt-0">
          <div className="flex gap-2 font-medium items-center">
            Steady performance increase <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
