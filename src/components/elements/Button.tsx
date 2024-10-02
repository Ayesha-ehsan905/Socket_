import React from "react";
import { CSS, styled } from "@stitches/react";

interface ButtonProps {
  variant?: "filled" | "outlined";
  children: React.ReactNode;
  onClick?: () => void;
  css?: CSS;
}

export const Button = ({
  variant = "filled",
  children,
  onClick,
  css,
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} onClick={onClick} css={css}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled("button", {
  borderRadius: "30px",
  padding: "16px 24px",
  fontSize: "20px",
  fontWeight: "$bold",
  fontFamily: "Gilmer",
  lineHeight: "20px",
  cursor: "pointer",
  border: "2px solid transparent",
  color: "$black",

  // Base styling for button
  variants: {
    variant: {
      filled: {
        backgroundColor: "$secondary",
        "&:hover": {
          opacity: 0.9,
        },
      },
      outlined: {
        backgroundColor: "transparent",
        borderColor: "$grey2",
        "&:hover": {
          opacity: 0.9,
        },
      },
    },
  },
});
