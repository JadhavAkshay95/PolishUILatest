import React, {
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import dayjs from 'dayjs';
import BigNumber from 'bignumber.js';

import { Assets } from 'modules/assets/getAssetsFromTransactions';
import { useParams } from 'react-router-dom';
import { getERC20Balances, getBalance } from 'api/moralis/accounts';
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
  assets: Assets | null;
  date: Date;
  error: Error | null;
  isFetching: boolean;
  hasFetched: boolean;
  tokensAndPrices: TokensAndPrices;
  totalValueOfAllTokens: number;
}

interface IStatementContext {
  tokenList: any;
  fetchBalances: (val: string) => Promise<void>;
  loading: boolean;
}

const StatementContext = React.createContext<IStatementContext | null>(null);

const LOCAL_STORAGE_KEY = 'bsc-statement-addresses';
const setAddressesStringToLocalStorage = (addressesString: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, addressesString);
};
const getAddressesStringFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEY) ?? '';
};

export const BSCStatementContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  // Note this is a comma separated string, not an array
  const [addressesString, _setAddressesString] = useState(
    getAddressesStringFromLocalStorage(),
  );
  const [loading, setLoading] = useState(false);
  const [tokenList, setTokenList] = useState(null);
  const [startDate, _setStartDate] = useState(
    dayjs().subtract(1, 'day').toDate(),
  );
  const [endDate, _setEndDate] = useState(dayjs().toDate());

  const addresses = useMemo(() => {
    return getAddressesFromInput(addressesString);
  }, [addressesString]);

  const fetchBalances = useCallback(async (address) => {
    try {
      setLoading(true);
      const res = await getERC20Balances(address);
      if (!res) {
        throw new Error('something went wrong');
      }
      const mergedRes = res ?? [];
      //  [
      //   ...res[0]?.data,
      //   {
      //     name: 'Binance',
      //     symbol: 'BNB',
      //     decimals: 18,
      //     balance: res[1]?.data?.balance,
      //     token_address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
      //     value: new BigNumber(res[1]?.data?.balance ?? 0),
      //     chain: 'binancecoin',
      //   },
      // ];

      const filteredResponse: any = mergedRes
        .map((token: any) => {
          if (token.balance > 0) {
            return {
              ...token,
              value: new BigNumber(token.balance),
              decimals: token.decimals ?? 18,
              chain: token.symbol === 'BNB' ? 'binancecoin' : 'binance-smart-chain'
            };
          }
          return false;
        })
        .filter((val: any) => val);

      setTokenList(filteredResponse);
    } catch (e) {
      console.log('error in moralis ', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const bscAssetsResults = useAssetResults(
    tokenList,
    endDate,
    'binance-smart-chain',
  );
  return (
    <StatementContext.Provider
      value={{
        fetchBalances,
        tokenList: bscAssetsResults,
        loading,
      }}
    >
      {children}
    </StatementContext.Provider>
  );
};

export const useBSCStatementContext = () => {
  const context = useContext(StatementContext);

  if (!context) {
    throw new Error('No Context Provider for StatementContext found');
  }

  return context;
};
