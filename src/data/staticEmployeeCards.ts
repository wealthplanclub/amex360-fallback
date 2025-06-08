// Static data file containing all employee cards with their boost status
// This determines which cards have received the 15,000 point bonus

export interface EmployeeCardBonus {
  cardKey: string
  cardType: string
  lastFive: string
  hasBonus: boolean
}

// All employee cards with their current bonus status - organized by card type and sorted by last five digits
export let employeeCardBonuses: EmployeeCardBonus[] = [
  // Blue Plus I cards - sorted by last five digits in ascending order
  { cardKey: "Blue Plus I--01000", cardType: "Blue Plus I", lastFive: "-01000", hasBonus: false },
  { cardKey: "Blue Plus I--01018", cardType: "Blue Plus I", lastFive: "-01018", hasBonus: true },
  { cardKey: "Blue Plus I--01026", cardType: "Blue Plus I", lastFive: "-01026", hasBonus: true },
  { cardKey: "Blue Plus I--01067", cardType: "Blue Plus I", lastFive: "-01067", hasBonus: true },
  { cardKey: "Blue Plus I--01075", cardType: "Blue Plus I", lastFive: "-01075", hasBonus: true },
  { cardKey: "Blue Plus I--01083", cardType: "Blue Plus I", lastFive: "-01083", hasBonus: true },
  { cardKey: "Blue Plus I--01091", cardType: "Blue Plus I", lastFive: "-01091", hasBonus: true },
  { cardKey: "Blue Plus I--01109", cardType: "Blue Plus I", lastFive: "-01109", hasBonus: true },
  { cardKey: "Blue Plus I--01117", cardType: "Blue Plus I", lastFive: "-01117", hasBonus: true },
  { cardKey: "Blue Plus I--01125", cardType: "Blue Plus I", lastFive: "-01125", hasBonus: true },
  { cardKey: "Blue Plus I--01141", cardType: "Blue Plus I", lastFive: "-01141", hasBonus: true },
  { cardKey: "Blue Plus I--01158", cardType: "Blue Plus I", lastFive: "-01158", hasBonus: true },

  // Blue Plus II cards - sorted by last five digits in ascending order
  { cardKey: "Blue Plus II--11009", cardType: "Blue Plus II", lastFive: "-11009", hasBonus: true },
  { cardKey: "Blue Plus II--11017", cardType: "Blue Plus II", lastFive: "-11017", hasBonus: true },
  { cardKey: "Blue Plus II--11025", cardType: "Blue Plus II", lastFive: "-11025", hasBonus: true },
  { cardKey: "Blue Plus II--11033", cardType: "Blue Plus II", lastFive: "-11033", hasBonus: true },
  { cardKey: "Blue Plus II--11041", cardType: "Blue Plus II", lastFive: "-11041", hasBonus: false },
  { cardKey: "Blue Plus II--11058", cardType: "Blue Plus II", lastFive: "-11058", hasBonus: false },
  
  // Classic Gold cards - sorted by last five digits in ascending order
  { cardKey: "Classic Gold--71051", cardType: "Classic Gold", lastFive: "-71051", hasBonus: true },
  { cardKey: "Classic Gold--72067", cardType: "Classic Gold", lastFive: "-72067", hasBonus: true },
  { cardKey: "Classic Gold--72075", cardType: "Classic Gold", lastFive: "-72075", hasBonus: true },
  { cardKey: "Classic Gold--72083", cardType: "Classic Gold", lastFive: "-72083", hasBonus: true },
  { cardKey: "Classic Gold--72091", cardType: "Classic Gold", lastFive: "-72091", hasBonus: true },
  { cardKey: "Classic Gold--72109", cardType: "Classic Gold", lastFive: "-72109", hasBonus: true },
  { cardKey: "Classic Gold--72117", cardType: "Classic Gold", lastFive: "-72117", hasBonus: true },
  { cardKey: "Classic Gold--72125", cardType: "Classic Gold", lastFive: "-72125", hasBonus: true },
  { cardKey: "Classic Gold--72133", cardType: "Classic Gold", lastFive: "-72133", hasBonus: true },
  { cardKey: "Classic Gold--72141", cardType: "Classic Gold", lastFive: "-72141", hasBonus: true },
  { cardKey: "Classic Gold--72158", cardType: "Classic Gold", lastFive: "-72158", hasBonus: true },

  // Green cards - sorted by last five digits in ascending order
  { cardKey: "Green--81017", cardType: "Green", lastFive: "-81017", hasBonus: true },
  { cardKey: "Green--81025", cardType: "Green", lastFive: "-81025", hasBonus: true },
  { cardKey: "Green--81041", cardType: "Green", lastFive: "-81041", hasBonus: true },
  { cardKey: "Green--81058", cardType: "Green", lastFive: "-81058", hasBonus: true },

  // Platinum cards - sorted by last five digits in ascending order
  { cardKey: "Platinum--51017", cardType: "Platinum", lastFive: "-51017", hasBonus: true },
  { cardKey: "Platinum--51074", cardType: "Platinum", lastFive: "-51074", hasBonus: true },
  { cardKey: "Platinum--51090", cardType: "Platinum", lastFive: "-51090", hasBonus: true },
  { cardKey: "Platinum--51108", cardType: "Platinum", lastFive: "-51108", hasBonus: true },
  { cardKey: "Platinum--51116", cardType: "Platinum", lastFive: "-51116", hasBonus: true },
  { cardKey: "Platinum--52122", cardType: "Platinum", lastFive: "-52122", hasBonus: true },
  { cardKey: "Platinum--52130", cardType: "Platinum", lastFive: "-52130", hasBonus: true },
  { cardKey: "Platinum--52148", cardType: "Platinum", lastFive: "-52148", hasBonus: true },
  { cardKey: "Platinum--52163", cardType: "Platinum", lastFive: "-52163", hasBonus: true },
  { cardKey: "Platinum--52171", cardType: "Platinum", lastFive: "-52171", hasBonus: true },
  { cardKey: "Platinum--52189", cardType: "Platinum", lastFive: "-52189", hasBonus: true },
  { cardKey: "Platinum--52197", cardType: "Platinum", lastFive: "-52197", hasBonus: true },
  { cardKey: "Platinum--52205", cardType: "Platinum", lastFive: "-52205", hasBonus: true },
  { cardKey: "Platinum--52213", cardType: "Platinum", lastFive: "-52213", hasBonus: true },
  { cardKey: "Platinum--52221", cardType: "Platinum", lastFive: "-52221", hasBonus: true },
  { cardKey: "Platinum--52247", cardType: "Platinum", lastFive: "-52247", hasBonus: true },
  { cardKey: "Platinum--52254", cardType: "Platinum", lastFive: "-52254", hasBonus: true },

  // Rose Gold cards - sorted by last five digits in ascending order
  { cardKey: "Rose Gold--01018", cardType: "Rose Gold", lastFive: "-01018", hasBonus: true },
  { cardKey: "Rose Gold--01026", cardType: "Rose Gold", lastFive: "-01026", hasBonus: true },
  { cardKey: "Rose Gold--01034", cardType: "Rose Gold", lastFive: "-01034", hasBonus: true },
  { cardKey: "Rose Gold--01042", cardType: "Rose Gold", lastFive: "-01042", hasBonus: true },
  { cardKey: "Rose Gold--01059", cardType: "Rose Gold", lastFive: "-01059", hasBonus: true },
  { cardKey: "Rose Gold--01067", cardType: "Rose Gold", lastFive: "-01067", hasBonus: true },
  { cardKey: "Rose Gold--01075", cardType: "Rose Gold", lastFive: "-01075", hasBonus: true },
  { cardKey: "Rose Gold--01083", cardType: "Rose Gold", lastFive: "-01083", hasBonus: true },
  { cardKey: "Rose Gold--01091", cardType: "Rose Gold", lastFive: "-01091", hasBonus: true },
  { cardKey: "Rose Gold--01109", cardType: "Rose Gold", lastFive: "-01109", hasBonus: true },
  { cardKey: "Rose Gold--01117", cardType: "Rose Gold", lastFive: "-01117", hasBonus: true },
  { cardKey: "Rose Gold--01125", cardType: "Rose Gold", lastFive: "-01125", hasBonus: true },
  { cardKey: "Rose Gold--01133", cardType: "Rose Gold", lastFive: "-01133", hasBonus: true },
  { cardKey: "Rose Gold--01141", cardType: "Rose Gold", lastFive: "-01141", hasBonus: true },
  { cardKey: "Rose Gold--01158", cardType: "Rose Gold", lastFive: "-01158", hasBonus: true },
  { cardKey: "Rose Gold--01166", cardType: "Rose Gold", lastFive: "-01166", hasBonus: true },
  { cardKey: "Rose Gold--01174", cardType: "Rose Gold", lastFive: "-01174", hasBonus: true },
  { cardKey: "Rose Gold--01182", cardType: "Rose Gold", lastFive: "-01182", hasBonus: true },
  { cardKey: "Rose Gold--01190", cardType: "Rose Gold", lastFive: "-01190", hasBonus: true },
  { cardKey: "Rose Gold--01208", cardType: "Rose Gold", lastFive: "-01208", hasBonus: true },
  { cardKey: "Rose Gold--01216", cardType: "Rose Gold", lastFive: "-01216", hasBonus: true },
  { cardKey: "Rose Gold--01224", cardType: "Rose Gold", lastFive: "-01224", hasBonus: true },
  { cardKey: "Rose Gold--01232", cardType: "Rose Gold", lastFive: "-01232", hasBonus: true },
  { cardKey: "Rose Gold--01240", cardType: "Rose Gold", lastFive: "-01240", hasBonus: true },
  { cardKey: "Rose Gold--01257", cardType: "Rose Gold", lastFive: "-01257", hasBonus: true },
  { cardKey: "Rose Gold--01265", cardType: "Rose Gold", lastFive: "-01265", hasBonus: true },
  { cardKey: "Rose Gold--01273", cardType: "Rose Gold", lastFive: "-01273", hasBonus: true },
  { cardKey: "Rose Gold--01281", cardType: "Rose Gold", lastFive: "-01281", hasBonus: true },
  { cardKey: "Rose Gold--01299", cardType: "Rose Gold", lastFive: "-01299", hasBonus: true },
  { cardKey: "Rose Gold--01307", cardType: "Rose Gold", lastFive: "-01307", hasBonus: true },

  // White Gold cards - sorted by last five digits in ascending order
  { cardKey: "White Gold--41018", cardType: "White Gold", lastFive: "-41018", hasBonus: true },
  { cardKey: "White Gold--41026", cardType: "White Gold", lastFive: "-41026", hasBonus: true },
  { cardKey: "White Gold--41034", cardType: "White Gold", lastFive: "-41034", hasBonus: true },
  { cardKey: "White Gold--41042", cardType: "White Gold", lastFive: "-41042", hasBonus: true },
  { cardKey: "White Gold--41059", cardType: "White Gold", lastFive: "-41059", hasBonus: true },
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
