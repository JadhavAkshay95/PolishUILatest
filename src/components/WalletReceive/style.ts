import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
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
  fields: {
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: `20px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: theme.colors.white,
    border: 'solid 1px #808080',
    borderRadius: 5,
    margin: '20px 0',
    textAlign: 'center',
  },
  iconButton: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  actionBtn: {
    height: 40,
    width: 220,
    padding: 0,
    margin: '0 auto',
    display: 'block',
    color: '#ffffff',
    backgroundColor: 'transparent',
    border: 'solid 1px #5c5c5c',
    borderRadius: 5,
    alignSelf: 'center',
    '&:hover': {
      backgroundColor: '#2c2c2c',
    }
  },
  infoMsg: {
    marginTop: 8,
    color: theme.colors.white,
  },
  infoMessage: {
    marginTop: 10,
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: 'normal',
  },
  address: {
    marginTop: 10,
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: 'normal',
  },
}));

export default useStyle;
