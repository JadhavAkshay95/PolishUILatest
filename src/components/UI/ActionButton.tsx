import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles, Button } from '@material-ui/core';
import theme from 'theme';
import { Loader } from './Loader';

interface ActionButtonStyleProps {
  backgroundColor: string;
  color: string;
}

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 20px',
    width: '100%',
    color: (props: ActionButtonStyleProps) =>
      (theme.colors as any)[props.color],
    background: (props: ActionButtonStyleProps) =>
      (theme.colors as any)[props.backgroundColor],
    borderRadius: 20,
    '&:hover': {
      backgroundColor: (props: ActionButtonStyleProps) =>
        (theme.colors as any)[props.backgroundColor],
    },

    '&.MuiButton-root.Mui-disabled': {
      color: theme.colors.white,
    },
  },
  loader: {
    marginLeft: 10,
  },
}));

interface ActionButtonProps {
  color?: any;
  backgroundColor?: any;
  children?: ReactNode;
  showLoading?: boolean;
  className?: string;
  loaderColor?: string;
  [T: string]: any;
}

export const ActionButton = ({
  color = 'white',
  backgroundColor = 'primary',
  children,
  showLoading,
  className,
  loaderColor = 'white',
  ...others
}: ActionButtonProps) => {
  const { root, loader } = useStyles({ color, backgroundColor });

  return (
    <Button
      classes={{
        root: clsx(root, className),
      }}
      disabled={showLoading}
      disableElevation
      disableFocusRipple
      disableRipple
      {...others}
    >
      {children}
      {showLoading && <Loader color={loaderColor} className={loader} />}
    </Button>
  );
};
