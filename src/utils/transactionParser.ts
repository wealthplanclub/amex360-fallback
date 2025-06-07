
export const parseTransactionData = (data: string) => {
  const lines = data.trim().split('\n');
  const headers = lines[0].split('\t');
  
  return lines.slice(1).map(line => {
    const values = line.split('\t');
    return {
      date: values[0], // Date is already in YYYY-MM-DD format from static data
      description: values[1],
      amount: parseFloat(values[2].replace(/[$,]/g, '')),
      account: values[3],
      category: values[4] || ""
    };
  });
};
