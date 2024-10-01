import type * as Stitches from "@stitches/react";

export const defaultTokens = {
  colors: {
    primary: "#2B2B2B",
    error: "#F04438",
    white: "#FFFFFF",
    white1: "#FFFCF6",
    beige: "#FEF7E6",
    grey1: "#F1EDED",
    green: "#45AB68",
    red1: "#CB4C4C",
    grey2: "#C8C8C8",
    grey3: "#757575",
    grey4: "#1F1F1F80",
    grey5: "#DCDCDC",
    secondary: "#F9C034",
    black: "#000000",
  },
  fonts: {
    Baloo: "Baloo",
    Inter: "Inter",
    Gilmer: "Gilmer",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    md: "1.15rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "1xl": "1.75rem",
    "2xl": "2rem",
    "3xl": "2.25rem",
    "3xxl": "2.5rem",
    "4xl": "3rem",
    10: "10px",
    18: "18px",
    14: "14px",
    20: "20px",
    24: "24px",
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {},
  letterSpacings: {},
  radii: {
    sm: "4px",
    xsm: "5px",
    md: "8px",
    base: "12px",
    lg: "14px",
    xl: "18px",
    squared: "33%",
    rounded: "50%",
    pill: "50%",
  },
  space: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "24px",
    6: "32px",
    7: "38px",
    8: "48px",
    10: "64px",
    12: "80px",
    13: "100px",
    14: "120px",
    20: "20px",
    30: "30px",
    40: "40px",
    50: "50px",
    headerHeight: "61px",
    sidebarWidth: "300px",
  },
  sizes: {
    1: "4px",
    2: "8px",
    3: "12px",
  },
  shadows: {
    md: "0px 4px 24px -1px $black33",
  },
};

export const defaultUtils = {
  bg: (value: Stitches.PropertyValue<"backgroundColor">) => ({
    background: value,
  }),
  bgImage: (value: Stitches.PropertyValue<"backgroundColor">) => ({
    backgroundImage: value,
  }),
  bgColor: (value: Stitches.PropertyValue<"backgroundColor">) => ({
    backgroundColor: value,
  }),

  dflex: (value: Stitches.PropertyValue<"alignItems">) => ({
    display: "flex",
    alignItems: value,
    justifyContent: value,
  }),

  p: (value: Stitches.PropertyValue<"padding">) => ({
    padding: value,
  }),
  pt: (value: Stitches.PropertyValue<"paddingTop">) => ({
    paddingTop: value,
  }),
  pr: (value: Stitches.PropertyValue<"paddingRight">) => ({
    paddingRight: value,
  }),
  pb: (value: Stitches.PropertyValue<"paddingBottom">) => ({
    paddingBottom: value,
  }),
  pl: (value: Stitches.PropertyValue<"paddingLeft">) => ({
    paddingLeft: value,
  }),
  px: (value: Stitches.PropertyValue<"paddingLeft">) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: Stitches.PropertyValue<"paddingTop">) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  m: (value: Stitches.PropertyValue<"margin">) => ({
    margin: value,
  }),
  mt: (value: Stitches.PropertyValue<"marginTop">) => ({
    marginTop: value,
  }),
  mr: (value: Stitches.PropertyValue<"marginRight">) => ({
    marginRight: value,
  }),
  mb: (value: Stitches.PropertyValue<"marginBottom">) => ({
    marginBottom: value,
  }),
  ml: (value: Stitches.PropertyValue<"marginLeft">) => ({
    marginLeft: value,
  }),
  mx: (value: Stitches.PropertyValue<"marginLeft">) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: Stitches.PropertyValue<"marginTop">) => ({
    marginTop: value,
    marginBottom: value,
  }),

  size: (value: Stitches.PropertyValue<"width">) => ({
    width: value,
    height: value,
  }),

  linearGradient: (value: Stitches.PropertyValue<"backgroundImage">) => ({
    backgroundImage: `linear-gradient(${value})`,
  }),
  textGradient: (value: Stitches.PropertyValue<"backgroundImage">) => ({
    backgroundImage: `linear-gradient(${value})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    "&::selection": {
      WebkitTextFillColor: "$colors$text",
    },
  }),
};

const commonTheme = {
  theme: defaultTokens,
  media: {
    xxs: "(min-width: 320px)",
    xs: "(min-width: 475px)",
    sm: "(min-width: 600px)",
    bssm: "(min-width: 769px)",
    md: "(min-width: 991px)",
    lg: "(min-width: 1199px)",
    xl: "(min-width: 1399px)",
    motion: "(prefers-reduced-motion)",
    hover: "(any-hover: hover)",
    dark: "(prefers-color-scheme: dark)",
    light: "(prefers-color-scheme: light)",
  },
  utils: defaultUtils,
};

export default commonTheme;
