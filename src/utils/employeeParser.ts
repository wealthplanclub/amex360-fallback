
export interface EmployeeTransaction {
  date: string
  description: string
  card_type: string
  last_five: string
  amount: number
  point_multiple: number
}

export const parseEmployeeData = (data: string): EmployeeTransaction[] => {
  const lines = data.trim().split('\n');
  const headers = lines[0].split('\t');
  
  return lines.slice(1).map(line => {
    const values = line.split('\t');
    return {
      date: values[0], // Date is already in YYYY-MM-DD format
      description: values[1],
      amount: parseFloat(values[2].replace(/[$,]/g, '')),
      card_type: values[3], // This is the card type from the data
      last_five: values[4] || "", // This is the last five digits from the data
      point_multiple: parseFloat(values[6]) || 1.0 // Parse point_multiple or default to 1.0
    };
  });
};
