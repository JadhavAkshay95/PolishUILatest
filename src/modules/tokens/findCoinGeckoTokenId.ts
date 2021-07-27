import { etherscanCoinGeckoMatch } from '../../data/etherscanCoinGeckoMatch';
import { tokenMigrations } from '../../data/tokenMigrations';
/**
 * Try to find the coingecko tokenId based on a coin name and coin symbol
 */
export const findCoinGeckoTokenId = (
  coins: any[],
  name: string,
  symbol: string,
  token_address?: string,
  chain: string = 'ethereum',
): string | undefined => {
  // Try to match in our locally managed list
  let tokenId: string | undefined = etherscanCoinGeckoMatch[name];

  // Check if we have a 'custom'/renamedOld symbol, from our tokenMigration
  const relatedMigration = tokenMigrations.find(
    (migration) => migration.renamedOldToken.symbol === symbol,
  );
  if (relatedMigration) {
    tokenId = relatedMigration.renamedOldToken.coingeckoId;
  }

  // Try to match on name
  if (!tokenId) {
    tokenId = coins!?.find(
      (coin) =>
        coin.symbol?.toLowerCase() === symbol?.toLowerCase() &&
        coin.platforms[chain],
    )?.id;
  }

  if (!tokenId && token_address && chain) {
    tokenId = coins!?.find(
      (coin) =>
        coin.platforms?.[chain]?.toLowerCase() === token_address?.toLowerCase(),
    )?.id;
  }

  if (!tokenId) {
    console.error(`No coinGecko tokenId found for ${name} (${symbol})`);
  }

  return tokenId;
};
