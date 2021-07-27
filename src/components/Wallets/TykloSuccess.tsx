import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom';
import { useTykloStyles } from './styles';

const TykloSuccess = () => {
  const classes = useTykloStyles();

  const { t } = useTranslation();
  const history = useHistory();

  const screenText = useMemo(() => {
    return {
      header: t('TYKLO_SUCCESS_HEADING'),
      subHeading1: t('TYKLO_SUCCESS_SUB_HEADING_1'),
      subHeading2: t('TYKLO_SUCCESS_SUB_HEADING_2'),
      buttonText: t('TYKLO_SUCCESS_BUTTON_TEXT')
    };
  }, [t]);

  const handleClick = () => {
    console.log('success');
    history.push('/wallet/details');
  };

  return (
    <div className={classes.containerImport} >
      <div className={classes.content}>
        <img
          src={require('assets/main-logo.png').default}
          alt="Metamask Icon"
          className={classes.logo}
        />
      </div>
      <div className={classes.content}>
        <Typography
          component="h2"
          className={classes.h2}
          color="textSecondary"
        >
          {screenText.header}
        </Typography>
        <Typography component="p" className={classes.title}>
          {screenText.subHeading1}
        </Typography>
        <Typography component="p" className={classes.title}>
          {screenText.subHeading2}
        </Typography>
      </div>
      <div className={classes.content} >
        <Button
          variant="contained"
          className={classes.buttonNext}
          onClick={handleClick}
        >
          {screenText.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default TykloSuccess;
