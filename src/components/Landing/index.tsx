import { Grid, Paper, makeStyles, Button, Avatar } from '@material-ui/core';
import React from 'react';
import BannerHome from 'assets/banner-home.png';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 40,
  },
  paper: {
    padding: '48px 60px',
    backgroundImage: `url(${BannerHome})`,
    backgroundSize: 'contain',
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  tagLine: {
    marginTop: 10,
  },
  walletBtn: {
    color: theme.colors.white,
    backgroundColor: theme.colors.secondary,
    textTransform: 'capitalize',
    marginTop: 30,
  },
  subSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  subSectionPaper: {
    padding: '35px 25px',
    backgroundColor: theme.colors.secondary,
    margin: '20px 10px 10px 0',
    color: theme.colors.white,
  },
  subSectionInfoText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subSectionTagLine: {
    marginTop: 10,
    fontSize: 16,
  },
  subSectionIcon: {
    height: 64,
    width: 64,
    marginBottom: 30,
  },
}));

const Landing = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.infoText}>
          {t('CONNECT_TO_START_USING')}
          <br />
          {t('TYLKO_CRYPTO_DEFI_WALLET')}
        </div>
        <div className={classes.tagLine}> TAG_LINE</div>
        <Button
          className={classes.walletBtn}
          onClick={() => console.log('true')}
        >
          {t('CONNECT_WALLET')}
        </Button>
      </Paper>
      <div className={classes.subSection}>
        <Paper className={classes.subSectionPaper}>
          <img
            className={classes.subSectionIcon}
            src={require('assets/icon-secure.png').default}
            alt="secure"
          />
          <div className={classes.subSectionInfoText}>
            {t('SECURE_CONNECT_AND_MONITOR')}
          </div>
          <div className={classes.subSectionTagLine}>
            {' '}
            {t('TRACK_FULL_PORTFOLIO_THROUGH_DEFI')}
          </div>
        </Paper>
        <Paper className={classes.subSectionPaper}>
          <img
            className={classes.subSectionIcon}
            src={require('assets/icon-portfolio.png').default}
            alt="secure"
          />
          <div className={classes.subSectionInfoText}>
            {t('GROW_PORTFOLIO_WITH_DEX_EXCHANGE')}
          </div>
          <div className={classes.subSectionTagLine}>
            {' '}
            {t('FIND_BEST_EXCHANGE_ACROSS_LEADING_DEXES')}
          </div>
        </Paper>
        <Paper className={classes.subSectionPaper}>
          <img
            className={classes.subSectionIcon}
            src={require('assets/icon-crypto.png').default}
            alt="secure"
          />
          <div className={classes.subSectionInfoText}>
            {t('BUY_CRYPTOCURRENCY_WITH_FIAT_GATEWAY')}
          </div>
          <div className={classes.subSectionTagLine}>
            {' '}
            {t('USE_DEBIT_CARD_TO_PURCHASE')}
          </div>
        </Paper>
      </div>
    </Grid>
  );
};

export default Landing;
