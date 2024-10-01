import { styled } from "@stitches/react";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { useState } from "react";
import HandGestures from "./HandGestures";
import BackgroundOption from "./BackgroundOption";

const Tabs = () => {
  const [tabNumber, setTabNumber] = useState(0);

  return (
    <>
      <Flex
        direction={"row"}
        css={{ gap: "1rem", width: "100%", marginTop: "1rem" }}
      >
        <TabsContainer
          isActive={tabNumber === 0}
          onClick={() => setTabNumber(0)}
        >
          <TabsText>Hand Gestures</TabsText>
        </TabsContainer>
        <TabsContainer
          isActive={tabNumber === 1}
          onClick={() => setTabNumber(1)}
        >
          <TabsText>Backgrounds</TabsText>
        </TabsContainer>
      </Flex>
      {tabNumber === 0 && <HandGestures />}
      {tabNumber === 1 && <BackgroundOption />}
      {/* Add content for the second tab if needed */}
    </>
  );
};

export const TabsContainer = styled(Box, {
  height: "40px",
  width: "100%",
  padding: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "transparent", // default background color
  variants: {
    isActive: {
      true: {
        borderRadius: "80px",
        backgroundColor: "$secondary", // active tab background
      },
      false: {
        backgroundColor: "transparent", // inactive tab background
      },
    },
  },
});

export const TabsText = styled("span", {
  textAlign: "center",
  fontFamily: "$Gilmer",
  fontWeight: "bold",
  fontSize: "1rem",
  color: "$primary",
});

export default Tabs;
