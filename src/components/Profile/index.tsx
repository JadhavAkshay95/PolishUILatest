import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      marginTop: 64,
    },
  }),
);

const Profile = () => {
  const classes = useStyles();
  return <div className={classes.wrapper}>this is profile page</div>;
};

export default Profile;
