import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';


const StyledMenuItem = withStyles((theme) => ({
  root: {
    height: '3.125rem',
    backgroundColor: theme.colors.dropdownColor,
    padding: '0.875rem 1.3125rem',
    borderBottom: `0.0625rem solid ${theme.colors.inputBorder}`,
    color: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '&:hover $hov': {
      visibility: 'visible',
    },
    '&:hover $names': {
      '& span': {
        color: theme.colors.primary,
      },
    },
    '&:last-child': {
      borderBottom: 'none',
    }
  },
}))(MenuItem);

export default StyledMenuItem;