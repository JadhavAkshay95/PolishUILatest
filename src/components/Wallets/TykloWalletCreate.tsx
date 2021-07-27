import React, { useEffect, useMemo, useContext } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTykloStyles } from './styles';
import { useMneumonicWords } from './useMneumonicWords';
import { useUpdateTykloKey } from './TykloKeyContext';

const TykloWalletCreate = () => {
  const classes = useTykloStyles();
  const { mneumonicWords } = useMneumonicWords(12);
  const { t } = useTranslation();
  const updateTykloKey = useUpdateTykloKey();

  const screenText = useMemo(() => {
    return {
      header: t('TYLKO_CREATE_HEADER'),
      label: t('TYLKO_CREATE_LABEL'),
      placeholder: t('TYLKO_CREATE_PLACEHOLDER'),
      agreement_msg: t('TYLKO_CREATE_AGREEMENT_MSG'),
      button_text: t('TYLKO_CREATE_BUTTON_TEXT'),
    };
  }, [t]);
  const history = useHistory();

  useEffect(() => {
    /**
     * Check if user is loggedIn, If not then redirect to '/wallet/tyklo'
     */
    updateTykloKey(mneumonicWords.join(' '));
  }, [mneumonicWords, updateTykloKey]);

  const handleClick = () => {
    // tykloUpdateContext(mneumonicWords.join(' '));
    history.push(`/wallet/tyklo/create/backup`);
  };
  return (
    <div className={classes.containerImport}>
      <img
        src={require('assets/main-logo.png').default}
        alt="Metamask Icon"
        className={classes.logo}
      />
      <div className={classes.import_header}>{screenText.header}</div>
      <div className={classes.content}>
        <div className={classes.import_title}>{screenText.label}</div>
        <div className={classes.secret}>{mneumonicWords.join(' ')}</div>
        {/* eslint-disable-next-line react/void-dom-elements-no-children */}
        <div className={classes.msg}>{screenText.agreement_msg}</div>

        <Button
          variant="contained"
          className={classes.buttonNext}
          onClick={handleClick}
        >
          {screenText.button_text}
        </Button>
      </div>
    </div>
  );
};

export default TykloWalletCreate;
