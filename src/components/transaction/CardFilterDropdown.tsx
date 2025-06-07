
import { CreditCard, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatAccountName } from "@/utils/transactionUtils"

interface CardFilterDropdownProps {
  selectedCard: string
  creditCards: string[]
  onCardChange: (card: string) => void
}

export function CardFilterDropdown({ selectedCard, creditCards, onCardChange }: CardFilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto md:ml-auto">
          <CreditCard className="mr-2 h-4 w-4" />
          {selectedCard === "all" ? "All Cards" : 
           selectedCard === "BUSINESS_GREEN_COMBINED" ? "Business Green Combined" :
           formatAccountName(selectedCard)}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={selectedCard === "all"}
          onCheckedChange={() => onCardChange("all")}
        >
          All Cards
        </DropdownMenuCheckboxItem>
        {creditCards.map((card) => (
          <DropdownMenuCheckboxItem
            key={card}
            checked={selectedCard === card}
            onCheckedChange={() => onCardChange(card)}
          >
            {card}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
