import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Paper, Button } from '@material-ui/core';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useStatementContext } from 'context/StatementContext';
import { Label } from 'components/UI';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 20px',
      display: 'flex',
    },
    root: {
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 300,
      background: theme.colors.primary,
      padding: 20,
      boxShadow: '2px 3px #888888',
      marginTop: 30,
      [theme.breakpoints.up('md')]: {
        width: '65%',
        transform: 'translateX(25%)',
      },
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      color: theme.colors.primaryText,
      fontSize: 30,
      padding: '10px 20px 0px 0px',
    },
    subTitle: {
      color: theme.colors.primaryText,
      fontSize: 16,
      padding: '10px 20px 0px 0px',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.colors.white,
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.85),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(0),
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
    cardActions: {
      justifyContent: 'center',
      marginBottom: 20,
    },
    searcBtn: {
      backgroundColor: theme.colors.skyblue,
      color: theme.colors.white,
    },
    searchIconBtn: {
      fill: theme.colors.primaryText,
    },
    img: {
      height: 200,
      width: '100%',
      minWidth: 200,
    },
    imgWrapper: {
      flex: 7,
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'row',
      flex: 3,
    },
    cardInfo: {
      flexDirection: 'column',
    },
    chains: {
      display: 'flex',
    },
    chainTab: {
      padding: 5,
      backgroundColor: `${theme.colors.white}2A`,
      marginBottom: 20,
      marginRight: 5,
    },
    wallet: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.white,
      textTransform: 'capitalize',
      padding: '15px 35px',
      marginTop: 10,
    },
    go: {
      backgroundColor: theme.colors.secondary,
      color: theme.colors.white,
      textTransform: 'capitalize',
    },
  }),
);

export default function Dashboard() {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    addressesString,
    // startDate,
    // endDate,
    // isFetching,
    // error,
    // hasFetched,
    setAddressesString,
    // fetchTransactions,
  } = useStatementContext();
  const history = useHistory();

  const onSearch = () => {
    history.push(`/dashboard/${addressesString}`);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <div className={classes.cardInfo}>
              <Label
                variant="h2"
                className={classes.title}
                text="DOWNLOAD_WALLET"
              />
              <Label
                variant="body2"
                className={classes.subTitle}
                gutterBottom
                text="SEARCH_PORTFOLIO"
              />
              <div className={classes.chains}>
                <Paper className={classes.chainTab}>
                  <Label variant="body1">ETHEREUM</Label>
                </Paper>
                <Paper className={classes.chainTab}>
                  <Label variant="body1">BSC</Label>
                </Paper>
              </div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon classes={{ root: classes.searchIconBtn }} />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={addressesString}
                  onChange={(e) => setAddressesString(e.target.value)}
                  inputProps={{ 'aria-label': 'search' }}
                  endAdornment={
                    <Button className={classes.go} onClick={onSearch}>
                      GO
                    </Button>
                  }
                />
              </div>
              <Label
                variant="body2"
                className={classes.subTitle}
                text="OR_YOU_CAN"
                gutterBottom
              />
              <Button className={classes.wallet}>
                {t('CONNECT_EXISTING_WALLET')}
              </Button>
            </div>
            <div className={classes.imgWrapper}>
              <img
                src={require('assets/mock.png').default}
                className={classes.img}
                alt="portfolio"
              />
            </div>
          </CardContent>
          {/* <CardActions className={classes.cardActions}>
            <Button
              variant="contained"
              className={classes.searcBtn}
              disableElevation
              onClick={onSearch}
            >
              Search
            </Button>
          </CardActions> */}
        </Card>
      </div>
    </>
  );
}
