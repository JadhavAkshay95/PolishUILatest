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
    backgroundColor: '#222222',
    borderRadius: 5,
    margin: '20px 0',
    fontSize: 14,
    '& a': {
      color: theme.colors.primary,
    }
  },
  iconButton: {
    padding: 5,
  },
  successIcon: {
    width: 46,
    height: 46,
    display: 'block',
    margin: '30px auto',
  },
  actionBtn: {
    height: 40,
    padding: 0,
    color: theme.colors.secondary,
    background: theme.colors.primary,
    borderRadius: 5,
    alignSelf: 'center',
  },
  infoMsg: {
    marginTop: 8,
    marginBottom: 15,
    color: theme.colors.white,
    textAlign: 'center',
  },
  infoMessage: {
    marginTop: 10,
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  address: {
    marginTop: 10,
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}));

export default useStyle;
