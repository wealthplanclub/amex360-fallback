
// Static data file to store card toggle states
// This will persist the toggle states across page reloads
export let cardToggleStates: Record<string, boolean> = {}

// Function to update a card's toggle state
export const updateCardToggleState = (cardKey: string, isActive: boolean) => {
  cardToggleStates[cardKey] = isActive
}

// Function to get a card's toggle state
export const getCardToggleState = (cardKey: string): boolean => {
  return cardToggleStates[cardKey] || false
}

// Function to get all toggle states
export const getAllToggleStates = (): Record<string, boolean> => {
  return { ...cardToggleStates }
}
