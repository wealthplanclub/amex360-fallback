
import { Users, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CounterpartyFilterDropdownProps {
  selectedCounterparty: string | undefined
  counterparties: string[]
  onCounterpartyChange: (counterparty: string) => void
}

export function CounterpartyFilterDropdown({ 
  selectedCounterparty, 
  counterparties, 
  onCounterpartyChange 
}: CounterpartyFilterDropdownProps) {
  const getDisplayText = () => {
    if (!selectedCounterparty || selectedCounterparty === "all") {
      return "All Counterparties"
    }
    return selectedCounterparty
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto md:ml-auto focus:ring-0 focus:ring-offset-0">
          <Users className="mr-2 h-4 w-4" />
          {getDisplayText()}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={!selectedCounterparty || selectedCounterparty === "all"}
          onCheckedChange={() => onCounterpartyChange("all")}
        >
          All Counterparties
        </DropdownMenuCheckboxItem>
        {counterparties.map((counterparty) => (
          <DropdownMenuCheckboxItem
            key={counterparty}
            checked={selectedCounterparty === counterparty}
            onCheckedChange={() => onCounterpartyChange(counterparty)}
          >
            {counterparty}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
