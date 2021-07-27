const DEFAULT_STYLE = {
  lineHeight: 'normal',
  letterSpacing: 0,
  textTransform: 'none',
};

export const REGULAR_FONT = 400;
export const BOLD_FONT_MEDIUM = 'bold';
export const BOLD_FONT = 600;
export const EXTRA_BOLD_FONT = 800;

const Typography = {
  fontFamily: 'Roboto, Arial',
  fontWeightRegular: REGULAR_FONT,
  fontWeightBold: BOLD_FONT,
  fontWeightMedium: BOLD_FONT_MEDIUM,
  h1: {
    ...DEFAULT_STYLE,
    fontWeight: BOLD_FONT,
    fontSize: 24,
    textTransform: 'none',
  },
  h2: {
    ...DEFAULT_STYLE,
    fontWeight: BOLD_FONT,
    fontSize: 18,
  },
  h3: {
    ...DEFAULT_STYLE,
    fontWeight: REGULAR_FONT,
    fontSize: 18,
  },
  body1: {
    ...DEFAULT_STYLE,
    fontWeight: BOLD_FONT,
    fontSize: 16,
  },
  body2: {
    ...DEFAULT_STYLE,
    fontWeight: REGULAR_FONT,
    fontSize: 16,
  },
  caption: {
    ...DEFAULT_STYLE,
    fontWeight: REGULAR_FONT,
    fontSize: 14,
  },
  subtitle1: {
    ...DEFAULT_STYLE,
    fontWeight: BOLD_FONT,
    fontSize: 14,
  },
  subtitle2: {
    ...DEFAULT_STYLE,
    fontWeight: BOLD_FONT,
    fontSize: 12,
  },
  overline: {
    ...DEFAULT_STYLE,
    fontWeight: REGULAR_FONT,
    fontSize: 12,
  },
};

export default Typography;
