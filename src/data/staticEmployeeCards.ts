
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
  // American Express cards
  { cardKey: "American Express--12345", cardType: "American Express", lastFive: "-12345", hasBonus: true },
  { cardKey: "American Express--23456", cardType: "American Express", lastFive: "-23456", hasBonus: true },
  { cardKey: "American Express--34567", cardType: "American Express", lastFive: "-34567", hasBonus: true },
  { cardKey: "American Express--45678", cardType: "American Express", lastFive: "-45678", hasBonus: true },
  { cardKey: "American Express--56789", cardType: "American Express", lastFive: "-56789", hasBonus: true },
  { cardKey: "American Express--67890", cardType: "American Express", lastFive: "-67890", hasBonus: true },
  { cardKey: "American Express--78901", cardType: "American Express", lastFive: "-78901", hasBonus: true },
  { cardKey: "American Express--89012", cardType: "American Express", lastFive: "-89012", hasBonus: true },
  { cardKey: "American Express--90123", cardType: "American Express", lastFive: "-90123", hasBonus: true },
  { cardKey: "American Express--01234", cardType: "American Express", lastFive: "-01234", hasBonus: true },
  { cardKey: "American Express--11111", cardType: "American Express", lastFive: "-11111", hasBonus: true },
  { cardKey: "American Express--22222", cardType: "American Express", lastFive: "-22222", hasBonus: true },
  { cardKey: "American Express--33333", cardType: "American Express", lastFive: "-33333", hasBonus: true },
  { cardKey: "American Express--44444", cardType: "American Express", lastFive: "-44444", hasBonus: true },
  { cardKey: "American Express--55555", cardType: "American Express", lastFive: "-55555", hasBonus: true },
  { cardKey: "American Express--66666", cardType: "American Express", lastFive: "-66666", hasBonus: true },
  { cardKey: "American Express--77777", cardType: "American Express", lastFive: "-77777", hasBonus: true },
  { cardKey: "American Express--88888", cardType: "American Express", lastFive: "-88888", hasBonus: true },
  { cardKey: "American Express--99999", cardType: "American Express", lastFive: "-99999", hasBonus: true },
  { cardKey: "American Express--10101", cardType: "American Express", lastFive: "-10101", hasBonus: true },
  { cardKey: "American Express--20202", cardType: "American Express", lastFive: "-20202", hasBonus: true },
  { cardKey: "American Express--30303", cardType: "American Express", lastFive: "-30303", hasBonus: true },
  { cardKey: "American Express--40404", cardType: "American Express", lastFive: "-40404", hasBonus: true },
  { cardKey: "American Express--50505", cardType: "American Express", lastFive: "-50505", hasBonus: true },
  { cardKey: "American Express--60606", cardType: "American Express", lastFive: "-60606", hasBonus: true },
  { cardKey: "American Express--70707", cardType: "American Express", lastFive: "-70707", hasBonus: true },
  { cardKey: "American Express--80808", cardType: "American Express", lastFive: "-80808", hasBonus: true },
  { cardKey: "American Express--90909", cardType: "American Express", lastFive: "-90909", hasBonus: true },
  { cardKey: "American Express--12121", cardType: "American Express", lastFive: "-12121", hasBonus: true },
  { cardKey: "American Express--13131", cardType: "American Express", lastFive: "-13131", hasBonus: true },
  { cardKey: "American Express--14141", cardType: "American Express", lastFive: "-14141", hasBonus: true },
  { cardKey: "American Express--15151", cardType: "American Express", lastFive: "-15151", hasBonus: true },
  { cardKey: "American Express--16161", cardType: "American Express", lastFive: "-16161", hasBonus: true },
  { cardKey: "American Express--17171", cardType: "American Express", lastFive: "-17171", hasBonus: true },
  { cardKey: "American Express--18181", cardType: "American Express", lastFive: "-18181", hasBonus: true },
  { cardKey: "American Express--19191", cardType: "American Express", lastFive: "-19191", hasBonus: true },
  { cardKey: "American Express--21212", cardType: "American Express", lastFive: "-21212", hasBonus: true },
  { cardKey: "American Express--23232", cardType: "American Express", lastFive: "-23232", hasBonus: true },
  { cardKey: "American Express--24242", cardType: "American Express", lastFive: "-24242", hasBonus: true },
  { cardKey: "American Express--25252", cardType: "American Express", lastFive: "-25252", hasBonus: true },
  { cardKey: "American Express--26262", cardType: "American Express", lastFive: "-26262", hasBonus: true },
  { cardKey: "American Express--27272", cardType: "American Express", lastFive: "-27272", hasBonus: true },
  { cardKey: "American Express--28282", cardType: "American Express", lastFive: "-28282", hasBonus: true },
  { cardKey: "American Express--29292", cardType: "American Express", lastFive: "-29292", hasBonus: true },
  { cardKey: "American Express--31313", cardType: "American Express", lastFive: "-31313", hasBonus: true },
  { cardKey: "American Express--32323", cardType: "American Express", lastFive: "-32323", hasBonus: true },
  { cardKey: "American Express--34343", cardType: "American Express", lastFive: "-34343", hasBonus: true },
  { cardKey: "American Express--35353", cardType: "American Express", lastFive: "-35353", hasBonus: true },
  { cardKey: "American Express--36363", cardType: "American Express", lastFive: "-36363", hasBonus: true },
  { cardKey: "American Express--37373", cardType: "American Express", lastFive: "-37373", hasBonus: true },
  { cardKey: "American Express--38383", cardType: "American Express", lastFive: "-38383", hasBonus: true },
  { cardKey: "American Express--39393", cardType: "American Express", lastFive: "-39393", hasBonus: true },
  { cardKey: "American Express--41414", cardType: "American Express", lastFive: "-41414", hasBonus: true },
  { cardKey: "American Express--42424", cardType: "American Express", lastFive: "-42424", hasBonus: true },
  { cardKey: "American Express--43434", cardType: "American Express", lastFive: "-43434", hasBonus: true },
  { cardKey: "American Express--45454", cardType: "American Express", lastFive: "-45454", hasBonus: true },
  { cardKey: "American Express--46464", cardType: "American Express", lastFive: "-46464", hasBonus: true },
  { cardKey: "American Express--47474", cardType: "American Express", lastFive: "-47474", hasBonus: true },
  { cardKey: "American Express--48484", cardType: "American Express", lastFive: "-48484", hasBonus: true },
  { cardKey: "American Express--49494", cardType: "American Express", lastFive: "-49494", hasBonus: true },
  { cardKey: "American Express--51515", cardType: "American Express", lastFive: "-51515", hasBonus: true },
  { cardKey: "American Express--52525", cardType: "American Express", lastFive: "-52525", hasBonus: true },
  { cardKey: "American Express--53535", cardType: "American Express", lastFive: "-53535", hasBonus: true },
  { cardKey: "American Express--54545", cardType: "American Express", lastFive: "-54545", hasBonus: true },
  { cardKey: "American Express--56565", cardType: "American Express", lastFive: "-56565", hasBonus: true },
  { cardKey: "American Express--57575", cardType: "American Express", lastFive: "-57575", hasBonus: true },
  { cardKey: "American Express--58585", cardType: "American Express", lastFive: "-58585", hasBonus: true },
  { cardKey: "American Express--59595", cardType: "American Express", lastFive: "-59595", hasBonus: true },
  { cardKey: "American Express--61616", cardType: "American Express", lastFive: "-61616", hasBonus: true },
  { cardKey: "American Express--62626", cardType: "American Express", lastFive: "-62626", hasBonus: true },
  { cardKey: "American Express--63636", cardType: "American Express", lastFive: "-63636", hasBonus: true },
  { cardKey: "American Express--64646", cardType: "American Express", lastFive: "-64646", hasBonus: true },
  { cardKey: "American Express--65656", cardType: "American Express", lastFive: "-65656", hasBonus: true },
  { cardKey: "American Express--67676", cardType: "American Express", lastFive: "-67676", hasBonus: true },
  { cardKey: "American Express--68686", cardType: "American Express", lastFive: "-68686", hasBonus: true },
  { cardKey: "American Express--69696", cardType: "American Express", lastFive: "-69696", hasBonus: true },
  { cardKey: "American Express--71717", cardType: "American Express", lastFive: "-71717", hasBonus: true },
  { cardKey: "American Express--72727", cardType: "American Express", lastFive: "-72727", hasBonus: true },
  { cardKey: "American Express--73737", cardType: "American Express", lastFive: "-73737", hasBonus: true },
  { cardKey: "American Express--74747", cardType: "American Express", lastFive: "-74747", hasBonus: true },
  { cardKey: "American Express--75757", cardType: "American Express", lastFive: "-75757", hasBonus: true },
  { cardKey: "American Express--76767", cardType: "American Express", lastFive: "-76767", hasBonus: true },
  { cardKey: "American Express--78787", cardType: "American Express", lastFive: "-78787", hasBonus: true },
  { cardKey: "American Express--79797", cardType: "American Express", lastFive: "-79797", hasBonus: true },
  { cardKey: "American Express--81818", cardType: "American Express", lastFive: "-81818", hasBonus: true },
  { cardKey: "American Express--82828", cardType: "American Express", lastFive: "-82828", hasBonus: true },
  { cardKey: "American Express--83838", cardType: "American Express", lastFive: "-83838", hasBonus: true },
  { cardKey: "American Express--84848", cardType: "American Express", lastFive: "-84848", hasBonus: true },
  { cardKey: "American Express--85858", cardType: "American Express", lastFive: "-85858", hasBonus: true },
  { cardKey: "American Express--86868", cardType: "American Express", lastFive: "-86868", hasBonus: true },
  { cardKey: "American Express--87878", cardType: "American Express", lastFive: "-87878", hasBonus: true },
  { cardKey: "American Express--89898", cardType: "American Express", lastFive: "-89898", hasBonus: true },
  { cardKey: "American Express--91919", cardType: "American Express", lastFive: "-91919", hasBonus: true },
  { cardKey: "American Express--92929", cardType: "American Express", lastFive: "-92929", hasBonus: true },
  { cardKey: "American Express--93939", cardType: "American Express", lastFive: "-93939", hasBonus: true },
  { cardKey: "American Express--94949", cardType: "American Express", lastFive: "-94949", hasBonus: true },
  { cardKey: "American Express--95959", cardType: "American Express", lastFive: "-95959", hasBonus: true },
  { cardKey: "American Express--96969", cardType: "American Express", lastFive: "-96969", hasBonus: true },
  { cardKey: "American Express--97979", cardType: "American Express", lastFive: "-97979", hasBonus: true },
  { cardKey: "American Express--98989", cardType: "American Express", lastFive: "-98989", hasBonus: true },
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
