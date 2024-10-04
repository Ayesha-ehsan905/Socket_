import { styled } from "@stitches/react";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";

import { TabsProps } from "../type";

const Tabs = (props: TabsProps) => {
  const { tabData, tabNumber, setTabNumber } = props;
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
            <TabsText
              css={{ color: tabNumber !== index ? "$grey3" : "$primary" }}
            >
              {tab.label}
            </TabsText>
          </TabsContainer>
        ))}
      </Flex>
      <>{tabData[tabNumber].component}</>
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
});

export default Tabs;
