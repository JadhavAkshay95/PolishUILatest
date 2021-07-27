/* eslint-disable */
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { tokenMigrations } from '../../data/tokenMigrations';
import { sortTransactionBydate } from '../../utils/array';
import { wait } from '../../utils/wait';
import { adjustForMigrations } from './combineTransactions/adjustForMigrations';
import {
  CombinedTransactions,
  combineTransactions,
} from './combineTransactions/combineTransactions';
import { fetchAllERC20Transactions } from './fetchTransactions/fetchAllERC20Transactions';
import { fetchAllInternalTransactions } from './fetchTransactions/fetchAllInternalTransactions';
import { fetchAllTransactions } from './fetchTransactions/fetchAllTransactions';
const Moralis = require('moralis');

dayjs.extend(isBetween);

export const useAllTransactions = ({
  addresses,
  startDate,
  endDate,
}: {
  addresses: string[];
  startDate: Date;
  endDate: Date;
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [transactions, setTransactions] = useState<any>([]);

  const fetchTransactionsForOneAddress = useCallback(
    async (address: string) => {
      await wait(1000);

      const balances = await Moralis.Web3.getAllERC20({address});

      // const allTransactions = await fetchAllTransactions({
      //   address,
      // });
      // const allErcTransactions = await fetchAllERC20Transactions({
      //   address,
      // });
      // const allInternalTransactions = await fetchAllInternalTransactions({
      //   address,
      // });

      // let combinedTxns = [];
      // combinedTxns = combineTransactions(
      //   address,
      //   allTransactions,
      // );
      return balances;
    },
    [],
  );

  const fetchTransactions = useCallback(async () => {
    let allTransactions: any = [];

    setIsFetching(true);
    setError(null);
    try {
      const apiCall = [];
      for (let i = 0; i < addresses.length; i++) {
        apiCall.push(fetchTransactionsForOneAddress(addresses[i]));
      }
      const txns = await Promise.all(apiCall);
      allTransactions = [...allTransactions, ...txns.flat(1)];

      setTransactions(allTransactions.map((txn: any) => ({ ...txn, value: new BigNumber(txn.balance)})).sort(sortTransactionBydate));
      setHasFetched(true);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsFetching(false);
    }
  }, [addresses]);

  const reset = useCallback(() => {
    setIsFetching(false);
    setHasFetched(false);
    setError(null);
    setTransactions([]);
  }, []);

  useEffect(() => {
    reset();
  }, [addresses, startDate, endDate]);

  const transactionsWithinDateRange = useMemo(() => {
    return transactions.filter((transaction: any) => {
      return dayjs(transaction.date).isBetween(startDate, endDate, null, '[]');
    });
  }, [transactions, startDate, endDate]);

  return {
    fetchTransactions,
    transactionsWithinDateRange,
    transactions,
    error,
    isFetching,
    hasFetched,
    reset,
  };
};
