import React, { useState } from "react";
import { styled } from "@stitches/react";

// Styled Tooltip Container
const TooltipContainer = styled("div", {
  position: "relative",
  display: "inline-block",
  cursor: "pointer",
});

// Styled Tooltip Text
const TooltipText = styled("div", {
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
  borderRadius: "4px",
  padding: "8px",
  position: "absolute",
  zIndex: "1",
  bottom: "125%", // Position above the element
  left: "50%",
  marginLeft: "-60px",
  width: "120px",
  opacity: 0,
  transition: "opacity 0.3s ease",

  // Tooltip arrow
  "&::after": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-10px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "#333 transparent transparent transparent",
  },

  variants: {
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
}

const Tooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  // Function to show and hide tooltip
  const handleClick = () => {
    setVisible(true); // Show tooltip
    setTimeout(() => {
      setVisible(false); // Hide tooltip after 2 seconds
    }, 2000); // 2 second delay
  };

  return (
    <TooltipContainer onClick={handleClick}>
      {children}
      {/* Passing the boolean directly to the `visible` variant */}
      <TooltipText visible={visible}>{content}</TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;
