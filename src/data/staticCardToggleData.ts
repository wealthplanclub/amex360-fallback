
// Static data file to store card toggle states
// This will persist the toggle states across page reloads using localStorage

const STORAGE_KEY = 'employee_card_toggle_states'

// Load initial state from localStorage
const loadToggleStates = (): Record<string, boolean> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

// Save state to localStorage
const saveToggleStates = (states: Record<string, boolean>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states))
  } catch {
    // Handle localStorage errors silently
  }
}

// Initialize with saved state
export let cardToggleStates: Record<string, boolean> = loadToggleStates()

// Function to update a card's toggle state
export const updateCardToggleState = (cardKey: string, isActive: boolean) => {
  cardToggleStates[cardKey] = isActive
  saveToggleStates(cardToggleStates)
}

// Function to get a card's toggle state
export const getCardToggleState = (cardKey: string): boolean => {
  return cardToggleStates[cardKey] || false
}

// Function to get all toggle states
export const getAllToggleStates = (): Record<string, boolean> => {
  return { ...cardToggleStates }
}
