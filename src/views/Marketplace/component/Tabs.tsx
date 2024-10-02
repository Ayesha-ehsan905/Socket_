import { styled } from "@stitches/react";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { useState } from "react";

import { TabsProps } from "../type";

const Tabs = ({ tabData }: TabsProps) => {
  const [tabNumber, setTabNumber] = useState(0);
  return (
    <>
      <Flex
        direction={"row"}
        css={{ gap: "1rem", width: "100%", marginTop: "1rem" }}
      >
        {tabData.map((tab, index) => (
          <TabsContainer
            key={index}
            isActive={tabNumber === index}
            onClick={() => setTabNumber(index)}
          >
            <TabsText>{tab.label}</TabsText>
          </TabsContainer>
        ))}
      </Flex>
      <Box>{tabData[tabNumber].component}</Box>
    </>
  );
};

export const TabsContainer = styled(Box, {
  height: "28px",
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
