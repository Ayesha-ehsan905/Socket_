import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import {
  HomeIcon,
  OneOnOneIcon,
  Profile,
  TournamentIcon,
} from "../../../components/icons";
import { styled } from "../../../styles";
import { routes } from "../../../utilis/constant";
import { useSocket } from "../../../hooks/useSocket";
import { SocketEvents } from "../../../utilis/enum";
import { FixedBgWrapper } from "../../../styles/style";
import { useTelegram } from "../../../hooks/useTelegram";

const LeaderBoard = () => {
  const { pathname } = useLocation();
  const { socket, connectSocket } = useSocket();
  const { chatId } = useTelegram();
  console.log(chatId);
  const navigate = useNavigate();

  const LeaderBoardMenus = [
    { name: "Home", icon: HomeIcon, path: routes.dashboard },
    { name: "1v1", icon: OneOnOneIcon, path: routes.matching_screen },
    { name: "Tournament", icon: TournamentIcon, path: "" },
    { name: "Profile", icon: Profile, path: "" },
  ];
  const handleMenuClick = (path: string) => {
    if (path === routes.matching_screen && pathname !== path) {
      connectSocket();
      // Emit the event only if it's the "1v1" menu and we're not already on the same path
      socket.emit(SocketEvents.SEARCH_GAME, { chatId: 1 });
    }
    navigate(path);
  };
  return (
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
          css={{ padding: "6px  23px" }}
        >
          {LeaderBoardMenus.map((menu, index) => {
            const IconComponent = menu.icon;

            const isActive = pathname === menu.path;
            const check = menu.name === "Profile";
            return (
              <Flex
                direction={"column"}
                align={"center"}
                onClick={() => handleMenuClick(menu.path)}
                key={index}
              >
                <IconComponent active={isActive} />
                {check ? (
                  <Box as="a" href="/home.html">
                    {menu.name}
                  </Box>
                ) : (
                  <Box
                    as="span"
                    css={{
                      fontFamily: "$Gilmer",
                      fontWeight: isActive ? "$bold" : "$semibold",
                      color: isActive ? "$primary" : "$grey3",
                      letterSpacing: menu.name === "1v1" ? "3px" : 0,
                    }}
                  >
                    {menu.name}
                  </Box>
                )}
              </Flex>
            );
          })}
        </Flex>
      </FixedBgWrapper>
    </Box>
  );
};

export default LeaderBoard;

const LeaderBoardCss = styled(Box, {
  padding: "8px 16px",
  borderRadius: "50px",
  background: "$grey1",
});
