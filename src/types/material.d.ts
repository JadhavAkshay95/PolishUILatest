import React from 'react';

type Color = {
  primary: React.CSSProperties['color'];
  secondary: React.CSSProperties['color'];
  white: React.CSSProperties['color'];
  primaryText: React.CSSProperties['color'];
  darkGray: React.CSSProperties['color'];
  dropdownColor: React.CSSProperties['color'];
  inputBorder: React.CSSProperties['color'];
  userInput: React.CSSProperties['color'];
  focusedInputBg: React.CSSProperties['color'];
  error: React.CSSProperties['color'];
  crimson: React.CSSProperties['color'];
  skyblue: React.CSSProperties['color'];
  red: React.CSSProperties['color'];
  green: React.CSSProperties['color'];
  cornflowerblue: React.CSSProperties['color'];
};

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: Color;
  }

  interface ThemeOptions {
    colors: Color;
  }
}
