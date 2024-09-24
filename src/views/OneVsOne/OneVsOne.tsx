import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import {
  AvatarImg,
  BackgroundCardCSS,
  FixedBgWrapper,
  VerticalLine,
} from "../../styles/style";
import {
  PaperIcon,
  RandomIcon,
  ScissorIcon,
  StoneIcon,
} from "../../components/icons";
import { styled } from "../../styles";
import { SocketEvents, UserMove } from "../../utilis/enum";
import WinOverLay from "./component/WinOverLay";
import { useLocation } from "react-router-dom";
import { useSocket } from "../../hooks/useSocket";

export type GameOverDTO = {
  winner: number;
  winnerRoundWon: number;
  totalRounds: number;
};
const OneVsOne = () => {
  const location = useLocation();
  const gameRoomKey = location.state?.gameRoomKey;
  const chatId = location.state?.chatId;
  const [timeLeft, setTimeLeft] = useState(0);
  const [userSelectedMove, setUserSelectedMove] = useState<null | string>(null);
  const [gameOverResult, setGameOverResult] = useState<null | GameOverDTO>(
    null
  );
  const [isGameOverModal, setisGameOverModal] = useState(false);
  const [userWinnerId, setUserWinnerId] = useState<null | number | string>(
    null
  );
  const { socket, disconnectSocketEvent } = useSocket();
  const [roundCount, setRoundCount] = useState(1);
  const heightPercentage = (timeLeft / 30) * 100; // Full height is 100%
  useEffect(() => {
    if (timeLeft < 30) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);
  useEffect(() => {
    if (userSelectedMove !== null) {
      socket.on(SocketEvents.ROUND_RESULT, (data) => {
        console.log("ROUND_RESULT", data);
        setUserWinnerId(data?.winner || data?.result);
        setRoundCount((prevCount) => prevCount + 1);
      });
      socket.on(SocketEvents.GAME_OVER, (data) => {
        console.log("GAME_OVER", data);
        setisGameOverModal(true);
        setGameOverResult(data);
      });

      return () => {
        disconnectSocketEvent(SocketEvents.ROUND_RESULT);
        disconnectSocketEvent(SocketEvents.GAME_OVER);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelectedMove]);
  const handleUserMove = (userMove: string) => {
    setUserWinnerId(null); ///reseting the winner id after every move
    socket.emit(SocketEvents.PLAYER_MOVE, {
      move: userMove,
      room: gameRoomKey,
      chatId,
    });
    setUserSelectedMove(userMove);
  };

  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        pointerEvents: isGameOverModal ? "none" : "auto",
      }}
    >
      <Box
        css={{
          ...BackgroundCardCSS,
          background: "url('/images/1v1 Round Start.png')",
        }}
      >
        <GameSection>
          <Flex
            direction={"column"}
            align={"center"}
            justify={"center"}
            css={{ height: "95vh" }}
          >
            <Flex
              justify={"between"}
              direction={"row"}
              align={"center"}
              css={{
                width: "100vw",
                padding: "0 24px",
                boxSizing: "border-box",
              }}
            >
              <Flex
                direction={"column"}
                css={{ height: "100%", justifyContent: "center" }}
              >
                <VerticalLine
                  css={{
                    height: "50%",
                    position: "relative",
                  }}
                >
                  <TimerBar css={{ height: `${heightPercentage}%` }} />
                </VerticalLine>
                <Box as="span" css={{ marginTop: "16px", width: "20px" }}>
                  {timeLeft}
                </Box>
              </Flex>
              <Box as="h3" css={{ fontSize: "40px" }}>
                {gameOverResult
                  ? "Game Over"
                  : userWinnerId
                  ? userWinnerId === "draw"
                    ? "Draw"
                    : userWinnerId === chatId
                    ? "You Won"
                    : "You Lost"
                  : ` Round ${roundCount}`}
              </Box>
              <Flex
                direction={"column"}
                align={"center"}
                css={{
                  background: "$grey4",
                  width: "10px",
                  borderRadius: "20px",
                }}
              >
                <AvatarImg src="/images/avatar.png" />

                <ProgressBar
                  heightPercentage={heightPercentage}
                  position={"top"}
                />
                <Box
                  as="span"
                  css={{ borderTop: "2px solid black", width: "20px" }}
                />
                <ProgressBar
                  heightPercentage={heightPercentage}
                  position={"bottom"}
                />

                <AvatarImg src="/images/avatar.png" />
              </Flex>
            </Flex>
          </Flex>
        </GameSection>
      </Box>

      {/* Game Section */}
      <FixedBgWrapper
        css={{
          bottom: "0px",
          background: "url('/images/Scissor.png') no-repeat center top",
          height: "300px",
        }}
      >
        <Box />

        <Flex
          direction={"row"}
          align={"center"}
          justify={"center"}
          css={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
          <StoneIcon
            customColor={userSelectedMove === UserMove.ROCK}
            onClick={() => handleUserMove(UserMove.ROCK)}
          />
          <Flex direction={"column"} css={{ gap: "2rem" }} align={"center"}>
            <PaperIcon
              customColor={userSelectedMove === UserMove.PAPER}
              onClick={() => handleUserMove(UserMove.PAPER)}
            />
            <RandomIcon
              customColor={userSelectedMove === UserMove.RANDOM}
              onClick={() => handleUserMove(UserMove.RANDOM)}
            />
          </Flex>
          <ScissorIcon
            customColor={userSelectedMove === UserMove.SCISSOR}
            onClick={() => handleUserMove(UserMove.SCISSOR)}
          />
        </Flex>
      </FixedBgWrapper>
      {isGameOverModal && (
        <WinOverLay gameOverRecord={gameOverResult} chatId={chatId} />
      )}
    </Box>
  );
};
// opponent and your win bar
const ProgressBar = ({
  heightPercentage,
  position,
}: {
  heightPercentage: number;
  position: string;
}) => {
  return (
    <Box
      css={{
        height: "17vh",
        position: "relative",
        width: "10px",
        overflow: "hidden",
      }}
    >
      <Box
        css={{
          position: "absolute",
          [position]: 0,
          height: `${heightPercentage}%`,
          background: "$secondary",
          transition: "height 0.5s ease",
          width: "100%",
          transformOrigin: position === "top" ? "top" : "bottom",
        }}
      />
    </Box>
  );
};

export const GameSection = styled(Box, {
  background: "url('/images/Stone.png') no-repeat center top",
  backgroundSize: "contain",
  height: "300px",
});
const TimerBar = styled(Box, {
  position: "absolute",
  bottom: 0,
  backgroundColor: "$secondary",
  borderRadius: "24px",
  transition: "height 0.5s ease",
  width: "100%",
});

export default OneVsOne;
