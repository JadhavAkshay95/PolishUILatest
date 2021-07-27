import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { BigNumber } from 'bignumber.js';
import { CombinedTransactions } from '../transactions/combineTransactions/combineTransactions';
import { TransactionStatus } from '../transactions/combineTransactions/getTransactionStatus';
import { TransactionType } from '../transactions/combineTransactions/getTransactionType';

dayjs.extend(isSameOrBefore);

export interface TokenValue {
  value: BigNumber;
  decimals: number;
  name: string;
  symbol: string;
  token_address?: string;
  chain?: string;
}

export type Assets = { [assetName: string]: TokenValue };
export type RunningBalances = {
  [assetName: string]: { [date: number]: TokenValue };
};

const removeEmptyAssets = (assets: Assets) => {
  const newAssets: Assets = {};
  Object.keys(assets).forEach((key) => {
    if (assets[key].value.isGreaterThan(0)) {
      newAssets[key] = assets[key];
    }
  });
  return newAssets;
};

export const getAssetsFromTransactions = (
  limitDate: Date,
  combinedTransactions: CombinedTransactions,
) => {
  const assets: Assets = {
    Ethereum: {
      value: new BigNumber(0),
      decimals: 18,
      name: 'Ethereum',
      symbol: 'ETH',
    },
  };

  const runningBalances: RunningBalances = {};

  const update = ({
    name,
    value,
    date,
    decimal,
    symbol,
  }: {
    name: string;
    value: BigNumber;
    date: Date;
    decimal: string;
    symbol: string;
  }) => {
    const parsedDecimal = parseInt(decimal.toString(), 10);
    if (!assets[name]) {
      assets[name] = {
        value: new BigNumber(0),
        decimals: parsedDecimal,
        name,
        symbol,
      };
    }

    const newValue = assets[name].value.plus(value);
    assets[name].value = newValue;

    if (!runningBalances[name]) {
      runningBalances[name] = {};
    }

    runningBalances[name][date.valueOf()] = {
      value: newValue,
      decimals: parsedDecimal,
      name,
      symbol,
    };
  };
  const updateEth = ({ value, date }: { value: BigNumber; date: Date }) => {
    update({ value, date, name: 'Ethereum', symbol: 'ETH', decimal: '18' });
  };

  combinedTransactions
    .filter((transaction) => dayjs(transaction.date).isSameOrBefore(limitDate))
    .forEach(
      ({
        transaction,
        internalTransactions,
        erc20Transactions,
        status,
        type,
        originAddress,
        date,
      }) => {
        if (transaction) {
          // Deduct gas from ETH unless ether is sent

          if (type !== TransactionType.Deposit) {
            const gasFee = new BigNumber(transaction.gasUsed).multipliedBy(
              transaction.gasPrice,
            );
            updateEth({ date, value: gasFee.negated() });
          }

          if (status === TransactionStatus.Error) {
            // Nothing
          } else if (
            transaction.value !== '0' &&
            type === TransactionType.Deposit
          ) {
            // Add value from ETH on receive
            updateEth({ date, value: new BigNumber(transaction.value) });
          } else if (transaction.value !== '0') {
            // Deduct value from ETH on send, execution and swap
            updateEth({
              date,
              value: new BigNumber(transaction.value).negated(),
            });
          }
        }

        // Check if we receive/send funds via internal transactions
        internalTransactions.forEach((txn) => {
          // Add value from ETH on receive
          if (
            txn.to.toLocaleLowerCase() === originAddress.toLocaleLowerCase()
          ) {
            updateEth({ date, value: new BigNumber(txn.value) });
          } else if (
            txn.from.toLocaleLowerCase() === originAddress.toLocaleLowerCase()
          ) {
            updateEth({
              date,
              value: new BigNumber(txn.value).negated(),
            });
          }
        });

        // Check for token trades
        // NOTE: this will NOT accout for ALL erc20 swaps as it might be the case
        // that tokens are swapped without emiting the Transfer event. i.e. this happened to WETH
        erc20Transactions.forEach((erc20Txn) => {
          if (
            erc20Txn.to.toLocaleLowerCase() ===
            originAddress.toLocaleLowerCase()
          ) {
            update({
              date,
              value: new BigNumber(erc20Txn.value),
              name: erc20Txn.tokenName,
              symbol: erc20Txn.tokenSymbol,
              decimal: erc20Txn.tokenDecimal,
            });
          } else if (
            erc20Txn.from.toLocaleLowerCase() ===
            originAddress.toLocaleLowerCase()
          ) {
            update({
              date,
              value: new BigNumber(erc20Txn.value).negated(),
              name: erc20Txn.tokenName,
              symbol: erc20Txn.tokenSymbol,
              decimal: erc20Txn.tokenDecimal,
            });
          }

          if (assets[erc20Txn.tokenName].value.isLessThan(0)) {
            console.error(
              `${erc20Txn.tokenName} balance got negative, should not happen`,
            );
          }
        });

        if (assets.Ethereum.value.isLessThan(0)) {
          throw new Error('Ether balance got negative, should not happen');
        }
      },
    );

  return { assets: removeEmptyAssets(assets), runningBalances };
};
