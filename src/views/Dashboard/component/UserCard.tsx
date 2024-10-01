import { styled } from "@stitches/react";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { AddIcon, NotificationIcon } from "../../../components/icons";
import { useAuth } from "../../../components/contexts/AuthContext/useAuth";

const UserCard = () => {
  const { userData } = useAuth();
  const firstName = userData?.user?.first_name;
  const lastName = userData?.user?.last_name;
  const userName = userData?.token
    ? lastName
      ? firstName + " " + lastName
      : firstName
    : "John Doe";
  return (
    <UserCardBox>
      <Flex direction={"row"} justify={"between"} wrap={"wrap"}>
        <Box
          as="h4"
          css={{
            fontWeight: "$normal",
            fontSize: "$18",
            lineHeight: "28.33px",
            color: "$primary",
          }}
        >
          Rock, Paper, Scissors
        </Box>
        <Box
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
                }}
              >
                12
              </Box>
            </Badge>
          </Box>
        </Box>
      </Flex>
      <Flex
        direction={"row"}
        justify={"between"}
        wrap={"wrap"}
        align={"center"}
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
    </UserCardBox>
  );
};

export default UserCard;
const UserCardBox = styled(Box, {
  padding: "16px",
  borderRadius: "0px 0px 20px 20px",
  boxShadow: "0px 4px 8px -2px #1018281A",
});
const Badge = styled(Box, {
  background: "$error",
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  textAlign: "center",
  position: "absolute",
  bottom: "0",
  right: "-13px",
});
