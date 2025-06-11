

export { TransactionDataProcessor } from "./TransactionDataProcessor"
export { TransactionFilterService } from "./TransactionFilterService"
export { TransactionFilters } from "./TransactionFilters"
export { TransactionCalculations } from "./TransactionCalculations"

// Import the class to create singleton instance
import { TransactionFilterService } from "./TransactionFilterService"

// Export singleton instance using the proper singleton pattern
export const transactionFilterService = TransactionFilterService.getInstance()

