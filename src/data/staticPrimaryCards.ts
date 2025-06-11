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
  },
  {
    id: "amex-platinum-primary",
    cardType: "Amex Platinum",
    lastFive: "33333", // Update with actual last 5 digits
    displayName: "Amex Platinum",
    isActive: true
  },
  {
    id: "chase-freedom-primary",
    cardType: "Chase Freedom",
    lastFive: "44444", // Update with actual last 5 digits
    displayName: "Chase Freedom",
    isActive: true
  },
  {
    id: "citi-costco-primary",
    cardType: "Citi Costco",
    lastFive: "55555", // Update with actual last 5 digits
    displayName: "Citi Costco",
    isActive: true
  },
  {
    id: "discover-it-primary",
    cardType: "Discover It",
    lastFive: "66666", // Update with actual last 5 digits
    displayName: "Discover It",
    isActive: true
  },
  {
    id: "capital-one-venture-primary",
    cardType: "Capital One Venture",
    lastFive: "77777", // Update with actual last 5 digits
    displayName: "Capital One Venture",
    isActive: true
  },
  {
    id: "wells-fargo-propel-primary",
    cardType: "Wells Fargo Propel",
    lastFive: "88888", // Update with actual last 5 digits
    displayName: "Wells Fargo Propel",
    isActive: true
  },
  {
    id: "bank-of-america-travel-primary",
    cardType: "Bank of America Travel",
    lastFive: "99999", // Update with actual last 5 digits
    displayName: "Bank of America Travel",
    isActive: true
  },
  {
    id: "us-bank-altitude-primary",
    cardType: "US Bank Altitude",
    lastFive: "10101", // Update with actual last 5 digits
    displayName: "US Bank Altitude",
    isActive: true
  },
  {
    id: "barclays-arrival-primary",
    cardType: "Barclays Arrival",
    lastFive: "12121", // Update with actual last 5 digits
    displayName: "Barclays Arrival",
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
