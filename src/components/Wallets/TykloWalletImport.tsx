import React, { useMemo } from 'react';
import { Button, Checkbox } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useTykloStyles } from './styles';

const TykloWalletImport = () => {
  const classes = useTykloStyles();
  const { t } = useTranslation();
  const screenText = useMemo(() => {
    return {
      header: t('TYLKO_IMPORT_HEADER'),
      label: t('TYLKO_IMPORT_LABEL'),
      placeholder: t('TYLKO_IMPORT_PLACEHOLDER'),
      agreement_msg: t('TYLKO_IMPORT_AGREEMENT_MSG'),
      button_text: t('TYLKO_IMPORT_BUTTON_TEXT'),
    };
  }, [t]);
  const handleClick = () => {};
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
        <textarea
          id="mneumonic"
          name="mneumonic"
          rows={10}
          cols={30}
          className={classes.textArea}
          placeholder={screenText.placeholder}
        />
        {/* eslint-disable-next-line react/void-dom-elements-no-children */}
        <div className={classes.checkbox_wrapper}>
          <Checkbox className="" />
          <div className={classes.msg}>{screenText.agreement_msg}</div>
        </div>

        <Button
          variant="contained"
          className={classes.button}
          onClick={handleClick}
        >
          {screenText.button_text}
        </Button>
      </div>
    </div>
  );
};

export default TykloWalletImport;
