
// Custom global filter function for descriptions and amounts
export const globalFilterFn = (row: any, columnId: string, value: string) => {
  const description = String(row.getValue("description")).toLowerCase()
  const amount = String(row.getValue("amount")).toLowerCase()
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(parseFloat(row.getValue("amount")))).toLowerCase()
  
  const searchValue = value.toLowerCase()
  
  return description.includes(searchValue) || 
         amount.includes(searchValue) || 
         formattedAmount.includes(searchValue)
}

// Function to format account names according to the rules
export const formatAccountName = (accountName: string): string => {
  let formatted = accountName.replace(/\bcard\b/gi, '').trim()
  
  // Apply conditional formatting rules
  formatted = formatted.replace(/business/gi, '').trim()
  formatted = formatted.replace(/rewards/gi, '').trim()
  formatted = formatted.replace(/charles/gi, '').trim()
  
  // Clean up extra spaces
  formatted = formatted.replace(/\s+/g, ' ').trim()
  
  return formatted
}
