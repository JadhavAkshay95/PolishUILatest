import React, { useState, useMemo, useCallback } from 'react';

import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { usePortfolioStyles } from './styles';

const PortfolioTrack = () => {
  const [address, setAddress] = useState('');
  const classes = usePortfolioStyles();
  const { t } = useTranslation();
  const screenText = useMemo(() => {
    return {
      walletHeader: t('WALLET_PORTFOLIO_HEADER'),
      walletPortfolioLabel: t('WALLET_PORTFOLIO_INPUT_LABEL'),
      walletPortfolioButton: t('WALLET_PORTFOLIO_INPUT_BUTTON'),
    };
  }, [t]);
  const handleClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Etherium Address Entered: ', address);
  }, [address]);

  return (
    <>
      <div className={classes.portfolio_header}>{screenText.walletHeader}</div>
      <div className={classes.portfolio_address_wrapper}>
        <label htmlFor="address">
          {screenText.walletPortfolioLabel}
          <div className={classes.portfolio_input}>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="E.g. 0x3bE3082C368B67b849aC1e9f75D8793CFF6FF1ed"
            />
            <Button
              variant="contained"
              className={classes.portfolio_inputButton}
              onClick={handleClick}
            >
              {screenText.walletPortfolioButton}
            </Button>
          </div>
        </label>
      </div>
    </>
  );
};

export default PortfolioTrack;
