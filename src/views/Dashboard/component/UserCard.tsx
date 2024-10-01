import { styled } from "@stitches/react";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { AddIcon, NotificationIcon } from "../../../components/icons";
import { useAuth } from "../../../components/contexts/AuthContext/useAuth";

const UserCard = () => {
  return (
    <UserCardBox>
      <Flex direction={"row"} justify={"between"} wrap={"wrap"}>
        <Box
          as="h4"
          css={{
            fontWeight: "$normal",
            fontSize: "22px",
            lineHeight: "28.33px",
            color: "$primary",
            margin: "21px 0",
          }}
        >
          Rock, Paper, Scissors
        </Box>
        <Box
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: "$2",
          }}
        >
          <Box>
            <NotificationIcon />
          </Box>
          <Box css={{ position: "relative" }}>
            <Badge>
              <Box
                as="span"
                css={{
                  fontFamily: "$Inter",
                  fontSize: "$10",
                  color: "$white",
                  fontWeight: "$bold",
                }}
              >
                12
              </Box>
            </Badge>
          </Box>
        </Box>
      </Flex>
      <UserDetailCard />
    </UserCardBox>
  );
};

export const UserDetailCard = () => {
  const { userData } = useAuth();
  const firstName = userData?.user?.first_name;
  const lastName = userData?.user?.last_name;
  const userName = userData?.token
    ? lastName
      ? firstName + " " + lastName
      : firstName
    : "John Doe";
  return (
    <Flex
      direction={"row"}
      justify={"between"}
      wrap={"wrap"}
      align={"center"}
      css={{ background: "$white", height: "100%", margin: "auto 0" }}
    >
      <Flex justify={"center"} css={{ columnGap: "$3" }}>
        <Box as="img" src="/images/avatar.png" />
        <Box as="span" css={{ fontSize: "$14", alignSelf: "center" }}>
          {userName}
        </Box>
      </Flex>
      <Flex
        css={{
          borderRadius: "24px",
          height: "fit-content",
          background: "$beige",
        }}
      >
        <AddIcon />
        <Box as="span" css={{ p: "0 20px", textAlign: "center" }}>
          50
        </Box>
        <Box
          as="img"
          src="/images/Vector.png"
          css={{ width: "25px", height: "25px", alignSelf: "baseline" }}
        />
      </Flex>
    </Flex>
  );
};
export default UserCard;
export const UserCardBox = styled(Box, {
  padding: "16px",
  borderRadius: "0px 0px 20px 20px",
  boxShadow: "0px 4px 8px -2px #1018284A",
});
const Badge = styled(Box, {
  background: "$error",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  bottom: "0",
  right: "-8px",
});
