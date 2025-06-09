
/**
 * Formats a point multiple value with standardized formatting
 * - Rounds to 2 decimal places
 * - Adds 'x' suffix
 * - Returns as string for display
 */
export const formatPointMultiple = (value: number): string => {
  return `${value.toFixed(2)}x`;
};
