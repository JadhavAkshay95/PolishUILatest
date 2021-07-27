import React from 'react';
import Landing from 'components/Landing';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import Dashboard from './Dashboard';

const DashboardWrapper = () => {
  const { isAuthenticated } = useAuthenticationContext();

  return <>{isAuthenticated ? <Dashboard /> : <Landing />}</>;
};

export default DashboardWrapper;
