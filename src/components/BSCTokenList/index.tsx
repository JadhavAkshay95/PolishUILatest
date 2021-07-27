import React, { useEffect, useState, useCallback } from 'react';
// import clsx from 'clsx';
import { useParams } from 'react-router-dom';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { getERC20Balances } from 'api/moralis/accounts';
import { useBSCStatementContext } from 'context/BSCStatementContext';

import BSCTokenList from './BSCTokenList';

export default function TokenList() {
  const { address } = useParams<any>();

  const { fetchBalances, loading, tokenList } = useBSCStatementContext();

  // useEffect(() => {
  //   fetchBalances(address);
  // }, [address]);

  if (!loading && (!tokenList || !tokenList.tokensAndPrices)) return null;

  return (
    <>
      <BSCTokenList loading={loading} tokens={tokenList} />
    </>
  );
}
