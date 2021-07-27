import { useMemo } from 'react';
import { useCoinContext } from '../../context/CoinContext';
import { Assets, TokenValue } from './getAssetsFromTransactions';
import { useMultipleCoinDetails } from '../tokens/useCoinDetails';
import { notEmpty, sum } from '../../utils/array';
import { calculateTokenValue } from '../tokens/calculateTokenValue';
import { findCoinGeckoTokenId } from '../tokens/findCoinGeckoTokenId';

export interface TokensAndPrice {
  value: TokenValue;
  priceInUsd: number | undefined;
  tokenPrice: number | undefined;
}
export type TokensAndPrices = TokensAndPrice[] | null;

export const useAssetResults = (
  assets: Assets | null,
  date: Date,
  chain = 'ethereum',
) => {
  const { coins } = useCoinContext();

  const coinGeckoTokenIds = useMemo(() => {
    if (!assets) {
      return [];
    }

    return Object.values(assets).map((asset) => {
      const tokenId = findCoinGeckoTokenId(
        coins!,
        asset.name,
        asset.symbol,
        asset.token_address,
        asset.chain ?? chain,
      );
      return tokenId;
    });
  }, [assets, coins]);

  const { coinPrices, isFetching, hasFetched, error } = useMultipleCoinDetails(
    coinGeckoTokenIds,
    date,
  );

  const totalValueOfAllTokens = useMemo(() => {
    if (!assets) {
      return 0;
    }

    return Object.values(assets)
      .map((value, index) => {
        const tokenPrice = coinPrices[index];

        const priceInUsd = calculateTokenValue(
          value.value,
          value.decimals,
          tokenPrice,
        );
        return priceInUsd;
      })
      .filter(notEmpty)
      .reduce(sum, 0);
  }, [assets, coinPrices]);

  const tokensAndPrices: TokensAndPrices = useMemo(() => {
    if (isFetching || !assets) {
      return null;
    }

    const formattedCoin = Object.values(assets).map((value, index) => {
      const tokenPrice = coinPrices[index];
      let coinWithMeta = value;
      const priceInUsd = calculateTokenValue(
        value.value,
        value.decimals,
        tokenPrice,
      );
      if (!value.name && !value.symbol) {
        const coinMeta = coins?.find(
          (coin) => coin?.platforms?.[chain] === value.token_address,
        );
        if (coinMeta) {
          coinWithMeta = {
            ...value,
            name: coinMeta.name.toUpperCase(),
            symbol: coinMeta.symbol.toUpperCase(),
          };
        }
      }
      return { value: coinWithMeta, priceInUsd, tokenPrice };
    });

    return formattedCoin.sort(
      (a, b) => (b.priceInUsd ?? 0) - (a.priceInUsd ?? 0),
    );
  }, [assets, coinPrices, isFetching]);

  return {
    error,
    isFetching,
    hasFetched,
    tokensAndPrices,
    totalValueOfAllTokens,
  };
};
