import { styled } from "@stitches/react";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { AddIcon, NotificationIcon } from "../../../components/icons";
import { useAuth } from "../../../components/contexts/AuthContext/useAuth";
import { useEffect, useState } from "react";
import { endpoint } from "../../../utilis/endpoints";
import Alert from "../../../components/Popup";
import { axios } from "../../../lib/axios";
import { getFullName } from "../../../utilis/function";
import Tooltip from "../../../components/Tooltip/Tooltip";

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
  const [userBalance, setUserBalance] = useState(0);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!userData.token) return;
        const config = {
          headers: { Authorization: `Bearer ${userData.token}` },
        };
        // Fetch user balance
        const balanceResponse = await axios.get(endpoint.userBalance, config);

        setUserBalance(balanceResponse?.data?.data?.totalBalance);
      } catch (error) {
        //api error handling
        setApiError((error as Error)?.message);
        console.error("Error fetching User Balance:", error);
      }
    };

    fetchProfileData();
  }, [userData.token]);

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
          {getFullName(
            userData?.user?.first_name as string,
            userData?.user?.last_name as string
          )}
        </Box>
      </Flex>
      <Flex
        css={{
          borderRadius: "24px",
          height: "fit-content",
          background: "$beige",
        }}
      >
        <Tooltip
          content="Coming Soon"
          position="bottom"
          css={{ height: "20px" }}
        >
          <AddIcon />
        </Tooltip>
        <Box as="span" css={{ p: "0 20px", textAlign: "center" }}>
          {userBalance ?? 0}
        </Box>
        <Box
          as="img"
          src="/images/Vector.png"
          css={{ width: "25px", height: "25px", alignSelf: "baseline" }}
        />
      </Flex>
      {apiError && (
        <Alert
          text={apiError}
          open={!!apiError}
          severity={"error"}
          onClose={() => setApiError("")}
        />
      )}
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
