import React, { useEffect, useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import {
  fade,
  makeStyles,
  Theme,
  withStyles,
  createStyles,
} from '@material-ui/core/styles';
import { Label } from 'components/UI';
import { useTranslation } from 'react-i18next';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import i18n from 'i18n';
import { LANGUAGE } from 'constants/config';
import InterfaceLanguage from './InterfaceLanguage';

const MyNativeSelect = withStyles({
  root: {
    width: 200,
  },
  icon: {
    color: 'white',
    marginRight: 5,
  },
})(NativeSelect);

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.colors.darkGray,
      color: 'white',
      border: '1px solid #ced4da',
      fontSize: 14,
      width: '9em',
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        backgroundColor: theme.colors.darkGray,
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 8em',
      display: 'flex',
      marginBottom: '2em',
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
    header: {
      color: theme.colors.white,
      fontSize: 24,
      marginBottom: '12px',
    },
    title: {
      color: theme.colors.white,
      fontSize: 14,
      marginBottom: '12px',
    },
    subTitle: {
      color: '#d3d3d3',
      fontSize: 12,
    },
    perfWrap: {
      background: 'black',
      padding: '18px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '8px 0px',
    },
    switch: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
    },
    switchValue: {
      color: 'white',
    },
    switch_track: {
      backgroundColor: 'white',
    },
    switch_base: {
      color: 'white',
      '&.Mui-checked': {
        color: theme.colors.primary,
      },
      '&.Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.colors.primary,
      },
    },
    switch_primary: {
      '&.Mui-checked': {
        color: theme.colors.primary,
      },
      '&.Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.colors.primary,
      },
    },
    slip: {
      marginTop: 5,
    },
    tolerancevalue: {
      color: 'white',
      cursor: 'pointer',
    },
    tolerancevalueActive: {
      color: 'black',
      cursor: 'pointer',
      background: theme.colors.primary,
    },
    tolerance: {
      display: 'flex',
      color: 'white',
      fontWeight: 'bold',
      background: theme.colors.darkGray,
    },
    flagBtn: {
      background: theme.colors.darkGray,
      color: 'white',
      fontWeight: 'bold',
      padding: '0 0.8em',
    },
    country: {
      display: 'flex',
      alignItems: 'center',
    },
    countrytxt: {
      margin: '0 12px',
    },
    keyarrow: {
      marginRight: -10,
    },
  }),
);

