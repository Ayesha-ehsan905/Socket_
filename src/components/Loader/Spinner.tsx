import { keyframes, styled } from "../../styles";

// Define keyframes for the spinner animation
const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

// Create the styled component for the loader
const Loader = styled("div", {
  border: "4px solid $grey5",
  borderTop: "4px solid $secondary",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  animation: `${spin} 1s linear infinite`,
});

export const Spinner = () => {
  return <Loader />;
};
