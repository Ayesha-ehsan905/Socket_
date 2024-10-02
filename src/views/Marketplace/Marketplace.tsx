import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { styled } from "../../styles";
import NavigationMenu from "../Dashboard/component/NavigationMenu";
import { UserCardBox, UserDetailCard } from "../Dashboard/component/UserCard";
import Tabs from "./component/Tabs";

const Marketplace = () => {
  return (
    <Box css={{ background: "$white1" }}>
      <UserCardBox css={{ background: "$white", height: "88px" }}>
        <UserDetailCard />
      </UserCardBox>
      <Box css={{ padding: "24px 16px 6.25rem 1rem" }}>
        <Flex direction={"row"} wrap={"wrap"}>
          <Box
            css={{
              fontSize: "$24",
              fontWeight: "$bold",
              fontFamily: "$Gilmer",
            }}
          >
            Marketplace
          </Box>
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
        <Tabs />
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
