
export interface CardData {
  name: string;
  fullName: string;
  amount: number;
}

export const getTimeRangeDescription = (selectedTimeRange: string) => {
  if (selectedTimeRange === "ytd") return "(YTD)";
  if (selectedTimeRange === "90d") return "(90d)";
  if (selectedTimeRange === "30d") return "(30d)";
  if (selectedTimeRange === "7d") return "(7d)";
  return "(YTD)";
};
