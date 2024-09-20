import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";
import commonTheme from "./common";

export const {
  theme,
  styled,
  keyframes,
  createTheme,
  globalCss,
  css,
  getCssText,
  config,
} = createStitches(commonTheme);

export type CSS = Stitches.CSS<typeof config>;
export type VariantProps<T extends { [key: symbol | string]: unknown }> =
  Stitches.VariantProps<T>;
export type StitchesTheme = typeof theme;
