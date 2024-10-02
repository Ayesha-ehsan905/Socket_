import { useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { styled } from "../../styles";
import { HeadingCss, navBottomSpace } from "../../styles/style";
import NavigationMenu from "../Dashboard/component/NavigationMenu";
import { UserCardBox, UserDetailCard } from "../Dashboard/component/UserCard";
import BackgroundOption from "./component/BackgroundOption";
import HandGestures from "./component/HandGestures";
import Tabs from "./component/Tabs";

const Marketplace = () => {
  const [tabNumber, setTabNumber] = useState(0);

  const tabData = [
    { label: "Hand Gestures", component: <HandGestures /> },
    { label: "Backgrounds", component: <BackgroundOption /> },
    // Add more tabs here as needed
  ];
  return (
    <Box css={{ background: "$white1" }}>
      <UserCardBox css={{ background: "$white", height: "88px" }}>
        <UserDetailCard />
      </UserCardBox>
      <Box css={{ ...navBottomSpace, padding: "24px 16px 24px 1rem" }}>
        <Flex direction={"row"} wrap={"wrap"}>
          <Box css={HeadingCss}>Marketplace</Box>
          <Box
            css={{
              fontSize: "$16",
              fontWeight: "$normal",
              fontFamily: "$Gilmer",
              paddingTop: "1rem",
              color: "$black",
            }}
          >
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
            dolor sit amet .
          </Box>
        </Flex>
        <Divder />
        {/* Add more tabs here as needed */}
        <Tabs
          tabData={tabData}
          setTabNumber={setTabNumber}
          tabNumber={tabNumber}
        />
      </Box>
      <NavigationMenu />
    </Box>
  );
};

export const Divder = styled(Box, {
  marginTop: "1rem",
  border: "1px solid $grey5",
});
export default Marketplace;
