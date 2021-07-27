import React, { useState } from 'react';
import { DesktopModal, Label } from 'components/UI';
import { Button, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    color: theme.colors.white,
    padding: 30,
    maxWidth: 476,
    minWidth: 400,
    maxHeight: 575,
    overflowY: 'auto',
    '& form': {
      height: '100%',
      width: '100%',
    },
  },
  optionsWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: '20px 0',
    display: 'flex',
    '& .MuiButton-root:hover': {
      backgroundColor: theme.colors.inputBorder,
    },
  },
}));

const AppLanguage = () => {
  const [isModalVisible, setModalVisibility] = useState(true);
  const classes = useStyles();

  const setLanguage = localStorage.getItem('i18nextLng');
  const { i18n } = useTranslation();
  const onSelectLang = async (selectedLang: string) => {
    try {
      window.localStorage.i18nextLng = selectedLang;
      await i18n.changeLanguage(selectedLang);
    } catch (e) {
      console.log(e);
    }
  };
  if (setLanguage) {
    return null;
  }
  return (
    <DesktopModal
      isVisible={isModalVisible}
      handleClose={() => setModalVisibility(false)}
    >
      <div className={classes.root}>
        <Label text="SELECT_LANGUAGE" />
        <div className={classes.optionsWrapper}>
          <Button onClick={() => onSelectLang('en')}>
            <Label color="white" text="LNG_ENGLISH" />
          </Button>
          <Button onClick={() => onSelectLang('pl')}>
            {' '}
            <Label color="white" text="LNG_POLISH" />
          </Button>
        </div>
      </div>
    </DesktopModal>
  );
};

export default AppLanguage;
