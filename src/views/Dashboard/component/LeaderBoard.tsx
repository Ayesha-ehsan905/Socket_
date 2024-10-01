import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import {
  HomeIcon,
  MarketplaceIcon,
  OneOnOneIcon,
  ProfileIcon,
  TournamentIcon,
} from "../../../components/icons";
import { styled } from "../../../styles";
import { routes } from "../../../utilis/constant";
import { SocketEvents } from "../../../utilis/enum";
import { FixedBgWrapper } from "../../../styles/style";
import { useState } from "react";
import Alert from "../../../components/Popup";
import { useSocket } from "../../../components/contexts/SocketContext/useSocket";
import { useTelegram } from "../../../hooks/useTelegram";

const LeaderBoard = () => {
  const { pathname } = useLocation();
  const { socket } = useSocket();
  const [openTelegramAlert, setOpenTelegramAlert] = useState(false);
  //current user telegram chat id
  const { chatId } = useTelegram();
  const navigate = useNavigate();

  const LeaderBoardMenus = [
    { name: "Home", icon: HomeIcon, path: routes.dashboard },
    { name: "1v1", icon: OneOnOneIcon, path: routes.matching_screen },
    { name: "Tournament", icon: TournamentIcon, path: "" },
    { name: "MarketPlace", icon: MarketplaceIcon, path: "" },
    { name: "Profile", icon: ProfileIcon, path: "" },
  ];
  console.log("socket  connection from leaderboard ", socket.connected);
  const handleMenuClick = (path: string) => {
    if (path === routes.matching_screen) {
      //if socket is not connected connect and then emit the event
      if (socket.connected) {
        socket.connect();
      }
      //ack and reply
      socket.emit(SocketEvents.SEARCH_GAME, { chatId });
      navigate(path);
    }
  };

  return (
    <>
      <Box css={{ margin: "24px 16px 16px" }}>
        <Box
          as="h2"
          css={{ fontSize: "$20", fontWeight: "$bold", fontFamily: "$Gilmer" }}
        >
          Leaderboard
        </Box>

        <Flex direction={"column"} wrap={"wrap"}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <LeaderBoardCss key={num} css={{ mt: "15px" }}>
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
        <FixedBgWrapper css={{ background: "$white" }}>
          <Flex
            direction={"row"}
            align={"center"}
            justify={"between"}
            css={{ padding: "6px  23px", height: "4.5rem" }}
          >
            {LeaderBoardMenus.map((menu, index) => {
              const IconComponent = menu.icon;

              const isActive = pathname === menu.path;
              return (
                <Flex
                  direction={"column"}
                  align={"center"}
                  onClick={() => handleMenuClick(menu.path)}
                  key={index}
                >
                  <IconComponent active={isActive} />
                </Flex>
              );
            })}
          </Flex>
        </FixedBgWrapper>
      </Box>
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
