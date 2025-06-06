
export const calculateFinancials = (transactions: any[]) => {
  const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const netCashFlow = totalIncome - totalExpenses;

  return { totalExpenses, totalIncome, netCashFlow };
};

export const getCategoryData = (transactions: any[]) => {
  const categoryData = transactions
    .filter(t => t.category && t.amount < 0)
    .reduce((acc, t) => {
      const cat = t.category || "Uncategorized";
      acc[cat] = (acc[cat] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
};

export const getAccountData = (transactions: any[]) => {
  const accountData = transactions.reduce((acc, t) => {
    const account = t.account.split(' (')[0]; // Clean account name
    acc[account] = (acc[account] || 0) + (t.amount < 0 ? Math.abs(t.amount) : 0);
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(accountData)
    .filter(([_, value]: [string, number]) => value > 0)
    .map(([name, value]: [string, number]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getDailyFlowData = (transactions: any[]) => {
  const dailyFlow = transactions.reduce((acc, t) => {
    const date = t.date;
    if (!acc[date]) acc[date] = { date, expenses: 0, income: 0 };
    if (t.amount < 0) acc[date].expenses += Math.abs(t.amount);
    else acc[date].income += t.amount;
    return acc;
  }, {} as Record<string, any>);

  return Object.values(dailyFlow).sort((a: any, b: any) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

export const getSpecialSpending = (transactions: any[]) => {
  const aiSpending = transactions
    .filter(t => t.description.toLowerCase().includes('ai') && t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const superPhoneSpending = transactions
    .filter(t => t.category === 'SuperPhone' && t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const creditMaxSpending = transactions
    .filter(t => t.category === 'CreditMax' && t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return { aiSpending, superPhoneSpending, creditMaxSpending };
};
