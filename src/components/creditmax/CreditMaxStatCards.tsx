
import React from "react"
import { TrendingUp, CreditCard, ArrowUpDown, Target } from "lucide-react"
import { StatCard } from "@/components/StatCard"
import { SwapTransaction } from "@/utils/swapParser"

interface CreditMaxStatCardsProps {
  swapTransactions: SwapTransaction[]
}

export function CreditMaxStatCards({ swapTransactions }: CreditMaxStatCardsProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [numbersKey, setNumbersKey] = React.useState(0)

  React.useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    // Reset and re-trigger number animation when transactions change
    setNumbersKey(prev => prev + 1)
  }, [swapTransactions])

  // Calculate metrics from swap transactions
  const metrics = React.useMemo(() => {
    const totalSwapIn = swapTransactions
      .filter(t => t.direction === 'SWAP_IN')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalSwapOut = swapTransactions
      .filter(t => t.direction === 'SWAP_OUT')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalVolume = totalSwapIn + totalSwapOut
    
    const avgMultiple = swapTransactions.length > 0 
      ? swapTransactions.reduce((sum, t) => sum + t.multiple, 0) / swapTransactions.length 
      : 0
    
    const uniqueCounterparties = new Set(swapTransactions.map(t => t.counterparty)).size

    return {
      totalVolume: `$${Math.round(totalVolume / 1000)}K`,
      totalSwapIn: `$${Math.round(totalSwapIn / 1000)}K`,
      avgMultiple: `${avgMultiple.toFixed(1)}x`,
      uniqueCounterparties: uniqueCounterparties.toString()
    }
  }, [swapTransactions])

  const cardData = [
    {
      title: "Total Volume",
      value: metrics.totalVolume,
      badge: "100%",
      icon: TrendingUp,
      footer: "Swap volume",
      description: "Total swap transaction volume",
      formatAsPoints: false
    },
    {
      title: "Swap In",
      value: metrics.totalSwapIn,
      badge: "In",
      icon: Target,
      footer: "Incoming swaps",
      description: "Total incoming swap value",
      formatAsPoints: false
    },
    {
      title: "Avg Multiple",
      value: metrics.avgMultiple,
      badge: "Rate",
      icon: ArrowUpDown,
      footer: "Average multiplier",
      description: "Average swap multiple rate",
      formatAsPoints: true
    },
    {
      title: "Counterparties",
      value: metrics.uniqueCounterparties,
      badge: "Unique",
      icon: CreditCard,
      footer: "Trading partners",
      description: "Unique counterparties",
      formatAsPoints: true
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          badge={card.badge}
          icon={card.icon}
          footer={card.footer}
          description={card.description}
          index={index}
          isVisible={isVisible}
          numbersKey={numbersKey}
          formatAsPoints={card.formatAsPoints}
          showBadge={false}
          showHover={true}
        />
      ))}
    </div>
  )
}
