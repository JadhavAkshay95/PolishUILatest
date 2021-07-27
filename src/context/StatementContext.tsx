import React, {
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import dayjs from 'dayjs';
import { Assets } from 'modules/assets/getAssetsFromTransactions';
import { RunningBalances } from '../modules/assets/getAssetsFromTransactions';
import {
  useAssetResults,
  TokensAndPrices,
} from '../modules/assets/useAssetResults';
import { useAssets } from '../modules/assets/useAssets';
import { useAllTransactions } from '../modules/transactions/useAllTransactions';

export const getAddressesFromInput = (value: string) => {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter((o) => !!o);
};

export interface AssetData {
  assets: any;
  date: Date;
  error: Error | null;
  isFetching: boolean;
  hasFetched: boolean;
  tokensAndPrices: TokensAndPrices;
  totalValueOfAllTokens: number;
}

interface IStatementContext {
  addressesString: string;
  addresses: string[];
  startDate: Date;
  endDate: Date;
  setAddressesString: (value: string) => void;
  setStartDate: (value: Date) => void;
  setEndDate: (value: Date) => void;
  allTransactions: any;
  transactionsWithinDateRange: any;
  isFetching: boolean;
  hasFetched: boolean;
  error: Error | null;
  startAssetsData: any;
  endAssetsData: any;
  runningBalances?: RunningBalances | null;
  fetchTransactions: () => Promise<void>;
}

const StatementContext = React.createContext<IStatementContext | null>(null);

const LOCAL_STORAGE_KEY = 'eth-statement-addresses';
const setAddressesStringToLocalStorage = (addressesString: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, addressesString);
};
const getAddressesStringFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';
};

export const StatementContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  // Note this is a comma separated string, not an array
  const [addressesString, _setAddressesString] = useState(
    getAddressesStringFromLocalStorage(),
  );
  const [startDate, _setStartDate] = useState(
    dayjs().subtract(1, 'day').toDate(),
  );
  const [endDate, _setEndDate] = useState(dayjs().toDate());

  const addresses = useMemo(() => {
    return getAddressesFromInput(addressesString);
  }, [addressesString]);

  const {
    transactions,
    transactionsWithinDateRange,
    fetchTransactions,
    hasFetched,
    isFetching,
    error,
    reset: resetTransactions,
  } = useAllTransactions({
    addresses,
    startDate,
    endDate,
  });

  // const { assets: startAssets } = useAssets({
  //   transactions,
  //   date: startDate,
  // });

  // const { assets: endAssets, runningBalances } = useAssets({
  //   transactions,
  //   date: endDate,
  // });

  const startAssetsResults = useAssetResults(transactions, startDate);
  const endAssetsResults = useAssetResults(transactions, endDate);


  const handleFetchTransactions = useCallback(async () => {
    setAddressesStringToLocalStorage(addressesString);
    return fetchTransactions();
  }, [addressesString]);

  const reset = useCallback(() => {
    resetTransactions();
  }, [resetTransactions]);

  const setStartDate = useCallback(
    (date: Date) => {
      reset();
      _setStartDate(date);
    },
    [reset],
  );

  const setEndDate = useCallback(
    (date: Date) => {
      reset();
      _setEndDate(date);
    },
    [reset],
  );

  const setAddressesString = useCallback(
    (addressesValue: string) => {
      reset();
      _setAddressesString(addressesValue);
    },
    [reset],
  );

  return (
    <StatementContext.Provider
      value={{
        addressesString,
        addresses,
        startDate,
        endDate,
        setAddressesString,
        setStartDate,
        setEndDate,
        allTransactions: transactions,
        transactionsWithinDateRange,
        startAssetsData: {
          date: startDate,
          ...startAssetsResults,
        },
        endAssetsData: {
          date: endDate,
          ...endAssetsResults,
        },
        isFetching,
        hasFetched,
        error,
        fetchTransactions: handleFetchTransactions,
      }}
    >
      {children}
    </StatementContext.Provider>
  );
};

export const useStatementContext = () => {
  const context = useContext(StatementContext);

  if (!context) {
    throw new Error('No Context Provider for StatementContext found');
  }

  return context;
};
