import React, { useEffect } from 'react';
import './App.css';
import { StatementContextProvider } from 'context/StatementContext';
import { BSCStatementContextProvider } from 'context/BSCStatementContext';
import { AuthenticationContextProvider } from 'context/AuthenticationContext';

import {
  CssBaseline,
  makeStyles,
  createStyles,
  Theme,
  Container,
} from '@material-ui/core';
import AppLanguage from 'components/Language';
import Header from './Header';
import SideNavBar from './SideNavBar';
import Routes from '../routes';
import TykloKeyContextProvider from './Wallets/TykloKeyContext';

const Moralis = require('moralis');

Moralis.initialize('els7xOpoxkJnsBqiUejRJkYxPfZfi1Y19F6Z8RHZ');
Moralis.serverURL = 'https://c2qemm0jqfwh.moralis.io:2053/server';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100vh',
      height: '100%',
    },
    layout: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      backgroundColor: theme.colors.darkGray,
    },
  }),
);

function App() {
  const { root, layout } = useStyles();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  // useEffect(() => {
  //   async function getERC20Token() {
  //   const balances = await Moralis.Web3.getAllERC20({address: "0x603baa6619f6d62321e58e1f2c0d472fbfc52ec9"});
  //   console.log(balances, "balcne in udee----------------")
  // }
  // getERC20Token();
  // }, [])

  return (
    <StatementContextProvider>
      <BSCStatementContextProvider>
        <AuthenticationContextProvider>
          <TykloKeyContextProvider>
            <div className={root}>
              <CssBaseline />
              <AppLanguage />
              <SideNavBar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
              />
              <div className={layout}>
                <Header handleDrawerToggle={handleDrawerToggle} />

                <Routes />
              </div>
            </div>
          </TykloKeyContextProvider>
        </AuthenticationContextProvider>
      </BSCStatementContextProvider>
    </StatementContextProvider>
  );
}

export default App;
