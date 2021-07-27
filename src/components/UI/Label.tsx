import React, { ReactNode } from 'react';
import { Typography, makeStyles, TypographyVariant } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface LabelProps {
  children?: ReactNode;
  variant?: TypographyVariant;
  color?: string;
  className?: string;
  text?: string;
  [T: string]: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    color: (props: { color: string }) => (theme.colors as any)[props.color],
  },
}));

export const Label = ({
  children,
  variant = 'body1',
  color = 'dark',
  className,
  text,
  ...others
}: LabelProps) => {
  const { root } = useStyles({ color });
  const { t } = useTranslation();
  return (
    <Typography className={clsx(root, className)} variant={variant} {...others}>
      {text ? t(text) : children}
    </Typography>
  );
};
