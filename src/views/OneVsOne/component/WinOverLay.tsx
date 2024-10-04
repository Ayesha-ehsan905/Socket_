import { useNavigate } from "react-router-dom";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import { HomeBlackIcon, Replaycon } from "../../../components/icons";
import { styled } from "../../../styles";
import { routes } from "../../../utilis/constant";
import { SocketEvents } from "../../../utilis/enum";
import { WinOverLayProps } from "../type";
import { useSocket } from "../../../components/contexts/SocketContext/useSocket";

const WinOverLay = (props: WinOverLayProps) => {
  const { gameOverRecord, userChatId } = props;
  const { socket } = useSocket();

  const totalRounds =
    (gameOverRecord?.totalRounds ?? 0) - (gameOverRecord?.totalDraw ?? 0);
  const lostRounds = totalRounds - (gameOverRecord?.winnerRoundWon ?? 0);
  const navigate = useNavigate();
  return (
    <WinOverlay>
      <OverLayBackground>
        <Flex direction={"column"} align={"center"} justify={"center"}>
          <Box as="img" src="/images/avatar_1.png" />

          <Box as="span" css={{ fontSize: "24px", mt: "1rem" }}>
            {gameOverRecord && gameOverRecord?.isMatchDraw
              ? "Match Draw"
              : gameOverRecord?.winner === userChatId
              ? "You Win"
              : "You Loss"}
          </Box>
          <Box as="span" css={{ fontSize: "64px" }}>
            {gameOverRecord &&
              !gameOverRecord?.isMatchDraw &&
              (gameOverRecord?.winner === userChatId
                ? //  you win vs opponenet lost count
                  `${gameOverRecord?.winnerRoundWon}- ${lostRounds}`
                : // your lost vs opponenet win
                  `${lostRounds}-${gameOverRecord?.winnerRoundWon}`)}
          </Box>
          {gameOverRecord?.totalDraw && (
            <Box as="p" css={{ margin: 0 }}>
              Draws:{gameOverRecord?.totalDraw}
            </Box>
          )}

          <Flex direction={"row"} css={{ gap: "$4", margin: "40px 0" }}>
            <IconWrapper>
              <HomeBlackIcon onClick={() => navigate(routes.dashboard)} />
            </IconWrapper>
            <IconWrapper>
              <Replaycon
                onClick={() => {
                  socket.emit(SocketEvents.SEARCH_GAME, { chatId: userChatId });
                  navigate(routes.matching_screen);
                }}
              />
            </IconWrapper>
          </Flex>
        </Flex>
      </OverLayBackground>
    </WinOverlay>
  );
};
const WinOverlay = styled(Box, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 30,
  pointerEvents: "auto", // Ensure this layer is clickable
});
const OverLayBackground = styled(Box, {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  textAlign: "center",
  boxSizing: "border-box",
  //   height: "50vh",
  borderRadius: "32px 32px 0px  0px",
  background: "white",
  padding: "32px 0",
});
const IconWrapper = styled(Box, {
  padding: "12px 26px",
  background: "$secondary",
  boxShadow: "0 4px #c19935",
  borderRadius: "16px",
  display: "inline-flex",
  alignSelf: "center",
});

export default WinOverLay;
