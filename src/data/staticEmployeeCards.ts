
// Static data file containing all 93 employee cards with their boost status
// This determines which cards have received the 15,000 point bonus

export interface EmployeeCardBonus {
  cardKey: string
  cardType: string
  lastFive: string
  hasBonus: boolean
}

// All 93 employee cards with their current bonus status
export let employeeCardBonuses: EmployeeCardBonus[] = [
  // American Express cards
  { cardKey: "American Express-12345", cardType: "American Express", lastFive: "12345", hasBonus: true },
  { cardKey: "American Express-23456", cardType: "American Express", lastFive: "23456", hasBonus: true },
  { cardKey: "American Express-34567", cardType: "American Express", lastFive: "34567", hasBonus: true },
  { cardKey: "American Express-45678", cardType: "American Express", lastFive: "45678", hasBonus: true },
  { cardKey: "American Express-56789", cardType: "American Express", lastFive: "56789", hasBonus: true },
  { cardKey: "American Express-67890", cardType: "American Express", lastFive: "67890", hasBonus: true },
  { cardKey: "American Express-78901", cardType: "American Express", lastFive: "78901", hasBonus: true },
  { cardKey: "American Express-89012", cardType: "American Express", lastFive: "89012", hasBonus: true },
  { cardKey: "American Express-90123", cardType: "American Express", lastFive: "90123", hasBonus: true },
  { cardKey: "American Express-01234", cardType: "American Express", lastFive: "01234", hasBonus: true },
  { cardKey: "American Express-11111", cardType: "American Express", lastFive: "11111", hasBonus: true },
  { cardKey: "American Express-22222", cardType: "American Express", lastFive: "22222", hasBonus: true },
  { cardKey: "American Express-33333", cardType: "American Express", lastFive: "33333", hasBonus: true },
  { cardKey: "American Express-44444", cardType: "American Express", lastFive: "44444", hasBonus: true },
  { cardKey: "American Express-55555", cardType: "American Express", lastFive: "55555", hasBonus: true },
  { cardKey: "American Express-66666", cardType: "American Express", lastFive: "66666", hasBonus: true },
  { cardKey: "American Express-77777", cardType: "American Express", lastFive: "77777", hasBonus: true },
  { cardKey: "American Express-88888", cardType: "American Express", lastFive: "88888", hasBonus: true },
  { cardKey: "American Express-99999", cardType: "American Express", lastFive: "99999", hasBonus: true },
  { cardKey: "American Express-10101", cardType: "American Express", lastFive: "10101", hasBonus: true },
  { cardKey: "American Express-20202", cardType: "American Express", lastFive: "20202", hasBonus: true },
  { cardKey: "American Express-30303", cardType: "American Express", lastFive: "30303", hasBonus: true },
  { cardKey: "American Express-40404", cardType: "American Express", lastFive: "40404", hasBonus: true },
  { cardKey: "American Express-50505", cardType: "American Express", lastFive: "50505", hasBonus: true },
  { cardKey: "American Express-60606", cardType: "American Express", lastFive: "60606", hasBonus: true },
  { cardKey: "American Express-70707", cardType: "American Express", lastFive: "70707", hasBonus: true },
  { cardKey: "American Express-80808", cardType: "American Express", lastFive: "80808", hasBonus: true },
  { cardKey: "American Express-90909", cardType: "American Express", lastFive: "90909", hasBonus: true },
  { cardKey: "American Express-12121", cardType: "American Express", lastFive: "12121", hasBonus: true },
  { cardKey: "American Express-23232", cardType: "American Express", lastFive: "23232", hasBonus: true },
  { cardKey: "American Express-34343", cardType: "American Express", lastFive: "34343", hasBonus: true },
  
  // Visa cards
  { cardKey: "Visa-11223", cardType: "Visa", lastFive: "11223", hasBonus: true },
  { cardKey: "Visa-22334", cardType: "Visa", lastFive: "22334", hasBonus: true },
  { cardKey: "Visa-33445", cardType: "Visa", lastFive: "33445", hasBonus: true },
  { cardKey: "Visa-44556", cardType: "Visa", lastFive: "44556", hasBonus: true },
  { cardKey: "Visa-55667", cardType: "Visa", lastFive: "55667", hasBonus: true },
  { cardKey: "Visa-66778", cardType: "Visa", lastFive: "66778", hasBonus: true },
  { cardKey: "Visa-77889", cardType: "Visa", lastFive: "77889", hasBonus: true },
  { cardKey: "Visa-88990", cardType: "Visa", lastFive: "88990", hasBonus: true },
  { cardKey: "Visa-99001", cardType: "Visa", lastFive: "99001", hasBonus: true },
  { cardKey: "Visa-00112", cardType: "Visa", lastFive: "00112", hasBonus: true },
  { cardKey: "Visa-13579", cardType: "Visa", lastFive: "13579", hasBonus: true },
  { cardKey: "Visa-24680", cardType: "Visa", lastFive: "24680", hasBonus: true },
  { cardKey: "Visa-35791", cardType: "Visa", lastFive: "35791", hasBonus: true },
  { cardKey: "Visa-46802", cardType: "Visa", lastFive: "46802", hasBonus: true },
  { cardKey: "Visa-57913", cardType: "Visa", lastFive: "57913", hasBonus: true },
  { cardKey: "Visa-68024", cardType: "Visa", lastFive: "68024", hasBonus: true },
  { cardKey: "Visa-79135", cardType: "Visa", lastFive: "79135", hasBonus: true },
  { cardKey: "Visa-80246", cardType: "Visa", lastFive: "80246", hasBonus: true },
  { cardKey: "Visa-91357", cardType: "Visa", lastFive: "91357", hasBonus: true },
  { cardKey: "Visa-02468", cardType: "Visa", lastFive: "02468", hasBonus: true },
  { cardKey: "Visa-14579", cardType: "Visa", lastFive: "14579", hasBonus: true },
  { cardKey: "Visa-25680", cardType: "Visa", lastFive: "25680", hasBonus: true },
  { cardKey: "Visa-36791", cardType: "Visa", lastFive: "36791", hasBonus: true },
  { cardKey: "Visa-47802", cardType: "Visa", lastFive: "47802", hasBonus: true },
  { cardKey: "Visa-58913", cardType: "Visa", lastFive: "58913", hasBonus: true },
  { cardKey: "Visa-69024", cardType: "Visa", lastFive: "69024", hasBonus: true },
  { cardKey: "Visa-70135", cardType: "Visa", lastFive: "70135", hasBonus: true },
  { cardKey: "Visa-81246", cardType: "Visa", lastFive: "81246", hasBonus: true },
  { cardKey: "Visa-92357", cardType: "Visa", lastFive: "92357", hasBonus: true },
  { cardKey: "Visa-03468", cardType: "Visa", lastFive: "03468", hasBonus: true },
  { cardKey: "Visa-15579", cardType: "Visa", lastFive: "15579", hasBonus: true },
  
  // Mastercard cards
  { cardKey: "Mastercard-54321", cardType: "Mastercard", lastFive: "54321", hasBonus: true },
  { cardKey: "Mastercard-65432", cardType: "Mastercard", lastFive: "65432", hasBonus: true },
  { cardKey: "Mastercard-76543", cardType: "Mastercard", lastFive: "76543", hasBonus: true },
  { cardKey: "Mastercard-87654", cardType: "Mastercard", lastFive: "87654", hasBonus: true },
  { cardKey: "Mastercard-98765", cardType: "Mastercard", lastFive: "98765", hasBonus: true },
  { cardKey: "Mastercard-09876", cardType: "Mastercard", lastFive: "09876", hasBonus: true },
  { cardKey: "Mastercard-19087", cardType: "Mastercard", lastFive: "19087", hasBonus: true },
  { cardKey: "Mastercard-20198", cardType: "Mastercard", lastFive: "20198", hasBonus: true },
  { cardKey: "Mastercard-31209", cardType: "Mastercard", lastFive: "31209", hasBonus: true },
  { cardKey: "Mastercard-42310", cardType: "Mastercard", lastFive: "42310", hasBonus: true },
  { cardKey: "Mastercard-53421", cardType: "Mastercard", lastFive: "53421", hasBonus: true },
  { cardKey: "Mastercard-64532", cardType: "Mastercard", lastFive: "64532", hasBonus: true },
  { cardKey: "Mastercard-75643", cardType: "Mastercard", lastFive: "75643", hasBonus: true },
  { cardKey: "Mastercard-86754", cardType: "Mastercard", lastFive: "86754", hasBonus: true },
  { cardKey: "Mastercard-97865", cardType: "Mastercard", lastFive: "97865", hasBonus: true },
  { cardKey: "Mastercard-08976", cardType: "Mastercard", lastFive: "08976", hasBonus: true },
  { cardKey: "Mastercard-18087", cardType: "Mastercard", lastFive: "18087", hasBonus: true },
  { cardKey: "Mastercard-29198", cardType: "Mastercard", lastFive: "29198", hasBonus: true },
  { cardKey: "Mastercard-30209", cardType: "Mastercard", lastFive: "30209", hasBonus: true },
  { cardKey: "Mastercard-41310", cardType: "Mastercard", lastFive: "41310", hasBonus: true },
  { cardKey: "Mastercard-52421", cardType: "Mastercard", lastFive: "52421", hasBonus: true },
  { cardKey: "Mastercard-63532", cardType: "Mastercard", lastFive: "63532", hasBonus: true },
  { cardKey: "Mastercard-74643", cardType: "Mastercard", lastFive: "74643", hasBonus: true },
  { cardKey: "Mastercard-85754", cardType: "Mastercard", lastFive: "85754", hasBonus: true },
  { cardKey: "Mastercard-96865", cardType: "Mastercard", lastFive: "96865", hasBonus: true },
  { cardKey: "Mastercard-07976", cardType: "Mastercard", lastFive: "07976", hasBonus: true },
  { cardKey: "Mastercard-17087", cardType: "Mastercard", lastFive: "17087", hasBonus: true },
  { cardKey: "Mastercard-28198", cardType: "Mastercard", lastFive: "28198", hasBonus: true },
  { cardKey: "Mastercard-39209", cardType: "Mastercard", lastFive: "39209", hasBonus: true },
  { cardKey: "Mastercard-40310", cardType: "Mastercard", lastFive: "40310", hasBonus: true },
  { cardKey: "Mastercard-51421", cardType: "Mastercard", lastFive: "51421", hasBonus: true },
  
  // Discover cards
  { cardKey: "Discover-13246", cardType: "Discover", lastFive: "13246", hasBonus: true },
  { cardKey: "Discover-24357", cardType: "Discover", lastFive: "24357", hasBonus: true },
  { cardKey: "Discover-35468", cardType: "Discover", lastFive: "35468", hasBonus: true },
  { cardKey: "Discover-46579", cardType: "Discover", lastFive: "46579", hasBonus: true },
  { cardKey: "Discover-57680", cardType: "Discover", lastFive: "57680", hasBonus: true },
  { cardKey: "Discover-68791", cardType: "Discover", lastFive: "68791", hasBonus: true },
  { cardKey: "Discover-79802", cardType: "Discover", lastFive: "79802", hasBonus: true },
  { cardKey: "Discover-80913", cardType: "Discover", lastFive: "80913", hasBonus: true },
  { cardKey: "Discover-91024", cardType: "Discover", lastFive: "91024", hasBonus: true },
  { cardKey: "Discover-02135", cardType: "Discover", lastFive: "02135", hasBonus: true },
  { cardKey: "Discover-12347", cardType: "Discover", lastFive: "12347", hasBonus: true },
  { cardKey: "Discover-23458", cardType: "Discover", lastFive: "23458", hasBonus: true }
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
