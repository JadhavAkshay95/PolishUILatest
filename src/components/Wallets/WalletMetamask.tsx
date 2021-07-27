import React, { useMemo, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { AddressContext } from 'context/AddressContext';
import { checkMetaMaskInstallation, getAccounts } from './metamask';
import { useWalletStyles } from './styles';

const WalletMetamask = () => {
  const classes = useWalletStyles();
  // const { t } = useTranslation();
  const history = useHistory();
  const context = useContext(AddressContext);

  if (!checkMetaMaskInstallation()) {
    window.location.replace('https://metamask.io/');
  }

  useEffect(() => {
    (async () => {
      try {
        const accounts = await getAccounts();
        if (accounts) {
          localStorage.setItem('address', accounts[0]);
          context?.setIsAddressAvailable(accounts[0]);
          history.push('/wallet/details');
        } else {
          throw new Error('Unable to fetch accounts');
        }
      } catch (error) {
        console.error(error);
        history.push('/wallet');
      }
    })();
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>Connect to Metamask</div>
      <div className={classes.heading}>Connecting...</div>
    </div>
  );
};

export default React.memo(WalletMetamask);
