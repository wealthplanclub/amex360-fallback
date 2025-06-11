
import { Input } from "@/components/ui/input"
import { CardFilterDropdown } from "./CardFilterDropdown"
import { getAllPrimaryCards } from "@/data/staticPrimaryCards"

interface TransactionCardControlsProps {
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  selectedCard: string
  creditCards: string[]
  onCardChange: (card: string) => void
}

export function TransactionCardControls({
  globalFilter,
  onGlobalFilterChange,
  selectedCard,
  creditCards,
  onCardChange
}: TransactionCardControlsProps) {
  // Get primary card display names
  const primaryCards = getAllPrimaryCards()
  const primaryCardDisplayNames = primaryCards.map(card => card.displayName)

  return (
    <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
      <Input
        placeholder="Search descriptions..."
        value={globalFilter ?? ""}
        onChange={(event) => onGlobalFilterChange(event.target.value)}
        className="max-w-sm"
      />
      <CardFilterDropdown
        selectedCard={selectedCard}
        creditCards={primaryCardDisplayNames}
        onCardChange={onCardChange}
      />
    </div>
  )
}