export default function Setting() {
  const classes = useStyles();
  const [performanceSwitch, setperformanceSwitch] = React.useState(false);
  const [currency, setcurrency] = React.useState('usd');
  const [country, setcountry] = React.useState('English');
  const [tolerance, settolerance] = React.useState(-1);
  const [gas, setgas] = React.useState('');
  const [exchange, setexchange] = React.useState('all');
  const [showlngModal, setshowlngModal] = React.useState(false);
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setperformanceSwitch(event.target.checked);
  };

  const setCurrency = (event: React.ChangeEvent<{ value: unknown }>) => {
    setcurrency(event.target.value as string);
    setshowlngModal(true);
  };

  const gasPrice = (val: string) => {
    setgas(val);
  };

  const slipTolerance = (val: number) => {
    settolerance(val);
  };

  const getImg = () => {
    if (country === LANGUAGE[0] || country === 'English') {
      return require('assets/flag-uk.svg');
    }
    if (country === LANGUAGE[0]) {
      return require('assets/flag-polish.svg');
    }
    return require('assets/flag-spanish.svg');
  };

  const changeLng = async (lang: string) => {
    let selectedLang;
    if (lang === LANGUAGE[0]) {
      selectedLang = 'en';
      setcountry('English');
    } else if (lang === LANGUAGE[1]) {
      selectedLang = 'pl';
      setcountry(LANGUAGE[1]);
    } else {
      selectedLang = 'pl';
      setcountry(LANGUAGE[2]);
    }
    try {
      window.localStorage.i18nextLng = selectedLang;
      setshowlngModal(false);
      console.log(country, '1');
      await i18n.changeLanguage(selectedLang);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Label variant="h2" className={classes.header} text="SIDENAV_SETTING" />

        <div>
          <Label
            variant="h6"
            className={classes.subTitle}
            text="SETTING_BASICS"
          />

          <div className={classes.perfWrap}>
            <div>
              <Label
                variant="h2"
                className={classes.title}
                text="SETTING_PERFORMANCE_TITLE"
              />
              <Label
                variant="h2"
                className={classes.subTitle}
                text="SETTING_PERFORMANCE_SUBTITLE"
              />
            </div>
            <div className={classes.switch}>
              <p className={classes.switchValue}>
                {performanceSwitch ? t('ON_SETTING') : t('OFF_SETTING')}
              </p>
              <Switch
                classes={{
                  track: classes.switch_track,
                  switchBase: classes.switch_base,
                  colorPrimary: classes.switch_primary,
                }}
                checked={performanceSwitch}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          </div>

          <div className={classes.perfWrap}>
            <div>
              <Label
                variant="h2"
                className={classes.title}
                text="SETTING_CURRENCY_TITLE"
              />
              <Label
                variant="h2"
                className={classes.subTitle}
                text="SETTING_CURRENCY_SUBTITLE"
              />
            </div>

            <div>
              <FormControl>
                <MyNativeSelect
                  id="demo-customized-select-native"
                  value={currency}
                  color="primary"
                  onChange={setCurrency}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  <option value="usd">$ USD</option>
                  <option value="inr">₹ INR</option>
                </MyNativeSelect>
              </FormControl>
            </div>
          </div>

          <div className={classes.perfWrap}>
            <div>
              <Label
                variant="h2"
                className={classes.title}
                text="SETTING_INTERFACE_TITLE"
              />
              <Label
                variant="h2"
                className={classes.subTitle}
                text="SETTING_INTERFACE_SUBTITLE"
              />
            </div>

            <div>
              <Button
                onClick={() => {
                  setshowlngModal(true);
                  console.log(showlngModal);
                }}
                className={classes.flagBtn}
              >
                <div className={classes.country}>
                  <img
                    width={30}
                    height={30}
                    src={getImg().default}
                    alt="secure"
                  />
                  <div className={classes.countrytxt}>{country}</div>
                </div>
                <div className={classes.keyarrow}>
                  <KeyboardArrowDownIcon />
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Label
            variant="h6"
            className={classes.subTitle}
            text="SETTING_EXCHANGE"
          />

          <div className={classes.perfWrap}>
            <div className={classes.slip}>
              <Label
                variant="h2"
                className={classes.title}
                text="SETTING_SLIPPAGE_TOLERANCE"
              />
            </div>
            <div className={classes.tolerance}>
              <Button
                className={
                  tolerance === 0.1
                    ? classes.tolerancevalueActive
                    : classes.tolerancevalue
                }
                onClick={() => slipTolerance(0.1)}
              >
                0.1%
              </Button>
              <Button
                className={
                  tolerance === 0.5
                    ? classes.tolerancevalueActive
                    : classes.tolerancevalue
                }
                onClick={() => slipTolerance(0.5)}
              >
                0.5%
              </Button>
              <Button
                className={
                  tolerance === 3
                    ? classes.tolerancevalueActive
                    : classes.tolerancevalue
                }
                onClick={() => slipTolerance(3)}
              >
                3.0%
              </Button>
            </div>
          </div>

          <div className={classes.perfWrap}>
            <div className={classes.slip}>
              <Label
                variant="h2"
                className={classes.title}
                text="SETTING_GAS_PRICE"
              />
            </div>
            <div className={classes.tolerance}>
              <Button
                className={
                  gas === 'slow'
                    ? classes.tolerancevalueActive
                    : classes.tolerancevalue
                }
                onClick={() => gasPrice('slow')}
                style={{ textTransform: 'capitalize' }}
              >
                Slow
              </Button>
              <Button
                className={
                  gas === 'normal'
                    ? classes.tolerancevalueActive
                    : classes.tolerancevalue
                }
                onClick={() => gasPrice('normal')}
                style={{ textTransform: 'capitalize' }}
              >
                Normal
              </Button>
              <Button
                className={
                  gas === 'fast'
                    ? classes.tolerancevalueActive
                    : classes.tolerancevalue
                }
                onClick={() => gasPrice('fast')}
                style={{ textTransform: 'capitalize' }}
              >
                Fast
              </Button>
            </div>
          </div>

          <div className={classes.perfWrap}>
            <div>
              <Label
                variant="h2"
                className={classes.title}
                text="SETTING_ENABLE_EXCHANGE"
              />
            </div>

            <div>
              <FormControl>
                <MyNativeSelect
                  id="demo-customized-select-native"
                  value={exchange}
                  color="primary"
                  onChange={setCurrency}
                  input={<BootstrapInput />}
                >
                  <option aria-label="None" value="" />
                  <option value="all">All</option>
                </MyNativeSelect>
              </FormControl>
            </div>
          </div>
        </div>
      </div>

      {showlngModal && (
        <InterfaceLanguage
          openModal={showlngModal}
          langSelected={country}
          onSubmit={(lang: string) => changeLng(lang)}
          onClose={() => setshowlngModal(false)}
        />
      )}
    </>
  );
}
