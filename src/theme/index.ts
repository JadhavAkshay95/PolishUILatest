import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';

const theme = createMuiTheme({
  colors: { ...palette },
  typography: typography as any,
  overrides: {
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: 'none',
        },
      },
    },
  },
});

export default theme;
