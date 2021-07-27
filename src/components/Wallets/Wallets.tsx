import React, { useMemo } from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWalletStyles } from './styles';
import PortfolioTrack from './PortfolioTrack';

const Wallet = () => {

  const classes = useWalletStyles();
  const { t } = useTranslation();
  const screenText = useMemo(() => {
    return {
      walletHeader: t('WALLET_HEADER'),
      walletMetamask: t('WALLET_METAMASK'),
      walletTyklo: t('WALLET_TYKLO'),
    };
  }, [t]);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>{screenText.walletHeader}</div>
      <div className={classes.wrapper}>
        <Link to="/wallet/metamask" className={classes.wallet}>
          <img
            src={require('assets/icon-metamask.png').default}
            alt="Metamask Icon"
            className={classes.metamask_icon}
          />
          <div className={classes.wallet_text}>{screenText.walletMetamask}</div>
        </Link>
        <div className={classes.partition} />
        <Link to="/wallet/tyklo" className={classes.wallet}>
          <img
            src={require('assets/main-logo.png').default}
            alt="Metamask Icon"
            className={classes.tyklo_icon}
          />
          <div className={classes.wallet_text}>{screenText.walletTyklo}</div>
        </Link>
      </div>
      <PortfolioTrack />
    </div>
  );
};

export default React.memo(Wallet);
