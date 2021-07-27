import { useCallback, useEffect, useState } from 'react';
import { CombinedTransactions } from '../transactions/combineTransactions/combineTransactions';
import {
  Assets,
  getAssetsFromTransactions,
  RunningBalances,
} from './getAssetsFromTransactions';

export const useAssets = ({
  transactions,
  date,
}: {
  transactions: CombinedTransactions;
  date: Date;
}) => {
  const [assets, setAssets] = useState<null | Assets>(null);
  const [runningBalances, setRunningBalances] =
    useState<null | RunningBalances>(null);

  const calculateAssets = useCallback(() => {
    if (transactions.length) {
      const { assets: assetsList, runningBalances: runningBalanceList } =
        getAssetsFromTransactions(date, transactions);

      setAssets(assetsList);
      setRunningBalances(runningBalanceList);
    }
  }, [date, transactions]);

  useEffect(() => {
    calculateAssets();
  }, [calculateAssets]);

  return { assets, runningBalances };
};
