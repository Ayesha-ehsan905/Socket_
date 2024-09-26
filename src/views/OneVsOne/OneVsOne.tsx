import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { AvatarImg, FixedBgWrapper, VerticalLine } from "../../styles/style";
import { styled } from "../../styles";
import { SocketEvents, UserMove } from "../../utilis/enum";
import WinOverLay from "./component/WinOverLay";
import { useLocation } from "react-router-dom";
import { WinnerRoundRecordType } from "../../utilis/type";
import { getSelectedImages } from "../../utilis/function";
import GameSection from "./component/GameSection";
import { useSocketContext } from "../../components/SocketContext/SocketContext";

export type GameOverDTO = {
  winner: number;
  winnerRoundWon: number;
  totalRounds: number;
  totalDraw: number;
};
const OneVsOne = () => {
  const location = useLocation();
  const gameRoomKey = location.state?.gameRoomKey;
  const user_chatId = location.state?.chatId;

  const [timeLeft, setTimeLeft] = useState(0);
  const [isGameOverModal, setisGameOverModal] = useState(false);
  const [userSelectedMove, setUserSelectedMove] = useState<null | string>(null);
  const [gameOverResult, setGameOverResult] = useState<null | GameOverDTO>(
    null
  );
  const [winnerRoundRecord, setWinnerRoundRecord] =
    useState<null | WinnerRoundRecordType>();
  const { socket, disconnectSocketEvent, isSocketConnected } =
    useSocketContext();
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
  console.log(isSocketConnected, "isSocketConnected");

  useEffect(() => {
    if (userSelectedMove) {
      socket.on(SocketEvents.ROUND_RESULT, (data) => {
        console.log("ROUND_RESULT", data);
        console.log("User", userSelectedMove);

        setWinnerRoundRecord(JSON.parse(data));
        setRoundCount((prevCount) => prevCount + 1);
      });
      socket.on(SocketEvents.GAME_OVER, (data) => {
        console.log("GAME_OVER", data);
        setTimeout(() => {
          setisGameOverModal(true);
        }, 2000);
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
    setWinnerRoundRecord(null); ///reseting the winner id after every move
    socket.emit(SocketEvents.PLAYER_MOVE, {
      move: userMove,
      room: gameRoomKey,
      chatId: user_chatId,
    });
    setUserSelectedMove(userMove);
  };

  let opponentMove = "";
  //check if you are player1 then pick player 2 move

  if (winnerRoundRecord?.player1?.chatId === user_chatId) {
    opponentMove = winnerRoundRecord?.player2?.move as UserMove;
  } else {
    opponentMove = winnerRoundRecord?.player1?.move as UserMove;
  }
  const { userMoveImage, opponentMoveImage } = getSelectedImages(
    userSelectedMove as UserMove, // Casting to UserMove
    opponentMove as UserMove
  );
  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        pointerEvents: isGameOverModal ? "none" : "auto",
        background: "url('/images/1v1 Round Start.png')",
      }}
    >
      <FixedBgWrapper
        css={{
          position: "fixed",
          height: winnerRoundRecord ? "min(40vh, 35vh)" : "min(20vh,15vh)",
          // height: "100px",
          top: 0,
        }}
      >
        <Box
          as="img"
          src={opponentMoveImage}
          css={{
            height: "100%",
            transform: winnerRoundRecord ? "rotate(180deg)" : "",
          }}
        />
      </FixedBgWrapper>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        css={{ height: "90vh" }}
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
              {/* <TimerBar css={{ height: `${heightPercentage}%` }} /> */}
              <TimerBar css={{ height: "20%" }} />
            </VerticalLine>
            <Box as="span" css={{ marginTop: "16px", width: "20px" }}>
              {timeLeft}
            </Box>
          </Flex>
          <Box as="h3" css={{ fontSize: "clamp(24px, 5vw, 40px)" }}>
            {winnerRoundRecord
              ? winnerRoundRecord?.isDraw
                ? "Draw"
                : winnerRoundRecord?.winnerChatId === user_chatId
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

            <ProgressBar heightPercentage={heightPercentage} position={"top"} />
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

      {/* Game Section */}
      <GameSection
        userSelectedMove={userSelectedMove}
        handleUserMove={handleUserMove}
        userMoveImage={userMoveImage}
        isWinnerRoundRecordExist={!!winnerRoundRecord}
      />
      {isGameOverModal && (
        <WinOverLay gameOverRecord={gameOverResult} userChatId={user_chatId} />
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

const TimerBar = styled(Box, {
  position: "absolute",
  bottom: 0,
  backgroundColor: "$secondary",
  borderRadius: "24px",
  transition: "height 0.5s ease",
  width: "100%",
});

export default OneVsOne;
