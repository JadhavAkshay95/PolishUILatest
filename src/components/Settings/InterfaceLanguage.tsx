import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import { LANGUAGE } from 'constants/config';
import { Button } from '@material-ui/core';
import { DesktopModal } from 'components/UI';

interface LangProps {
  onClose: any;
  openModal: boolean;
  onSubmit: any;
  langSelected: string;
}

const checkBoxStyles = (theme: Theme) => ({
  root: {
    color: 'white',
    '&$checked': {
      color: theme.colors.primary,
    },
  },
  checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '30em',
      display: 'flex',
      padding: '1em 1.4em',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'black',
      color: 'white',
      fontWeight: 'bold',
      fontSize: 14,
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #bdbdbd',
      padding: '5px 0',
    },
    selectLangWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    langtext: {
      marginRight: 10,
    },
    langcheck: {},
    btn: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '1em',
    },
    cancel: {
      padding: '8px 6em',
      border: '1px solid white',
      color: 'white',
    },
    submit: {
      padding: '8px 6em',
      marginLeft: '1em',
      background: theme.colors.primary,
    },
  }),
);

export default function InterfaceLanguage(props: LangProps) {
  const { openModal, langSelected } = props;
  const classes = useStyles();
  const [selectedlang, setselectedlang] = useState(langSelected);
  const [langs, setlangs] = useState(LANGUAGE);
  const [open, setopen] = useState(openModal);
  const { t } = useTranslation();

  const isSelected = (index: number) => {
    if (
      selectedlang?.toLowerCase() === 'english' ||
      selectedlang === LANGUAGE[0]
    ) {
      return index === 0;
    }
    if (selectedlang.toLowerCase() === 'polish') {
      return index === 1;
    }
    if (selectedlang.toLowerCase() === 'spanish') {
      return index === 2;
    }

    return false;
  };

  const getImg = (idx: number) => {
    if (idx === 0) {
      return require('assets/flag-uk.svg');
    }
    if (idx === 1) {
      return require('assets/flag-polish.svg');
    }
    return require('assets/flag-spanish.svg');
  };

  const showLangs = () => {
    const { onClose, onSubmit } = props;
    return (
      <>
        {langs.map((lang, idx) => {
          return (
            <div className={classes.header}>
              <div className={classes.selectLangWrapper}>
                <div className={classes.langtext}>
                  <img
                    width={40}
                    height={40}
                    src={getImg(idx).default}
                    alt="secure"
                  />
                </div>
                <div>{lang}</div>
              </div>
              <div className={classes.langcheck}>
                <CustomCheckbox
                  checked={isSelected(idx)}
                  onChange={() => setselectedlang(lang)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
            </div>
          );
        })}
        <div className={classes.btn}>
          <Button
            className={classes.cancel}
            onClick={() => {
              onClose();
            }}
          >
            {t('CANCEL_BTN')}
          </Button>
          <Button
            className={classes.submit}
            onClick={() => {
              onSubmit(selectedlang);
            }}
          >
            {t('SUBMIT_BTN')}
          </Button>
        </div>
      </>
    );
  };
  return (
    <DesktopModal
      isVisible={open}
      handleClose={() => setopen(false)}
      showCancelBtn={false}
    >
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div>{t('SETTING_INTERFACE_TITLE')}</div>
          <div
            onKeyPress={() => props.onClose()}
            onClick={() => props.onClose()}
            role="button"
            tabIndex={0}
          >
            <CloseIcon />
          </div>
        </div>

        {showLangs()}
      </div>
    </DesktopModal>
  );
}
