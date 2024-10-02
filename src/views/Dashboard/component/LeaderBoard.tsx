import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { styled } from "../../../styles";
import { useState } from "react";
import Alert from "../../../components/Popup";
import NavigationMenu from "./NavigationMenu";
import { navBottomSpace } from "../../../styles/style";

const LeaderBoard = () => {
  const [openTelegramAlert, setOpenTelegramAlert] = useState(false);
  //current user telegram chat id

  return (
    <>
      <Box css={{ ...navBottomSpace, margin: "24px 16px 16px" }}>
        <Box
          as="h2"
          css={{
            fontSize: "$20",
            fontWeight: "$bold",
            fontFamily: "$Gilmer",
            margin: "16px 0 8px",
          }}
        >
          Leaderboard
        </Box>

        <Flex direction={"column"} wrap={"wrap"}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <LeaderBoardCss key={num} css={{ mt: "8px" }}>
              <Flex direction={"row"} justify={"between"} align={"center"}>
                <Flex justify={"center"} css={{ columnGap: "$3" }}>
                  <Box as="img" src="/images/avatar.png" />
                  <Box as="span" css={{ fontSize: "$14", alignSelf: "center" }}>
                    John Doe
                  </Box>
                </Flex>
                <Box>
                  <Box as="span" css={{ color: "$green", mr: "4px" }}>
                    100 Wins
                  </Box>
                  <Box as="span" css={{ mr: "4px", color: "$grey2" }}>
                    |
                  </Box>
                  <Box as="span" css={{ color: "$red1" }}>
                    27 Losses
                  </Box>
                </Box>
              </Flex>
            </LeaderBoardCss>
          ))}
        </Flex>
      </Box>
      <NavigationMenu />
      <Alert
        open={openTelegramAlert}
        onClose={() => setOpenTelegramAlert(false)}
        severity="error"
        text="Please Open In Telegram App"
      />
    </>
  );
};

export default LeaderBoard;

const LeaderBoardCss = styled(Box, {
  padding: "8px 16px",
  borderRadius: "50px",
  background: "$grey1",
});
