import React from 'react';
import { ReactComponent as LoadingIcon } from 'assets/svg/loader.svg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  loader: {
    width: 24,
    height: 24,
    animation: '$rotation 6s infinite linear',
    '& path': {
      fill: (props: { color?: string }) =>
        props.color ? (theme.colors as any)[props.color] : 'currentColor',
    },
  },
}));

interface LoaderProps {
  className?: string;
  color?: string;
  dataLoader?: string;
  loaderIconClass?: any;
}

export const Loader = ({
  className = '',
  color,
  dataLoader,
  loaderIconClass,
}: LoaderProps) => {
  const classes = useStyles({ color });
  return (
    <div
      data-testid="loader"
      data-loader={dataLoader}
      className={`${classes.loader} ${className}`}
    >
      <LoadingIcon className={loaderIconClass} />
    </div>
  );
};
