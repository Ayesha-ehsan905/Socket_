import { styled } from "../../styles";

const Text = styled("div", {
  margin: "0",
  fontWeight: 400,
  fontVariantNumeric: "tabular-nums",
  "&.link": {
    cursor: "pointer",
    fontWeight: "$semibold",
  },
  variants: {
    size: {
      "10": {
        fontSize: "$10",
      },
      "12": {
        fontSize: "$12",
      },
      "14": {
        fontSize: "$14",
      },
      "16": {
        fontSize: "$16",
      },
      "18": {
        fontSize: "$18",
      },
      "20": {
        fontSize: "$20",
      },
      "22": {
        fontSize: "$22",
      },
      "24": {
        fontSize: "$24",
      },
      "28": {
        fontSize: "$28",
      },
    },
    heading: {
      h1_semi: {
        fontSize: "$32",
        fontWeight: "$semibold",
        color: "$colors$white",
        lineHeight: "32px",
      },
      h1: {
        fontSize: "$32",
        fontWeight: "$normal",
        color: "$colors$white",
        lineHeight: "32px",
      },
      h2_bold: {
        fontSize: "$24",
        fontWeight: "$bold",
        color: "$colors$white",
        lineHeight: "24px",
      },
      h3_semi: {
        fontSize: "$20",
        fontWeight: "$semibold",
        color: "$colors$white",
        lineHeight: "20px",
      },
      h4_med: {
        fontSize: "$16",
        fontWeight: "$medium",
        color: "$colors$white",
        lineHeight: "16px",
      },
      body_med: {
        fontSize: "$18",
        fontWeight: "$medium",
        color: "$colors$white",
        lineHeight: "18px",
      },
      body: {
        fontSize: "$16",
        fontWeight: "$normal",
        color: "$colors$white",
        lineHeight: "16px",
      },
      small_med: {
        fontSize: "$14",
        fontWeight: "$medium",
        color: "$colors$white",
        lineHeight: "14px",
      },
      smallest_med: {
        fontSize: "$12",
        fontWeight: "$medium",
        color: "$colors$white",
        lineHeight: "12px",
      },
      tiny_med: {
        fontSize: "$10",
        fontWeight: "$medium",
        color: "$colors$white",
        lineHeight: "10px",
      },
      navbar_inactive: {
        fontSize: "$12",
        fontWeight: "$medium",
        color: "$colors$white",
        lineHeight: "12px",
      },
      navbar_active: {
        fontSize: "$12",
        fontWeight: "$bold",
        color: "$colors$white",
        lineHeight: "12px",
      },
    },
    textEllipsis: {
      "1": {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": "1",
        lineClamp: "1",
        "-webkit-box-orient": "vertical",
        textOverflow: "ellipsis",
      },
      "2": {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": "2",
        lineClamp: "2",
        "-webkit-box-orient": "vertical",
        textOverflow: "ellipsis",
      },
      "3": {
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": "3",
        lineClamp: "3",
        "-webkit-box-orient": "vertical",
        textOverflow: "ellipsis",
      },
    },
    color: {
      white: {
        color: "$white !important",
      },
      white16: {
        color: "$white16 !important",
      },
      grayLightest: {
        color: "$grayLightest !important",
      },
      primary: {
        color: "$primary !important",
      },
      error: {
        color: "$error !important",
      },
    },
    fontweight: {
      light: { fontWeight: "$light" },
      normal: { fontWeight: "$normal" },
      medium: { fontWeight: "$medium" },
      semibold: { fontWeight: "$semibold" },
      bold: { fontWeight: "$bold" },
    },
    lineheight: {
      "14": {
        lineHeight: "14px",
      },
      "16": {
        lineHeight: "16px",
      },
      "18": {
        lineHeight: "18px",
      },
      "20": {
        lineHeight: "20px",
      },
      "22": {
        lineHeight: "22px",
      },
      "24": {
        lineHeight: "24px",
      },
    },
    texttransform: {
      capitalize: {
        textTransform: "capitalize",
      },
      uppercase: {
        textTransform: "uppercase",
      },
      lowercase: {
        textTransform: "lowercase",
      },
    },
  },
  defaultVariants: {
    size: "14",
    color: "white",
  },
});

export default Text;
