import React, { ReactNode } from 'react';
import {
  makeStyles,
  TextField,
  InputAdornment,
  InputProps,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    height: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.colors.inputBorder,
      },
      '&:hover fieldset': {
        borderColor: theme.colors.inputBorder,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.colors.primary,
        borderRadius: 5,
      },
    },
  },
  focusEffects: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.colors.inputBorder}`,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        border: `1px solid ${theme.colors.primary}`,
      },
      '&.Mui-focused fieldset': {
        border: `1px solid ${theme.colors.primary}`,
        borderRadius: 6,
        backgroundColor: `${theme.colors.primary}1A`, // Ref: https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4 - for aplha value 0.1 => 1A
      },
    },
  },
  noborder: {
    border: 'none',
    borderRadius: 0,
  },
  input: {
    ...theme.typography.body2,
    color: `${theme.colors.white}`,
    backgroundColor: theme.colors.darkGray,
  },
  startAdornment: {
    paddingLeft: 8,
  },
  endAdornment: {
    paddingRight: 8,
  },
  adornment: {
    padding: 0,
    margin: 0,
  },
  disabled: {
    backgroundColor: theme.colors.secondary,
  },
}));

interface InputFieldProps {
  preAdornment?: ReactNode;
  postAdornment?: ReactNode;
  hasStartAdornment?: boolean;
  hasEndAdornment?: boolean;
  showFocusEffect?: boolean;
  [T: string]: any;
}

export const InputField = ({
  preAdornment,
  postAdornment,
  hasStartAdornment = false,
  hasEndAdornment = false,
  showFocusEffect = false,
  ...others
}: InputFieldProps) => {
  const classes = useStyles();
  const inputClasses = {
    classes: {
      input: classes.input,
      root: classes.root,
      focused: classes.noborder,
      adornedEnd: classes.endAdornment,
      adornedStart: classes.startAdornment,
      inputAdornedStart: classes.adornment,
      inputAdornedEnd: classes.adornment,
      disabled: classes.disabled,
    },
  };
  const inputProps: InputProps = { ...inputClasses };
  if (hasStartAdornment) {
    inputProps.startAdornment = (
      <InputAdornment position="start">{preAdornment}</InputAdornment>
    );
  }
  if (hasEndAdornment) {
    inputProps.endAdornment = (
      <InputAdornment position="end">{postAdornment}</InputAdornment>
    );
  }
  return (
    <TextField
      InputProps={{ ...inputProps }}
      {...others}
      classes={{
        root: classes.root,
      }}
      className={clsx(showFocusEffect && classes.focusEffects)}
    />
  );
};
