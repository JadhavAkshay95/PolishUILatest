import React, { lazy, Suspense, ReactElement } from 'react';
import './index.css';
import { Route, Switch } from 'react-router-dom';
import TykloKeyContextProvider from './components/Wallets/TykloKeyContext';

const DashboardWrapper = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));
const Farms = lazy(() => import('./components/Farms'));
const TokenScanSummary = React.lazy(
  () => import('./components/TokenScanSummary'),
);
const Wallet = lazy(() => import('./components/Wallets/Wallets'));
const Faq = lazy(() => import('./components/Faq/Faq'));
const Setting = lazy(() => import('./components/Settings/Settings'));
const WalletDetails = lazy(() => import('./components/Wallets/WalletDetails'));
const WalletMetamask = lazy(() => import('./components/Wallets/WalletMetamask'));
const TykloWallet = lazy(() => import('./components/Wallets/TykloWallet'));
const TykloWalletImport = lazy(
  () => import('./components/Wallets/TykloWalletImport'),
);
const TykloWalletCreate = lazy(
  () => import('./components/Wallets/TykloWalletCreate'),
);

const TykloWalletSuccess = lazy(
  () => import('./components/Wallets/TykloSuccess'),
);

const TykloWalletBackup = lazy(
  () => import('./components/Wallets/BackupMneumonicKey'),
);

const FiatGateWay = lazy(() => import('./components/FiatGateWay'));

const Routes = (): ReactElement => (
  <Switch>
    <Suspense fallback={<div>Loading...</div>}>
      <Route exact path="/" component={DashboardWrapper} />
      <Route exact path="/dashboard" component={DashboardWrapper} />
      <Route exact path="/dashboard/:address" component={TokenScanSummary} />
      <Route exact path="/farms" component={Farms} />
      <Route exact path="/wallet" component={Wallet} />
      <Route exact path="/faq" component={Faq} />
      <Route exact path="/setting" component={Setting} />
      <Route exact path="/wallet/details" component={WalletDetails} />
      <Route exact path="/wallet/metamask" component={WalletMetamask} />
      <Route exact path="/wallet/tyklo" component={TykloWallet} />
      <Route exact path="/wallet/tyklo/import" component={TykloWalletImport} />
      <Route exact path="/wallet/tyklo/create" component={TykloWalletCreate} />
      <Route
        exact
        path="/wallet/tyklo/create/backup"
        component={TykloWalletBackup}
      />
      <Route
        exact
        path="/wallet/tyklo/success"
        component={TykloWalletSuccess}
      />
      <Route
        exact
        path="/fiat-gateway"
        component={FiatGateWay}
      />
    </Suspense>
  </Switch>
);

export default Routes;
