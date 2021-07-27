import axios from 'axios';
import { BSC_SERVER } from './base';

const Moralis = require('moralis');

export const getERC20Balances = async (
  address: string,
  chain: string = 'bsc',
) => {
  // const token = localStorage.getItem('MORALIS_TOKEN');
  // if (!token) {
  //   throw new Error('Can not connect to moralis');
  // }
  // const tokenBalances = await axios.get(
  //   `${BSC_SERVER}account/erc20/balances?chain=bsc&chain_name=mainnet&address=${address}`,
  //   {
  //     headers: { Authorization: `Bearer ${token}` },
  //   },
  // );
  const tokenBalances = await Moralis.Web3.getAllERC20({ address, chain });
  if (!tokenBalances) {
    throw new Error('no data found');
  }
  return tokenBalances;
};

export const getBalance = async (address: string) => {
  const token = localStorage.getItem('MORALIS_TOKEN');
  if (!token) {
    throw new Error('Can not connect to moralis');
  }
  const tokenBalances = await axios.get(
    `${BSC_SERVER}account/balance?chain=bsc&chain_name=mainnet&address=${address}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!tokenBalances) {
    throw new Error('no data found');
  }
  return tokenBalances;
};

export const getRecentTransactions = async (
  address: string,
  chain: string = 'bsc',
) => {
  const tokenTransactions = await Moralis.Web3.getTransactions({
    address,
    chain,
    order: 'desc',
  });
  if (!tokenTransactions) {
    throw new Error('no data found');
  }
  return tokenTransactions;
};
