import { Box } from "../components/elements/Box";
import { styled } from "./stitches.config";

export const AvatarImg = styled("img", {
  width: "25px",
  height: "25px",
  alignSelf: "auto",
  margin: 0,
});
export const VerticalLine = styled(Box, {
  borderRadius: "20px",
  background: "$grey4",
  width: "10px",
});

export const FixedBgWrapper = styled(Box, {
  position: "fixed",
  bottom: "16px",
  left: "16px",
  right: "16px",
  textAlign: "center",
  borderRadius: "12px",
  boxSizing: "border-box",
});
export const BackgroundCardCSS = {
  width: "100vw",
  height: "100vh",
};

export const HeadingCss = {
  fontSize: "$24",
  fontFamily: "$Gilmer",
  margin: "24px 0",
  fontWeight: "$bold",
};
