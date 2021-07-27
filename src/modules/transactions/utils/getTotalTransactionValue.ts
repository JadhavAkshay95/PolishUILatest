import { getValuesFromInternalTransactions } from './getValuesFromInternalTransactions';
import { CombinedTransaction } from '../combineTransactions';

export const getTotalTransactionValue = (
  combinedTransaction: CombinedTransaction,
) => {
  const { transaction } = combinedTransaction;

  const { netInternalValue } =
    getValuesFromInternalTransactions(combinedTransaction);

  if (transaction) {
    return netInternalValue.plus(transaction.value);
  }

  return netInternalValue;
};
