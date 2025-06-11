
export interface PrimaryCardConfig {
  id: string
  cardType: string
  lastFive: string
  displayName: string
  isActive: boolean
}

export const staticPrimaryCards: PrimaryCardConfig[] = [
  {
    id: "amex-gold-primary",
    cardType: "Amex Gold",
    lastFive: "12345", // Update with actual last 5 digits
    displayName: "Amex Gold",
    isActive: true
  },
  {
    id: "chase-sapphire-primary",
    cardType: "Chase Sapphire",
    lastFive: "67890", // Update with actual last 5 digits
    displayName: "Chase Sapphire",
    isActive: true
  },
  {
    id: "marriott-bonvoy-primary",
    cardType: "Bonvoy Business Amex",
    lastFive: "11111", // Update with actual last 5 digits
    displayName: "Marriott Bonvoy Business",
    isActive: true
  },
  {
    id: "amazon-prime-primary",
    cardType: "Amazon Prime",
    lastFive: "22222", // Update with actual last 5 digits
    displayName: "Amazon Business Prime",
    isActive: true
  }
]

// Helper functions for working with primary card data
export const getPrimaryCardByType = (cardType: string): PrimaryCardConfig | undefined => {
  return staticPrimaryCards.find(card => card.cardType === cardType && card.isActive)
}

export const getPrimaryCardByLastFive = (lastFive: string): PrimaryCardConfig | undefined => {
  return staticPrimaryCards.find(card => card.lastFive === lastFive && card.isActive)
}

export const isPrimaryCard = (cardType: string, lastFive: string): boolean => {
  return staticPrimaryCards.some(card => 
    card.cardType === cardType && 
    card.lastFive === lastFive && 
    card.isActive
  )
}

export const getActivePrimaryCards = (): PrimaryCardConfig[] => {
  return staticPrimaryCards.filter(card => card.isActive)
}

export const getPrimaryCardDisplayName = (cardType: string, lastFive: string): string => {
  const primaryCard = staticPrimaryCards.find(card => 
    card.cardType === cardType && 
    card.lastFive === lastFive && 
    card.isActive
  )
  return primaryCard ? primaryCard.displayName : cardType
}
