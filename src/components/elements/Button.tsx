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

  // Base styling for button
  variants: {
    variant: {
      filled: {
        backgroundColor: "#F6B234",
        color: "#000",
        "&:hover": {
          backgroundColor: "#e0a62f",
        },
      },
      outlined: {
        backgroundColor: "transparent",
        color: "#333",
        borderColor: "#d3d3d3",
        "&:hover": {
          borderColor: "#bdbdbd",
        },
      },
    },
  },
});
