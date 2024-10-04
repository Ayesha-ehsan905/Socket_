import React, { useState } from "react";
import { CSS, styled } from "@stitches/react";

// Styled Tooltip Container
const TooltipContainer = styled("div", {
  position: "relative",
  display: "inline-block",
  cursor: "pointer",
});

// Styled Tooltip Text
const TooltipText = styled("div", {
  backgroundColor: "#333",
  color: "$white",
  textAlign: "center",
  borderRadius: "8px",
  padding: "8px",
  position: "absolute",
  zIndex: "1",
  width: "120px",
  opacity: 0,
  transition: "opacity 0.3s ease",

  // Tooltip arrow styles based on position
  variants: {
    position: {
      top: {
        bottom: "125%",
        left: "50%",
        transform: "translateX(-50%)",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "100%",
          left: "50%",
          marginLeft: "-5px",
          borderWidth: "5px",
          borderStyle: "solid",
          borderColor: "#333 transparent transparent transparent",
        },
      },
      bottom: {
        top: "130%",
        left: "50%",
        transform: "translateX(-50%)",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "100%",
          left: "50%",
          marginLeft: "-5px",
          borderWidth: "5px",
          borderStyle: "solid",
          borderColor: "transparent transparent #333 transparent",
        },
      },
      left: {
        top: "50%",
        right: "125%",
        transform: "translateY(-50%)",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          right: "-5px",
          transform: "translateY(-50%)",
          borderWidth: "5px",
          borderStyle: "solid",
          borderColor: "transparent transparent transparent #333",
        },
      },
      right: {
        top: "50%",
        left: "125%",
        transform: "translateY(-50%)",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "-5px",
          transform: "translateY(-50%)",
          borderWidth: "5px",
          borderStyle: "solid",
          borderColor: "transparent #333 transparent transparent",
        },
      },
    },
    visible: {
      true: {
        visibility: "visible",
        opacity: 1,
      },
      false: {
        visibility: "hidden",
        opacity: 0,
      },
    },
  },
});

// Tooltip Component
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  css?: CSS;
}

const Tooltip = ({
  content,
  children,
  position = "top",
  css,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  // Function to show and hide tooltip
  const handleClick = () => {
    setVisible(true); // Show tooltip
    setTimeout(() => {
      setVisible(false); // Hide tooltip after 2 seconds
    }, 2000); // 2-second delay
  };

  return (
    <TooltipContainer onClick={handleClick} css={css}>
      {children}
      {/* Pass visibility and position to TooltipText */}
      <TooltipText visible={visible} position={position}>
        {content}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
