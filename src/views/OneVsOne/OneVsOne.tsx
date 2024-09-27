import { SetStateAction, useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { AvatarImg, FixedBgWrapper, VerticalLine } from "../../styles/style";
import { styled } from "../../styles";
import { SocketEvents, UserMove } from "../../utilis/enum";
import WinOverLay from "./component/WinOverLay";
import { useLocation } from "react-router-dom";
import { RoundRecord, WinnerRoundRecordType } from "../../utilis/type";
import { getSelectedImages } from "../../utilis/function";
import GameSection from "./component/GameSection";
import { useSocketContext } from "../../components/SocketContext/useSocketContext";

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
  // each round record
  const [roundRecord, setRoundRecord] = useState<RoundRecord | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isGameOverModal, setisGameOverModal] = useState(false);
  const [opponetWinCount, setOpponetWinCount] = useState(0);
  const [userWinCount, setUserWinCount] = useState(0);

  const [userSelectedMove, setUserSelectedMove] = useState<null | string>(null); //user move
  //game over result
  const [gameOverResult, setGameOverResult] = useState<null | GameOverDTO>(
    null
  );

  console.log(opponetWinCount, "opponetWinCount");
  console.log(userWinCount, "userWinCount");
  //each round winner record
  const [winnerRoundRecord, setWinnerRoundRecord] =
    useState<null | WinnerRoundRecordType>();
  const { socket } = useSocketContext();
  const heightPercentage = (timeLeft / 30) * 100; // Full height is 100%
  useEffect(() => {
    if (timeLeft < 30) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  //call this for every new round
  useEffect(() => {
    console.log("first time call");
    socket.on(SocketEvents.ROUND_START, (data) => {
      console.log(data, "round started");
      setRoundRecord(data);
    });
    return () => {
      socket.off(SocketEvents.ROUND_START);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (winnerRoundRecord && !winnerRoundRecord?.isDraw) {
      if (winnerRoundRecord?.winnerChatId === user_chatId)
        setUserWinCount((prev) => prev + 1);
      else setOpponetWinCount((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerRoundRecord]);

  useEffect(() => {
    if (userSelectedMove) {
      // Listen to the ROUND_RESULT event after the user makes a move
      socket.on(SocketEvents.ROUND_RESULT, (data: string) => {
        console.log("ROUND_RESULT", data);
        console.log("User", userSelectedMove);

        setWinnerRoundRecord(JSON.parse(data));

        // Delay the next round start by 2 seconds (to display winner/draw)
        const delayNextRound = setTimeout(() => {
          // Re-attach ROUND_START listener to handle the next round
          socket.on(SocketEvents.ROUND_START, (data: RoundRecord) => {
            console.log(data, "round started");
            setRoundRecord(data);
            setWinnerRoundRecord(null); // Reset the winner record for the new round
          });
        }, 2000); // 2-second delay

        // Clean up the timeout on component unmount
        return () => clearTimeout(delayNextRound);
      });

      // Listen to the GAME_OVER event
      socket.on(
        SocketEvents.GAME_OVER,
        (data: SetStateAction<GameOverDTO | null>) => {
          console.log("GAME_OVER", data);
          setTimeout(() => {
            setisGameOverModal(true);
          }, 2000); // Display game over modal after a delay
          setGameOverResult(data);
        }
      );

      // Clean up event listeners when the component unmounts or userSelectedMove changes
      return () => {
        socket.off(SocketEvents.ROUND_RESULT);
        socket.off(SocketEvents.GAME_OVER);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSelectedMove]);

  const handleUserMove = (userMove: string) => {
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
              <TimerBar css={{ height: `${heightPercentage}%` }} />
              {/* <TimerBar css={{ height: "20%" }} /> */}
            </VerticalLine>
            <Box as="span" css={{ marginTop: "16px", width: "20px" }}>
              {timeLeft}
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
                (opponetWinCount / (roundRecord?.totalRounds ?? 0)) * 100
              }
              position={"top"}
            />
            <Box
              as="span"
              css={{ borderTop: "2px solid black", width: "20px" }}
            />
            {/* you win stake */}

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
