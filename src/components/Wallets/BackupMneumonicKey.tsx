import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useTykloStyles } from './styles';
import { useMneumonicWords } from './useMneumonicWords';
import { useTykloKey } from './TykloKeyContext';

function shuffle(array: string[]) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    // eslint-disable-next-line no-plusplus
    currentIndex--;

    // And swap it with the current element.
    // eslint-disable-next-line no-param-reassign
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const BackupMneumonicKey = () => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const history = useHistory();

  const classes = useTykloStyles();
  const { t } = useTranslation();
  const tykloKey = useTykloKey();
  const tykloSuggestions = useMemo(
    () => shuffle(tykloKey.split(' ')),
    [tykloKey],
  );
  const screenText = useMemo(() => {
    return {
      header: t('TYLKO_BACKUP_HEADER'),
      label: t('TYLKO_BACKUP_LABEL'),
      placeholder: t('TYLKO_BACKUP_PLACEHOLDER'),
      error_msg: t('TYLKO_BACKUP_ERROR_MSG'),
      button_text: t('TYLKO_BACKUP_BUTTON_TEXT'),
    };
  }, [t]);
  const handleClick = (word: string) =>
    setAnswer((prevAns) => `${prevAns} ${word}`);
  const handleSubmit = () => {
    console.log('Answer is: ', answer);
    console.log('Tyklo key: ', tykloKey);
    if (
      tykloKey.split(' ').join(' ').trim() !==
      answer.split(' ').join(' ').trim()
    ) {
      setError(true);
    } else {
      setError(false);
      history.push(`/wallet/tyklo/success`);
    }
  };

  useEffect(() => {
    if (!tykloKey) {
      history.push(`/wallet/tyklo/create`);
    }
  }, [history, tykloKey]);

  return (
    <div className={classes.containerMneumonic}>
      <img
        src={require('assets/main-logo.png').default}
        alt="Logo"
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
          className={classes.mneumonicContainer}
          placeholder={screenText.placeholder}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        {error && <div className={classes.msg}>{screenText.error_msg}</div>}
        <div className={classes.wrapper_mneumonicOptions}>
          {tykloSuggestions.map((word) => (
            <Button
              variant="contained"
              className={classes.btn_mneumonicOptions}
              onClick={() => handleClick(word)}
              key={word}
            >
              {word}
            </Button>
          ))}
        </div>
        <Button
          variant="contained"
          className={classes.buttonNext}
          onClick={handleSubmit}
        >
          {screenText.button_text}
        </Button>
      </div>
    </div>
  );
};

export default BackupMneumonicKey;
