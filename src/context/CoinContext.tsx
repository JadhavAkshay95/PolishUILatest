import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Coin, getAllCoins } from '../api/coingecko/coins';

interface ICoinContext {
  coins: Coin[] | null;
  hasFetched: boolean;
  isFetching: boolean;
  error: null | Error;
}

const CoinContext = React.createContext<ICoinContext | null>(null);

export const CoinContextProvider = ({ children }: { children: ReactNode }) => {
  const [hasFetched, setHasFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [coins, setCoins] = useState<Coin[] | null>(null);

  useEffect(() => {
    const fetchAndSetCoins = async () => {
      setIsFetching(true);
      setError(null);

      try {
        const storageCoins = localStorage.getItem('coin');
        if (storageCoins) {
          setCoins(JSON.parse(storageCoins));
          setHasFetched(true);
        } else {
          const fetchedCoins = await getAllCoins();
          localStorage.setItem('coin', JSON.stringify(fetchedCoins));
          setCoins(fetchedCoins);
          setHasFetched(true);
        }
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setIsFetching(false);
      }
    };
    fetchAndSetCoins();
  }, []);

  return (
    <CoinContext.Provider
      value={{
        coins,
        hasFetched,
        isFetching,
        error,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export const useCoinContext = () => {
  const context = useContext(CoinContext);

  if (!context) {
    throw new Error('No Context Provider for CoinContext found');
  }

  return context;
};
