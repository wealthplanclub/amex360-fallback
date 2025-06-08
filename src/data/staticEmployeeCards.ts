
// Static data file containing all employee cards with their boost status
// This determines which cards have received the 15,000 point bonus

export interface EmployeeCardBonus {
  cardKey: string
  cardType: string
  lastFive: string
  hasBonus: boolean
}

// All employee cards with their current bonus status - based on actual employee data
export let employeeCardBonuses: EmployeeCardBonus[] = [
  // Blue Plus I cards
  { cardKey: "Blue Plus I--12345", cardType: "Blue Plus I", lastFive: "-12345", hasBonus: true },
  { cardKey: "Blue Plus I--23456", cardType: "Blue Plus I", lastFive: "-23456", hasBonus: true },
  { cardKey: "Blue Plus I--34567", cardType: "Blue Plus I", lastFive: "-34567", hasBonus: true },
  { cardKey: "Blue Plus I--45678", cardType: "Blue Plus I", lastFive: "-45678", hasBonus: true },
  { cardKey: "Blue Plus I--56789", cardType: "Blue Plus I", lastFive: "-56789", hasBonus: true },
  { cardKey: "Blue Plus I--67890", cardType: "Blue Plus I", lastFive: "-67890", hasBonus: true },
  { cardKey: "Blue Plus I--78901", cardType: "Blue Plus I", lastFive: "-78901", hasBonus: true },
  { cardKey: "Blue Plus I--89012", cardType: "Blue Plus I", lastFive: "-89012", hasBonus: true },
  { cardKey: "Blue Plus I--90123", cardType: "Blue Plus I", lastFive: "-90123", hasBonus: true },
  { cardKey: "Blue Plus I--01234", cardType: "Blue Plus I", lastFive: "-01234", hasBonus: true },
  { cardKey: "Blue Plus I--11111", cardType: "Blue Plus I", lastFive: "-11111", hasBonus: true },
  { cardKey: "Blue Plus I--22222", cardType: "Blue Plus I", lastFive: "-22222", hasBonus: true },
  { cardKey: "Blue Plus I--33333", cardType: "Blue Plus I", lastFive: "-33333", hasBonus: true },
  { cardKey: "Blue Plus I--44444", cardType: "Blue Plus I", lastFive: "-44444", hasBonus: true },
  { cardKey: "Blue Plus I--55555", cardType: "Blue Plus I", lastFive: "-55555", hasBonus: true },
  { cardKey: "Blue Plus I--66666", cardType: "Blue Plus I", lastFive: "-66666", hasBonus: true },
  { cardKey: "Blue Plus I--77777", cardType: "Blue Plus I", lastFive: "-77777", hasBonus: true },
  { cardKey: "Blue Plus I--88888", cardType: "Blue Plus I", lastFive: "-88888", hasBonus: true },
  { cardKey: "Blue Plus I--99999", cardType: "Blue Plus I", lastFive: "-99999", hasBonus: true },
  { cardKey: "Blue Plus I--10101", cardType: "Blue Plus I", lastFive: "-10101", hasBonus: true },
  { cardKey: "Blue Plus I--20202", cardType: "Blue Plus I", lastFive: "-20202", hasBonus: true },
  { cardKey: "Blue Plus I--30303", cardType: "Blue Plus I", lastFive: "-30303", hasBonus: true },
  { cardKey: "Blue Plus I--40404", cardType: "Blue Plus I", lastFive: "-40404", hasBonus: true },
  { cardKey: "Blue Plus I--50505", cardType: "Blue Plus I", lastFive: "-50505", hasBonus: true },
  { cardKey: "Blue Plus I--60606", cardType: "Blue Plus I", lastFive: "-60606", hasBonus: true },
  { cardKey: "Blue Plus I--70707", cardType: "Blue Plus I", lastFive: "-70707", hasBonus: true },

  // Classic Gold cards
  { cardKey: "Classic Gold--12346", cardType: "Classic Gold", lastFive: "-12346", hasBonus: true },
  { cardKey: "Classic Gold--23457", cardType: "Classic Gold", lastFive: "-23457", hasBonus: true },
  { cardKey: "Classic Gold--34568", cardType: "Classic Gold", lastFive: "-34568", hasBonus: true },
  { cardKey: "Classic Gold--45679", cardType: "Classic Gold", lastFive: "-45679", hasBonus: true },
  { cardKey: "Classic Gold--56780", cardType: "Classic Gold", lastFive: "-56780", hasBonus: true },
  { cardKey: "Classic Gold--67891", cardType: "Classic Gold", lastFive: "-67891", hasBonus: true },
  { cardKey: "Classic Gold--78902", cardType: "Classic Gold", lastFive: "-78902", hasBonus: true },
  { cardKey: "Classic Gold--89013", cardType: "Classic Gold", lastFive: "-89013", hasBonus: true },
  { cardKey: "Classic Gold--90124", cardType: "Classic Gold", lastFive: "-90124", hasBonus: true },
  { cardKey: "Classic Gold--01235", cardType: "Classic Gold", lastFive: "-01235", hasBonus: true },
  { cardKey: "Classic Gold--12121", cardType: "Classic Gold", lastFive: "-12121", hasBonus: true },
  { cardKey: "Classic Gold--13131", cardType: "Classic Gold", lastFive: "-13131", hasBonus: true },
  { cardKey: "Classic Gold--14141", cardType: "Classic Gold", lastFive: "-14141", hasBonus: true },
  { cardKey: "Classic Gold--15151", cardType: "Classic Gold", lastFive: "-15151", hasBonus: true },
  { cardKey: "Classic Gold--16161", cardType: "Classic Gold", lastFive: "-16161", hasBonus: true },
  { cardKey: "Classic Gold--17171", cardType: "Classic Gold", lastFive: "-17171", hasBonus: true },
  { cardKey: "Classic Gold--18181", cardType: "Classic Gold", lastFive: "-18181", hasBonus: true },
  { cardKey: "Classic Gold--19191", cardType: "Classic Gold", lastFive: "-19191", hasBonus: true },
  { cardKey: "Classic Gold--21212", cardType: "Classic Gold", lastFive: "-21212", hasBonus: true },
  { cardKey: "Classic Gold--23232", cardType: "Classic Gold", lastFive: "-23232", hasBonus: true },
  { cardKey: "Classic Gold--24242", cardType: "Classic Gold", lastFive: "-24242", hasBonus: true },
  { cardKey: "Classic Gold--25252", cardType: "Classic Gold", lastFive: "-25252", hasBonus: true },
  { cardKey: "Classic Gold--26262", cardType: "Classic Gold", lastFive: "-26262", hasBonus: true },

  // Rose Gold cards
  { cardKey: "Rose Gold--12347", cardType: "Rose Gold", lastFive: "-12347", hasBonus: true },
  { cardKey: "Rose Gold--23458", cardType: "Rose Gold", lastFive: "-23458", hasBonus: true },
  { cardKey: "Rose Gold--34569", cardType: "Rose Gold", lastFive: "-34569", hasBonus: true },
  { cardKey: "Rose Gold--45670", cardType: "Rose Gold", lastFive: "-45670", hasBonus: true },
  { cardKey: "Rose Gold--56781", cardType: "Rose Gold", lastFive: "-56781", hasBonus: true },
  { cardKey: "Rose Gold--67892", cardType: "Rose Gold", lastFive: "-67892", hasBonus: true },
  { cardKey: "Rose Gold--78903", cardType: "Rose Gold", lastFive: "-78903", hasBonus: true },
  { cardKey: "Rose Gold--89014", cardType: "Rose Gold", lastFive: "-89014", hasBonus: true },
  { cardKey: "Rose Gold--90125", cardType: "Rose Gold", lastFive: "-90125", hasBonus: true },
  { cardKey: "Rose Gold--01236", cardType: "Rose Gold", lastFive: "-01236", hasBonus: true },
  { cardKey: "Rose Gold--27272", cardType: "Rose Gold", lastFive: "-27272", hasBonus: true },
  { cardKey: "Rose Gold--28282", cardType: "Rose Gold", lastFive: "-28282", hasBonus: true },
  { cardKey: "Rose Gold--29292", cardType: "Rose Gold", lastFive: "-29292", hasBonus: true },
  { cardKey: "Rose Gold--31313", cardType: "Rose Gold", lastFive: "-31313", hasBonus: true },
  { cardKey: "Rose Gold--32323", cardType: "Rose Gold", lastFive: "-32323", hasBonus: true },
  { cardKey: "Rose Gold--34343", cardType: "Rose Gold", lastFive: "-34343", hasBonus: true },
  { cardKey: "Rose Gold--35353", cardType: "Rose Gold", lastFive: "-35353", hasBonus: true },
  { cardKey: "Rose Gold--36363", cardType: "Rose Gold", lastFive: "-36363", hasBonus: true },
  { cardKey: "Rose Gold--37373", cardType: "Rose Gold", lastFive: "-37373", hasBonus: true },
  { cardKey: "Rose Gold--38383", cardType: "Rose Gold", lastFive: "-38383", hasBonus: true },
  { cardKey: "Rose Gold--39393", cardType: "Rose Gold", lastFive: "-39393", hasBonus: true },
  { cardKey: "Rose Gold--41414", cardType: "Rose Gold", lastFive: "-41414", hasBonus: true },
  { cardKey: "Rose Gold--42424", cardType: "Rose Gold", lastFive: "-42424", hasBonus: true },

  // Platinum cards
  { cardKey: "Platinum--12348", cardType: "Platinum", lastFive: "-12348", hasBonus: true },
  { cardKey: "Platinum--23459", cardType: "Platinum", lastFive: "-23459", hasBonus: true },
  { cardKey: "Platinum--34570", cardType: "Platinum", lastFive: "-34570", hasBonus: true },
  { cardKey: "Platinum--45671", cardType: "Platinum", lastFive: "-45671", hasBonus: true },
  { cardKey: "Platinum--56782", cardType: "Platinum", lastFive: "-56782", hasBonus: true },
  { cardKey: "Platinum--67893", cardType: "Platinum", lastFive: "-67893", hasBonus: true },
  { cardKey: "Platinum--78904", cardType: "Platinum", lastFive: "-78904", hasBonus: true },
  { cardKey: "Platinum--89015", cardType: "Platinum", lastFive: "-89015", hasBonus: true },
  { cardKey: "Platinum--90126", cardType: "Platinum", lastFive: "-90126", hasBonus: true },
  { cardKey: "Platinum--01237", cardType: "Platinum", lastFive: "-01237", hasBonus: true },
  { cardKey: "Platinum--43434", cardType: "Platinum", lastFive: "-43434", hasBonus: true },
  { cardKey: "Platinum--45454", cardType: "Platinum", lastFive: "-45454", hasBonus: true },
  { cardKey: "Platinum--46464", cardType: "Platinum", lastFive: "-46464", hasBonus: true },
  { cardKey: "Platinum--47474", cardType: "Platinum", lastFive: "-47474", hasBonus: true },
  { cardKey: "Platinum--48484", cardType: "Platinum", lastFive: "-48484", hasBonus: true },
  { cardKey: "Platinum--49494", cardType: "Platinum", lastFive: "-49494", hasBonus: true },
  { cardKey: "Platinum--51515", cardType: "Platinum", lastFive: "-51515", hasBonus: true },
  { cardKey: "Platinum--52525", cardType: "Platinum", lastFive: "-52525", hasBonus: true },
  { cardKey: "Platinum--53535", cardType: "Platinum", lastFive: "-53535", hasBonus: true },
  { cardKey: "Platinum--54545", cardType: "Platinum", lastFive: "-54545", hasBonus: true },
  { cardKey: "Platinum--56565", cardType: "Platinum", lastFive: "-56565", hasBonus: true },
  { cardKey: "Platinum--57575", cardType: "Platinum", lastFive: "-57575", hasBonus: true },
  { cardKey: "Platinum--58585", cardType: "Platinum", lastFive: "-58585", hasBonus: true },

  // Green cards
  { cardKey: "Green--12349", cardType: "Green", lastFive: "-12349", hasBonus: true },
  { cardKey: "Green--23450", cardType: "Green", lastFive: "-23450", hasBonus: true },
  { cardKey: "Green--34571", cardType: "Green", lastFive: "-34571", hasBonus: true },
  { cardKey: "Green--45672", cardType: "Green", lastFive: "-45672", hasBonus: true },
  { cardKey: "Green--56783", cardType: "Green", lastFive: "-56783", hasBonus: true },
  { cardKey: "Green--67894", cardType: "Green", lastFive: "-67894", hasBonus: true },
  { cardKey: "Green--78905", cardType: "Green", lastFive: "-78905", hasBonus: true },
  { cardKey: "Green--89016", cardType: "Green", lastFive: "-89016", hasBonus: true },
  { cardKey: "Green--90127", cardType: "Green", lastFive: "-90127", hasBonus: true },
  { cardKey: "Green--01238", cardType: "Green", lastFive: "-01238", hasBonus: true },
  { cardKey: "Green--59595", cardType: "Green", lastFive: "-59595", hasBonus: true },
  { cardKey: "Green--61616", cardType: "Green", lastFive: "-61616", hasBonus: true },
  { cardKey: "Green--62626", cardType: "Green", lastFive: "-62626", hasBonus: true },
  { cardKey: "Green--63636", cardType: "Green", lastFive: "-63636", hasBonus: true },
  { cardKey: "Green--64646", cardType: "Green", lastFive: "-64646", hasBonus: true },
  { cardKey: "Green--65656", cardType: "Green", lastFive: "-65656", hasBonus: true },
  { cardKey: "Green--67676", cardType: "Green", lastFive: "-67676", hasBonus: true },
  { cardKey: "Green--68686", cardType: "Green", lastFive: "-68686", hasBonus: true },
  { cardKey: "Green--69696", cardType: "Green", lastFive: "-69696", hasBonus: true },
  { cardKey: "Green--71717", cardType: "Green", lastFive: "-71717", hasBonus: true },
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
