import React from 'react';
import Landing from 'components/Landing';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import Wallet from './Wallet';

const WalletWrapper = () => {
  const { isAuthenticated } = useAuthenticationContext();

  return <>{isAuthenticated ? <Wallet /> : <Landing />}</>;
};

export default WalletWrapper;
