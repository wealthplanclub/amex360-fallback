
import { Input } from "@/components/ui/input"
import { CardFilterDropdown } from "./CardFilterDropdown"

interface TransactionCardControlsProps {
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  selectedCard: string
  creditCards: string[]
  onCardChange: (card: string) => void
  statCardFilter?: {
    cardType: string
    timeRange: string
    topCardAccount?: string
  } | null
}

export function TransactionCardControls({
  globalFilter,
  onGlobalFilterChange,
  selectedCard,
  creditCards,
  onCardChange,
  statCardFilter
}: TransactionCardControlsProps) {
  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
      <Input
        placeholder="Search descriptions and amounts..."
        value={globalFilter ?? ""}
        onChange={(event) => onGlobalFilterChange(event.target.value)}
        className="max-w-sm"
      />
      {!statCardFilter && (
        <CardFilterDropdown
          selectedCard={selectedCard}
          creditCards={creditCards}
          onCardChange={onCardChange}
        />
      )}
    </div>
  )
}
