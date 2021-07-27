import React, { useMemo, useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { useWalletDetailStyles } from './styles';
import { checkMetaMaskInstallation, getAccounts, getBalance } from './metamask';
import WalletDetailsCurrency from './WalletDetailsCurrency';
import WalletDetailsCurrencyDetails from './WalletDetailsCurrencyDetails';
import { generateToken } from '../../api/moralis/base';
import { getERC20Balances } from '../../api/moralis/accounts';

// const Moralis = require('moralis');

const WalletDetails = () => {
  const classes = useWalletDetailStyles();
  const [currencyList, setCurrencyList] = useState<any>([]);
  const [address, setAddress] = useState('');
  // const { t } = useTranslation();
  // const screenText = useMemo(() => {
  //   return {
  //     walletHeader: t('WALLET_HEADER'),
  //     walletMetamask: t('WALLET_METAMASK'),
  //     walletTyklo: t('WALLET_TYKLO'),
  //   };
  // }, [t]);

  const history = useHistory();

  if (!checkMetaMaskInstallation()) {
    history.push('/wallet');
  }

  useEffect(() => {
    (async () => {
      try {
        const token =
          localStorage.getItem('MORALIS_TOKEN') || (await generateToken());
        if (token) {
          const accounts = await getAccounts();
          if (accounts) {
            setAddress(accounts[0]);
            const balances = (
              await getERC20Balances(accounts[0], 'testnet')
            ).map((bal: any) => ({
              name: bal.name,
              balance: (+bal.balance / 1000000000000000000).toFixed(5),
              symbol: bal.symbol,
              logo: require(`assets/token-eth.png`).default,
            }));
            if (balances) {
              setCurrencyList(balances);
            } else {
              throw new Error('Unable to fetch balance');
            }
          } else {
            throw new Error('Unable to fetch accounts');
          }
        } else {
          throw new Error('Unable to fetch token from Moralis');
        }
      } catch (error) {
        console.error(error);
        history.push('/wallet');
      }
    })();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>Wallet</div>
      <div className={classes.wrapper}>
        <div className={classes.your_holding_box}>
          <h5 className={classes.box_heading}>Your Holdings</h5>
          <div className={classes.currency_container}>
            {currencyList.map((currency: any, i: number) => (
              <WalletDetailsCurrency currency={currency} active={i === 0} />
            ))}
          </div>
        </div>
        <div className={classes.coin_details_box}>
          {currencyList.length > 0 ? (
            <WalletDetailsCurrencyDetails
              address={address}
              currency={currencyList[0]}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(WalletDetails);
