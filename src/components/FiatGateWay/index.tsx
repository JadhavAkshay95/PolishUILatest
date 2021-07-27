import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { InputField } from 'components/UI';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import Ethicon from '../../assets/ethereum-icon.png';
import DisclaimerIcon from '../../assets/dislaimer-inactive.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 8em',
      display: 'flex',
      marginBottom: '2em',
    },
    heading: {
      font: 'normal normal bold 30px/41px Arial',
      color: theme.colors.white,
    },
    fiatWrapper: {
      background: '#000000',
      color: '#ffffff',
      borderRadius: '5px',
      maxWidth: '420px',
      margin: 'auto',
      padding: '30px 30px 20px 30px',
      width: '100%',
    },
    title: {
      font: 'normal normal bold 20px/27px Open Sans',
      color: '#FFFFFF',
      marginBottom: 40,
      marginTop: 0,
    },
    ethIcon: {
      width: 38,
      marginRight: 15,
    },
    iconCurrWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
    iconCurr: {
      font: 'normal normal normal 28px/38px Open Sans',
      color: '#FFFFFF',
      margin: 0,
    },
    pointsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      font: 'normal normal 600 14px/19px Open Sans',
      padding: '5px 0',
    },
    pointCurrency: {
      display: 'flex',
      alignItems: 'center',
    },
    disclaimerIcon: {
      width: 15,
      marginLeft: 10,
    },
    btn: {
      backgroundColor: theme.colors.primary,
      width: '100%',
      textTransform: 'capitalize',
      marginTop: '20px',
    },
  }),
);

const MyNativeSelect = withStyles({
  root: {
    width: 60,
    height: 37,
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
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      position: 'relative',
      backgroundColor: theme.colors.darkGray,
      color: 'white',
      fontSize: 14,
      width: '100%',
      padding: '10px 26px 10px 12px',
    },
  }),
)(InputBase);

export default function FiatGateWay() {
  const classes = useStyles();

  const [currency, setcurrency] = React.useState('usd');

  return (
    <>
      <div className={classes.wrapper}>
        <h2 className={classes.heading}>FIAT Gateway</h2>

        <div className={classes.fiatWrapper}>
          <h4 className={classes.title}>Purchase With FIAT</h4>
          <div className={classes.iconCurrWrapper}>
            <img src={Ethicon} alt="Eth icon" className={classes.ethIcon} />
            <p className={classes.iconCurr}>
              <b style={{ marginRight: 10 }}>0.00</b>
              <span>ETH</span>
            </p>
          </div>

          <div style={{ display: 'flex', marginBottom: 20 }}>
            <InputField hiddenLabel variant="outlined" style={{ width: 'calc(100% - 80px)' }} />
            <FormControl>
              <MyNativeSelect
                id="demo-customized-select-native"
                value={currency}
                color="primary"
                //   onChange={setcurrency}
                input={<BootstrapInput />}
                style={{ width: '80px' }}
              >
                <option aria-label="None" value="" />
                <option value="usd">$ USD</option>
                <option value="inr">₹ INR</option>
              </MyNativeSelect>
            </FormControl>
          </div>

          <div className={classes.pointsWrapper}>
            <span style={{ opacity: 0.7 }}>Estimated Cost</span>
            <div className={classes.pointCurrency}>
              <span>US$0.00</span>
              <img
                src={DisclaimerIcon}
                alt="disclaimer icon"
                className={classes.disclaimerIcon}
              />
            </div>
          </div>
          <div className={classes.pointsWrapper}>
            <span style={{ opacity: 0.7 }}>Price Impact</span>
            <div className={classes.pointCurrency}>
              <span>0.00 %</span>
              <img
                src={DisclaimerIcon}
                alt="disclaimer icon"
                className={classes.disclaimerIcon}
              />
            </div>
          </div>
          <div className={classes.pointsWrapper}>
            <span style={{ opacity: 0.7 }}>Minimum Received</span>
            <div className={classes.pointCurrency}>
              <span>0 USDT</span>
              <img
                src={DisclaimerIcon}
                alt="disclaimer icon"
                className={classes.disclaimerIcon}
              />
            </div>
          </div>

          <Button className={classes.btn}>Continue</Button>
        </div>
      </div>
    </>
  );
}
