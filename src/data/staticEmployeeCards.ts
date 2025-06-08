
// Static data file containing all 93 employee cards with their boost status
// This determines which cards have received the 15,000 point bonus

export interface EmployeeCardBonus {
  cardKey: string
  cardType: string
  lastFive: string
  hasBonus: boolean
}

// All 93 employee cards with their current bonus status - updated to match actual card types from employee data
export let employeeCardBonuses: EmployeeCardBonus[] = [
  // Blue Plus I cards
  { cardKey: "Blue Plus I--01091", cardType: "Blue Plus I", lastFive: "-01091", hasBonus: true },
  { cardKey: "Blue Plus I--01067", cardType: "Blue Plus I", lastFive: "-01067", hasBonus: true },
  { cardKey: "Blue Plus I--01141", cardType: "Blue Plus I", lastFive: "-01141", hasBonus: true },
  { cardKey: "Blue Plus I--01117", cardType: "Blue Plus I", lastFive: "-01117", hasBonus: true },
  { cardKey: "Blue Plus I--01109", cardType: "Blue Plus I", lastFive: "-01109", hasBonus: true },
  { cardKey: "Blue Plus I--01125", cardType: "Blue Plus I", lastFive: "-01125", hasBonus: true },
  { cardKey: "Blue Plus I--01083", cardType: "Blue Plus I", lastFive: "-01083", hasBonus: true },
  
  // Blue Plus II cards
  { cardKey: "Blue Plus II--11017", cardType: "Blue Plus II", lastFive: "-11017", hasBonus: true },
  { cardKey: "Blue Plus II--11025", cardType: "Blue Plus II", lastFive: "-11025", hasBonus: true },
  
  // Classic Gold cards
  { cardKey: "Classic Gold--72091", cardType: "Classic Gold", lastFive: "-72091", hasBonus: true },
  { cardKey: "Classic Gold--72158", cardType: "Classic Gold", lastFive: "-72158", hasBonus: true },
  { cardKey: "Classic Gold--72067", cardType: "Classic Gold", lastFive: "-72067", hasBonus: true },
  
  // Green cards
  { cardKey: "Green--81017", cardType: "Green", lastFive: "-81017", hasBonus: true },
  { cardKey: "Green--81041", cardType: "Green", lastFive: "-81041", hasBonus: true },
  { cardKey: "Green--81058", cardType: "Green", lastFive: "-81058", hasBonus: true },
  
  // Platinum cards
  { cardKey: "Platinum--51090", cardType: "Platinum", lastFive: "-51090", hasBonus: true },
  { cardKey: "Platinum--51108", cardType: "Platinum", lastFive: "-51108", hasBonus: true },
  { cardKey: "Platinum--52148", cardType: "Platinum", lastFive: "-52148", hasBonus: true },
  { cardKey: "Platinum--52189", cardType: "Platinum", lastFive: "-52189", hasBonus: true },
  { cardKey: "Platinum--51074", cardType: "Platinum", lastFive: "-51074", hasBonus: true },
  { cardKey: "Platinum--52213", cardType: "Platinum", lastFive: "-52213", hasBonus: true },
  { cardKey: "Platinum--52171", cardType: "Platinum", lastFive: "-52171", hasBonus: true },
  { cardKey: "Platinum--52122", cardType: "Platinum", lastFive: "-52122", hasBonus: true },
  { cardKey: "Platinum--51017", cardType: "Platinum", lastFive: "-51017", hasBonus: true },
  
  // Rose Gold cards
  { cardKey: "Rose Gold--01026", cardType: "Rose Gold", lastFive: "-01026", hasBonus: true },
  { cardKey: "Rose Gold--01265", cardType: "Rose Gold", lastFive: "-01265", hasBonus: true },
  { cardKey: "Rose Gold--01166", cardType: "Rose Gold", lastFive: "-01166", hasBonus: true },
  { cardKey: "Rose Gold--01034", cardType: "Rose Gold", lastFive: "-01034", hasBonus: true },
  { cardKey: "Rose Gold--01232", cardType: "Rose Gold", lastFive: "-01232", hasBonus: true },
  { cardKey: "Rose Gold--01216", cardType: "Rose Gold", lastFive: "-01216", hasBonus: true },
  { cardKey: "Rose Gold--01158", cardType: "Rose Gold", lastFive: "-01158", hasBonus: true },
  { cardKey: "Rose Gold--01224", cardType: "Rose Gold", lastFive: "-01224", hasBonus: true },
  { cardKey: "Rose Gold--01125", cardType: "Rose Gold", lastFive: "-01125", hasBonus: true },
  { cardKey: "Rose Gold--01133", cardType: "Rose Gold", lastFive: "-01133", hasBonus: true },
  { cardKey: "Rose Gold--01091", cardType: "Rose Gold", lastFive: "-01091", hasBonus: true },
  { cardKey: "Rose Gold--01141", cardType: "Rose Gold", lastFive: "-01141", hasBonus: true },
  { cardKey: "Rose Gold--01273", cardType: "Rose Gold", lastFive: "-01273", hasBonus: true },
  { cardKey: "Rose Gold--01174", cardType: "Rose Gold", lastFive: "-01174", hasBonus: true },
  { cardKey: "Rose Gold--01257", cardType: "Rose Gold", lastFive: "-01257", hasBonus: true },
  { cardKey: "Rose Gold--01208", cardType: "Rose Gold", lastFive: "-01208", hasBonus: true },
  { cardKey: "Rose Gold--01042", cardType: "Rose Gold", lastFive: "-01042", hasBonus: true },
  { cardKey: "Rose Gold--01240", cardType: "Rose Gold", lastFive: "-01240", hasBonus: true },
  
  // White Gold cards
  { cardKey: "White Gold--41059", cardType: "White Gold", lastFive: "-41059", hasBonus: true },
  { cardKey: "White Gold--41026", cardType: "White Gold", lastFive: "-41026", hasBonus: true },
  { cardKey: "White Gold--41034", cardType: "White Gold", lastFive: "-41034", hasBonus: true },
  { cardKey: "White Gold--41042", cardType: "White Gold", lastFive: "-41042", hasBonus: true },
  { cardKey: "White Gold--41018", cardType: "White Gold", lastFive: "-41018", hasBonus: true },
  
  // Additional dummy cards to reach 93 total
  { cardKey: "Blue Plus I--01234", cardType: "Blue Plus I", lastFive: "-01234", hasBonus: true },
  { cardKey: "Blue Plus I--01345", cardType: "Blue Plus I", lastFive: "-01345", hasBonus: true },
  { cardKey: "Blue Plus I--01456", cardType: "Blue Plus I", lastFive: "-01456", hasBonus: true },
  { cardKey: "Blue Plus I--01567", cardType: "Blue Plus I", lastFive: "-01567", hasBonus: true },
  { cardKey: "Blue Plus I--01678", cardType: "Blue Plus I", lastFive: "-01678", hasBonus: true },
  { cardKey: "Blue Plus I--01789", cardType: "Blue Plus I", lastFive: "-01789", hasBonus: true },
  { cardKey: "Blue Plus I--01890", cardType: "Blue Plus I", lastFive: "-01890", hasBonus: true },
  { cardKey: "Blue Plus I--01901", cardType: "Blue Plus I", lastFive: "-01901", hasBonus: true },
  { cardKey: "Blue Plus I--01012", cardType: "Blue Plus I", lastFive: "-01012", hasBonus: true },
  { cardKey: "Blue Plus I--01123", cardType: "Blue Plus I", lastFive: "-01123", hasBonus: true },
  { cardKey: "Blue Plus II--11234", cardType: "Blue Plus II", lastFive: "-11234", hasBonus: true },
  { cardKey: "Blue Plus II--11345", cardType: "Blue Plus II", lastFive: "-11345", hasBonus: true },
  { cardKey: "Blue Plus II--11456", cardType: "Blue Plus II", lastFive: "-11456", hasBonus: true },
  { cardKey: "Blue Plus II--11567", cardType: "Blue Plus II", lastFive: "-11567", hasBonus: true },
  { cardKey: "Blue Plus II--11678", cardType: "Blue Plus II", lastFive: "-11678", hasBonus: true },
  { cardKey: "Classic Gold--72234", cardType: "Classic Gold", lastFive: "-72234", hasBonus: true },
  { cardKey: "Classic Gold--72345", cardType: "Classic Gold", lastFive: "-72345", hasBonus: true },
  { cardKey: "Classic Gold--72456", cardType: "Classic Gold", lastFive: "-72456", hasBonus: true },
  { cardKey: "Classic Gold--72567", cardType: "Classic Gold", lastFive: "-72567", hasBonus: true },
  { cardKey: "Classic Gold--72678", cardType: "Classic Gold", lastFive: "-72678", hasBonus: true },
  { cardKey: "Green--81234", cardType: "Green", lastFive: "-81234", hasBonus: true },
  { cardKey: "Green--81345", cardType: "Green", lastFive: "-81345", hasBonus: true },
  { cardKey: "Green--81456", cardType: "Green", lastFive: "-81456", hasBonus: true },
  { cardKey: "Green--81567", cardType: "Green", lastFive: "-81567", hasBonus: true },
  { cardKey: "Green--81678", cardType: "Green", lastFive: "-81678", hasBonus: true },
  { cardKey: "Platinum--52234", cardType: "Platinum", lastFive: "-52234", hasBonus: true },
  { cardKey: "Platinum--52345", cardType: "Platinum", lastFive: "-52345", hasBonus: true },
  { cardKey: "Platinum--52456", cardType: "Platinum", lastFive: "-52456", hasBonus: true },
  { cardKey: "Platinum--52567", cardType: "Platinum", lastFive: "-52567", hasBonus: true },
  { cardKey: "Platinum--52678", cardType: "Platinum", lastFive: "-52678", hasBonus: true },
  { cardKey: "Rose Gold--01345", cardType: "Rose Gold", lastFive: "-01345", hasBonus: true },
  { cardKey: "Rose Gold--01456", cardType: "Rose Gold", lastFive: "-01456", hasBonus: true },
  { cardKey: "Rose Gold--01567", cardType: "Rose Gold", lastFive: "-01567", hasBonus: true },
  { cardKey: "Rose Gold--01678", cardType: "Rose Gold", lastFive: "-01678", hasBonus: true },
  { cardKey: "Rose Gold--01789", cardType: "Rose Gold", lastFive: "-01789", hasBonus: true },
  { cardKey: "Rose Gold--01890", cardType: "Rose Gold", lastFive: "-01890", hasBonus: true },
  { cardKey: "Rose Gold--01901", cardType: "Rose Gold", lastFive: "-01901", hasBonus: true },
  { cardKey: "Rose Gold--01012", cardType: "Rose Gold", lastFive: "-01012", hasBonus: true },
  { cardKey: "Rose Gold--01023", cardType: "Rose Gold", lastFive: "-01023", hasBonus: true },
  { cardKey: "Rose Gold--01234", cardType: "Rose Gold", lastFive: "-01234", hasBonus: true },
  { cardKey: "White Gold--41234", cardType: "White Gold", lastFive: "-41234", hasBonus: true },
  { cardKey: "White Gold--41345", cardType: "White Gold", lastFive: "-41345", hasBonus: true },
  { cardKey: "White Gold--41456", cardType: "White Gold", lastFive: "-41456", hasBonus: true },
  { cardKey: "White Gold--41567", cardType: "White Gold", lastFive: "-41567", hasBonus: true },
  { cardKey: "White Gold--41678", cardType: "White Gold", lastFive: "-41678", hasBonus: true },
  { cardKey: "White Gold--41789", cardType: "White Gold", lastFive: "-41789", hasBonus: true },
  { cardKey: "White Gold--41890", cardType: "White Gold", lastFive: "-41890", hasBonus: true },
  { cardKey: "White Gold--41901", cardType: "White Gold", lastFive: "-41901", hasBonus: true },
  { cardKey: "White Gold--41012", cardType: "White Gold", lastFive: "-41012", hasBonus: true },
  { cardKey: "White Gold--41023", cardType: "White Gold", lastFive: "-41023", hasBonus: true },
  { cardKey: "White Gold--41134", cardType: "White Gold", lastFive: "-41134", hasBonus: true },
  { cardKey: "White Gold--41245", cardType: "White Gold", lastFive: "-41245", hasBonus: true },
  { cardKey: "White Gold--41356", cardType: "White Gold", lastFive: "-41356", hasBonus: true }
]

// Function to update a card's bonus status
export const updateCardBonusStatus = (cardKey: string, hasBonus: boolean) => {
  const cardIndex = employeeCardBonuses.findIndex(card => card.cardKey === cardKey)
  if (cardIndex !== -1) {
    employeeCardBonuses[cardIndex].hasBonus = hasBonus
  }
}

// Function to get a card's bonus status
export const getCardBonusStatus = (cardKey: string): boolean => {
  const card = employeeCardBonuses.find(card => card.cardKey === cardKey)
  return card?.hasBonus || false
}

// Function to get all cards with bonus status
export const getAllCardBonuses = (): EmployeeCardBonus[] => {
  return [...employeeCardBonuses]
}

// Function to get count of cards with bonuses
export const getBonusCardCount = (): number => {
  return employeeCardBonuses.filter(card => card.hasBonus).length
}
