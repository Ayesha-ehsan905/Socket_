import { styled } from "../../styles";

const StyledButton = styled("button", {
  display: "inline-flex",
  padding: 0,
  border: "none",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  userSelect: "none",
  cursor: "pointer",
  minWidth: "160px",
  flexGrow: 1,

  "@sm": {
    flexGrow: "initial",
  },

  "&:disabled": {
    opacity: 0.5,
    pointerEvents: "none",
  },

  variants: {
    size: {
      sm: {
        borderRadius: "$sm",
        padding: ".65rem 1.15rem",
        fontSize: "$base",
        minWidth: "120px",
      },
    },
    capitalized: {
      true: {
        textTransform: "uppercase",
      },
    },
    color: {
      primary: {
        backgroundColor: "$primary",
        // boxShadow: "inset 0 0 0 1px $colors$blue7",
        border: "1px solid $primaryBorder",
        color: "$white",
        "&:hover": {
          boxShadow: "inset 0 0 0 1px $primary",
          bgColor: "$primaryHover",
        },
        "&:focus": {
          boxShadow: "inset 0 0 0 1px $colors$blue8",
        },
        "&:active": {
          boxShadow: "inset 0 0 0 1px $colors$blue8",
        },
      },
    },
  },

  defaultVariants: {
    size: "sm",
    color: "primary",
  },
});

export const Button = StyledButton;
