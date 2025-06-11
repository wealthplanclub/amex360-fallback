
export const parseTransactionData = (data: string) => {
  const lines = data.trim().split('\n');
  const headers = lines[0].split('\t');
  
  return lines.slice(1).map(line => {
    const values = line.split('\t');
    return {
      date: values[0], // Date is already in YYYY-MM-DD format from static data
      description: values[1],
      amount: parseFloat(values[2].replace(/[$,]/g, '')),
      account_type: values[3], // Use account_type instead of account
      last_five: values[4] || "", // Extract last_five from the data
      category: values[5] || "", // Category field
      point_multiple: parseFloat(values[6]) || 1.0 // Parse point_multiple or default to 1.0
    };
  });
};
