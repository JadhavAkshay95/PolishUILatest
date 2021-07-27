import React, { useMemo } from 'react';

// import { useTranslation } from 'react-i18next';
import { useWalletDetailCurrencyStyles } from './styles';

const WalletDetailsCurrency = (props: any) => {
    const { currency, active } = props;
  const classes = useWalletDetailCurrencyStyles();
  const itemActiveClass = active ? ` ${classes.active}` : ``;
  // const { t } = useTranslation();
  // const screenText = useMemo(() => {
  //   return {
  //     walletHeader: t('WALLET_HEADER'),
  //     walletMetamask: t('WALLET_METAMASK'),
  //     walletTyklo: t('WALLET_TYKLO'),
  //   };
  // }, [t]);

  return (
    <div className={classes.currency_item + itemActiveClass}>
        <img className={classes.currency_logo} src={currency.logo} alt={currency.name} />
        <div className={classes.currency_details}>
            <span className={classes.currency_name}>{currency.name}</span>
            <span className={classes.currency_balance}>{currency.balance} {currency.symbol}</span>
        </div>
    </div>
  );
};

export default React.memo(WalletDetailsCurrency);
