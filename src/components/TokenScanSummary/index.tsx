import React, { useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, Paper, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import { generateToken } from 'api/moralis/base';
import { useParams } from 'react-router-dom';
import { useBSCStatementContext } from 'context/BSCStatementContext';
import { useStatementContext } from 'context/StatementContext';
import { formatUsd } from 'utils/formatUsd';
import ETHTokenList from '../ETHTokenList';
import BSCTokenList from '../BSCTokenList';
import AllTokenList from '../AllTokens';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    style: {
      flex: 1,
    },
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.colors.secondary,
    marginLeft: 166,
    marginRight: 166
  },
  paper: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white,
    padding: 20,
    width: '40%',
    marginTop: 55,
    marginBottom: 20,
    marginLeft: 166,
    marginRight: 166
  },
  totalPortfolio: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  portfolioValue: {
    flexDirection: 'column',
  },
  flex_row: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  totalPortfolioValue: {
    fontSize: 40,
  },
  assetsDebts: {
    marginTop: 20,
  },
  walletIcon: {
    height: 60,
    width: 60,
    marginRight: 20,
  },
  textHeading: {
    color: `${theme.colors.white}7A`,
  },
  chainBtn: {
    backgroundColor: `${theme.colors.white}1A`,
    color: theme.colors.white,
    margin: '20px 10px 20px 10px',
    minWidth: 140,
  },
  chainBtnActive: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.secondary,
  },
}));

export default function TokenScanSummary() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = React.useState('all');
  const [moralisToken, setMoralisToken] = React.useState(
    localStorage.getItem('MORALIS_TOKEN'),
  );
  const { address } = useParams<any>();

  const { fetchBalances, loading, tokenList } = useBSCStatementContext();

  const {
    // addressesString,
    // startDate,
    // endDate,
    isFetching,
    // error,
    // hasFetched,
    // setAddressesString,
    fetchTransactions,
    startAssetsData,
    endAssetsData: { totalValueOfAllTokens, tokensAndPrices },
  } = useStatementContext();

  useEffect(() => {
    async function getToken() {
      const token = await generateToken();
      if (token) {
        setMoralisToken(token);
      }
    }
    getToken();
  }, []);

  useEffect(() => {
      fetchBalances(address);
      fetchTransactions();
  }, [address, fetchBalances, fetchTransactions]);

  const totalVal = totalValueOfAllTokens + tokenList.totalValueOfAllTokens;

  return (
    <>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.totalPortfolio}>
          <img
            src={require('assets/icon-wallet.png').default}
            className={classes.walletIcon}
            alt="wallet"
          />
          <div className={classes.portfolioValue}>
            <div className={classes.textHeading}>Net Worth</div>
            <div className={classes.totalPortfolioValue}>
              {formatUsd(totalVal ?? 0)}
            </div>
            <div className={clsx(classes.flex_row, classes.assetsDebts)}>
              <div className={classes.textHeading}>Total debts</div>
              <div>$0</div>
            </div>
            <div className={classes.flex_row}>
              <div className={classes.textHeading}>To be claimed</div>
              <div>$0</div>
            </div>
          </div>
        </div>
      </Paper>
      <div className={classes.root}>
        <Button
          className={clsx(
            classes.chainBtn,
            activeTab === 'all' ? classes.chainBtnActive : '',
          )}
          onClick={() => setActiveTab('all')}
        >
          All Tokens
        </Button>
        <Button
          className={clsx(
            classes.chainBtn,
            activeTab === 'eth' ? classes.chainBtnActive : '',
          )}
          onClick={() => setActiveTab('eth')}
        >
          Ethereum
        </Button>
        <Button
          className={clsx(
            classes.chainBtn,
            activeTab === 'bsc' ? classes.chainBtnActive : '',
          )}
          onClick={() => setActiveTab('bsc')}
        >
          BSC
        </Button>
        {activeTab === 'all' && <AllTokenList />}
        {activeTab === 'eth' && <ETHTokenList />}
        {activeTab === 'bsc' && <BSCTokenList />}
        {/* <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Ethereum (ETH)" {...a11yProps(1)} />
            <Tab label="Binance (BSC)" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ETHTokenList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BSCTokenList />
        </TabPanel> */}
      </div>
    </>
  );
}
