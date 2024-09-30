import { SetStateAction, useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { AvatarImg, FixedBgWrapper, VerticalLine } from "../../styles/style";
import { styled } from "../../styles";
import { SocketEvents, UserMove } from "../../utilis/enum";
import WinOverLay from "./component/WinOverLay";
import { useLocation } from "react-router-dom";
import { getRandomMove, getSelectedImages } from "../../utilis/function";
import GameSection from "./component/GameSection";
import { useSocketContext } from "../../components/SocketContext/useSocketContext";
import { GameOverDTO, RoundRecord, WinnerRoundRecordType } from "./type";

const OneVsOne = () => {
  const { socket } = useSocketContext();
  const location = useLocation();
  const gameRoomKey = location.state?.gameRoomKey;
  const user_chatId = location.state?.chatId;
  // each round record
  const [roundRecord, setRoundRecord] = useState<RoundRecord | null>(null);
  const [roundTimeLeft, setRoundTimeLeft] = useState(0);
  const [isGameOverModal, setisGameOverModal] = useState(false);
  const [opponnentWinCount, setOpponnentWinCount] = useState(0);
  const [userWinCount, setUserWinCount] = useState(0);
  //if round is not started use cannot select the moves
  const [isRoundStarted, setIsRoundStarted] = useState(false);

  const [userSelectedMove, setUserSelectedMove] = useState<null | string>(null); //user move
  //game over result
  const [gameOverResult, setGameOverResult] = useState<null | GameOverDTO>(
    null
  );
  console.log(opponnentWinCount, "opponetWinCount");
  console.log(userWinCount, "userWinCount");
  //each round winner record
  const [winnerRoundRecord, setWinnerRoundRecord] =
    useState<null | WinnerRoundRecordType>();

  //milliseconds->sec
  const totalTimeForRound =
    (roundRecord && roundRecord.roundTimeLimit / 1000) ?? 0;

  const heightPercentageTimeBar = (roundTimeLeft / totalTimeForRound) * 100; // Full height is 100%

  // Timer logic
  useEffect(() => {
    if (roundRecord && roundRecord.roundTimeLimit > 0) {
      if (roundTimeLeft < totalTimeForRound) {
        const timer = setInterval(() => {
          setRoundTimeLeft((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
      } else {
        console.log("time up");
        setUserSelectedMove(getRandomMove());
      }
    }
  }, [roundRecord, roundTimeLeft, totalTimeForRound]);

  // ready for game
  useEffect(() => {
    socket.emit(SocketEvents.READY_FOR_GAME, {
      room: gameRoomKey,
      chatId: user_chatId,
    });
    console.log("Ready for game");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Initial round setup
  useEffect(() => {
    console.log("first time call");
    setTimeout(() => {
      socket.on(SocketEvents.ROUND_START, handleRoundStart);
    }, 3000);

    return () => {
      socket.off(SocketEvents.ROUND_START);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for ROUND_RESULT and GAME_OVER events
  useEffect(() => {
    if (userSelectedMove) {
      socket.on(SocketEvents.ROUND_RESULT, handleRoundResult);
      socket.on(SocketEvents.GAME_OVER, handleGameOver);

      return () => {
        socket.off(SocketEvents.ROUND_RESULT);
        socket.off(SocketEvents.GAME_OVER);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelectedMove]);

  // Check round results
  useEffect(() => {
    if (winnerRoundRecord && !winnerRoundRecord?.isDraw) {
      if (winnerRoundRecord?.winnerChatId === user_chatId)
        setUserWinCount((prev) => prev + 1);
      else setOpponnentWinCount((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerRoundRecord]);
  // Handle round start
  const handleRoundStart = (data: RoundRecord) => {
    console.log("Round started", data);
    setWinnerRoundRecord(null);
    setRoundRecord(data);
    setIsRoundStarted(true);
  };
  // Handle round result

  const handleRoundResult = (data: string) => {
    console.log("ROUND_RESULT", data);
    setRoundRecord(null); // Reset round
    setWinnerRoundRecord(JSON.parse(data));
    setIsRoundStarted(false);

    setTimeout(
      () => socket.on(SocketEvents.ROUND_START, handleRoundStart),
      3000
    ); // Delay next round
  };
  // Handle game over
  const handleGameOver = (data: SetStateAction<GameOverDTO | null>) => {
    console.log("GAME_OVER", data);
    setTimeout(() => setisGameOverModal(true), 2000); // Delay game over modal
    setGameOverResult(data);
  };

  const handleUserMove = (userMove: string) => {
    socket.emit(SocketEvents.PLAYER_MOVE, {
      move: userMove,
      room: gameRoomKey,
      chatId: user_chatId,
    });
    setUserSelectedMove(userMove);
  };

  let opponentMove = "";
  //check if you are player1 then pick player 2 move and get the img

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
              {/* time bar  */}
              <TimerBar css={{ height: `${heightPercentageTimeBar}%` }} />
            </VerticalLine>
            <Box as="span" css={{ marginTop: "16px", width: "20px" }}>
              {roundTimeLeft}
            </Box>
          </Flex>
          <Box as="h3" css={{ fontSize: "clamp(24px, 5vw, 40px)" }}>
            {
              roundRecord
                ? `Round ${roundRecord?.roundNo}` // Check if roundRecord exists, show the round number
                : winnerRoundRecord //check if round record
                ? winnerRoundRecord.isDraw
                  ? "Draw" // If the game was a draw
                  : winnerRoundRecord.winnerChatId === user_chatId
                  ? "You Won" // If the user won the round
                  : "You Lost" // If the user lost the round
                : "Game Starting" // If no round record, indicate that the game is starting
            }
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
            {/* opponent win stake */}
            <ProgressBar
              heightPercentage={
                (opponnentWinCount / (roundRecord?.totalRounds ?? 0)) * 100
              }
              position={"top"}
            />
            <Box
              as="span"
              css={{ borderTop: "2px solid black", width: "20px" }}
            />
            {/* user win stake */}

            <ProgressBar
              heightPercentage={
                (userWinCount / (roundRecord?.totalRounds ?? 0)) * 100
              }
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
        isRoundStarted={isRoundStarted}
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
