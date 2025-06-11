
import { transactionFilterService } from "@/services/transaction"

export interface PrimaryCard {
  cardType: string
  lastFive: string
  displayName: string
  isPrimary: boolean
}

// Static configuration for primary cards with manually inputted last 5 digits
export const primaryCardsConfig: PrimaryCard[] = [
  {
    cardType: "Amazon Business Prime",
    lastFive: "00001", // TODO: Update with actual primary card last 5 digits
    displayName: "Amazon Business Prime (00001)",
    isPrimary: true
  },
  {
    cardType: "Bonvoy Business Amex", 
    lastFive: "00002", // TODO: Update with actual primary card last 5 digits
    displayName: "Marriott Bonvoy Business (00002)",
    isPrimary: true
  },
  {
    cardType: "Business Blue Plus I",
    lastFive: "00003", // TODO: Update with actual primary card last 5 digits
    displayName: "Business Blue Plus I (00003)",
    isPrimary: true
  },
  {
    cardType: "Business Blue Plus II",
    lastFive: "00004", // TODO: Update with actual primary card last 5 digits
    displayName: "Business Blue Plus II (00004)",
    isPrimary: true
  },
  {
    cardType: "Business Classic Gold",
    lastFive: "00005", // TODO: Update with actual primary card last 5 digits
    displayName: "Business Classic Gold (00005)",
    isPrimary: true
  },
  {
    cardType: "Business Green",
    lastFive: "00006", // TODO: Update with actual primary card last 5 digits
    displayName: "Business Green (00006)",
    isPrimary: true
  },
  {
    cardType: "Business Platinum Card",
    lastFive: "00007", // TODO: Update with actual primary card last 5 digits
    displayName: "Business Platinum Card (00007)",
    isPrimary: true
  },
  {
    cardType: "Business Rose Gold",
    lastFive: "00008", // TODO: Update with actual primary card last 5 digits
    displayName: "Business Rose Gold (00008)",
    isPrimary: true
  },
  {
    cardType: "Business White Gold",
    lastFive: "00009", // TODO: Update with actual primary card last 5 digits
    displayName: "Business White Gold (00009)",
    isPrimary: true
  },
  {
    cardType: "Charles Schwab Platinum Card",
    lastFive: "00010", // TODO: Update with actual primary card last 5 digits
    displayName: "Charles Schwab Platinum Card (00010)",
    isPrimary: true
  },
  {
    cardType: "Delta Skymiles Reserve",
    lastFive: "00011", // TODO: Update with actual primary card last 5 digits
    displayName: "Delta Skymiles Reserve (00011)",
    isPrimary: true
  },
  {
    cardType: "Hilton Honors Business",
    lastFive: "00012", // TODO: Update with actual primary card last 5 digits
    displayName: "Hilton Honors Business (00012)",
    isPrimary: true
  },
  {
    cardType: "Platinum Card",
    lastFive: "00013", // TODO: Update with actual primary card last 5 digits
    displayName: "Platinum Card (00013)",
    isPrimary: true
  }
]

// Helper functions
export function getAllPrimaryCards(): PrimaryCard[] {
  return primaryCardsConfig.filter(card => card.isPrimary)
}

export function getPrimaryCardByType(cardType: string): PrimaryCard | undefined {
  return primaryCardsConfig.find(card => card.cardType === cardType && card.isPrimary)
}

export function getPrimaryCardLastFive(cardType: string): string | undefined {
  const primaryCard = getPrimaryCardByType(cardType)
  return primaryCard?.lastFive
}

export function generateDisplayNameWithLastFive(cardType: string, lastFive?: string): string {
  const primaryCard = getPrimaryCardByType(cardType)
  const actualLastFive = lastFive || primaryCard?.lastFive || "XXXXX"
  
  // Apply same display name formatting as existing logic
  if (cardType === "Bonvoy Business Amex") {
    return `Marriott Bonvoy Business (${actualLastFive})`
  }
  
  return `${cardType} (${actualLastFive})`
}

export function updatePrimaryCardLastFive(cardType: string, newLastFive: string): boolean {
  const cardIndex = primaryCardsConfig.findIndex(card => card.cardType === cardType)
  if (cardIndex === -1) return false
  
  primaryCardsConfig[cardIndex].lastFive = newLastFive
  primaryCardsConfig[cardIndex].displayName = generateDisplayNameWithLastFive(cardType, newLastFive)
  return true
}

// Validation function to ensure all unique card types from transaction data are included
export function validatePrimaryCardsAgainstTransactionData(): {
  valid: boolean
  missingCards: string[]
  extraCards: string[]
} {
  const uniqueCardTypes = transactionFilterService.getUniqueCardAccounts()
  const configuredCardTypes = primaryCardsConfig.map(card => card.cardType)
  
  const missingCards = uniqueCardTypes.filter(cardType => !configuredCardTypes.includes(cardType))
  const extraCards = configuredCardTypes.filter(cardType => !uniqueCardTypes.includes(cardType))
  
  return {
    valid: missingCards.length === 0 && extraCards.length === 0,
    missingCards,
    extraCards
  }
}
