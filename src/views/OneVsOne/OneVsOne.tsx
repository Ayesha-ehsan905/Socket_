import { useEffect, useMemo, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { AvatarImg, FixedBgWrapper, VerticalLine } from "../../styles/style";
import { styled } from "../../styles";
import { SocketEvents, UserMove } from "../../utilis/enum";
import WinOverLay from "./component/WinOverLay";
import { useLocation } from "react-router-dom";
import { getRandomMove, getSelectedImages } from "../../utilis/function";
import GameSection from "./component/GameSection";
import {
  GameOverDTO,
  RoundRecord,
  UserDisconnectedProps,
  WinnerRoundRecordType,
} from "./type";
import { useSocket } from "../../components/contexts/SocketContext/useSocket";
import { Spinner } from "../../components/Loader/Spinner";
import Countdown from "./component/CountDownAnimation";
import { useTelegram } from "../../hooks/useTelegram";

const OneVsOne = () => {
  const { chatId } = useTelegram();
  const { socket } = useSocket();
  useEffect(() => {
    console.log("socket connection from 1v1:", socket.connected);
  }, [socket]);
  const location = useLocation();
  //fromMatching screen
  const game_room_key = location.state?.gameRoomKey;
  const user_chatId = location.state?.chatId;
  //from GameResumed APp Screen
  const game_resumed_game_key = location.state?.roomeName;
  // each round record
  const [roundRecord, setRoundRecord] = useState<RoundRecord | null>(null);
  const [roundTimeLeft, setRoundTimeLeft] = useState(0);
  const [isGameOverModal, setisGameOverModal] = useState(false);
  const [opponnentWinCount, setOpponnentWinCount] = useState(0);
  const [userWinCount, setUserWinCount] = useState(0);
  const gameRoomKey = useMemo(() => {
    return game_room_key || game_resumed_game_key;
  }, [game_room_key, game_resumed_game_key]);
  //if round is not started use cannot select the moves
  const [isRoundStarted, setIsRoundStarted] = useState(false);

  const [userSelectedMove, setUserSelectedMove] = useState<null | string>(null); //user move
  //game over result
  const [gameOverResult, setGameOverResult] = useState<null | GameOverDTO>(
    null
  );
  //each round winner record
  const [winnerRoundRecord, setWinnerRoundRecord] =
    useState<null | WinnerRoundRecordType>();

  //round move of both users

  const [userMoveImage, setUserMoveImage] = useState<string | null>(null);
  const [opponentMoveImage, setOpponentMoveImage] = useState<string | null>(
    null
  );
  //disconnected user chat id
  const [disconnectedUserChatId, setDisconnectedUserChatId] =
    useState<UserDisconnectedProps | null>(null);
  //reconnected user chat id
  const [reconnectedUserChatId, setReconnectedUserChatId] =
    useState<UserDisconnectedProps | null>(null);

  //milliseconds->sec
  const totalTimeForRound =
    (roundRecord && roundRecord.roundTimeLimit / 1000) ?? 0;

  const heightPercentageTimeBar = (roundTimeLeft / totalTimeForRound) * 100; // Full height is 100%

  //timer Logic
  useEffect(() => {
    if (isRoundStarted && roundRecord && roundRecord.roundTimeLimit > 0) {
      if (roundTimeLeft < totalTimeForRound) {
        const timer = setInterval(() => {
          setRoundTimeLeft((prev) => {
            if (prev + 1 >= totalTimeForRound) {
              clearInterval(timer); // Stop the timer when limit is reached
              console.log("time up");
              handleUserMove(getRandomMove());
              return totalTimeForRound; // Ensure time is capped at the limit
            }
            return prev + 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundRecord, roundTimeLeft]);

  // ready for game
  useEffect(() => {
    console.log(gameRoomKey, "gameRoomKey", chatId);

    socket.emit(SocketEvents.READY_FOR_GAME, {
      room: gameRoomKey,
      chatId,
    });

    console.log("Ready for game", gameRoomKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Initial round setup
  useEffect(() => {
    console.log("first time call");
    socket.on(SocketEvents.ROUND_START, handleRoundStart);
    socket.on(SocketEvents.ROUND_RESULT, handleRoundResult);
    socket.on(SocketEvents.GAME_OVER, handleGameOver);
    socket.on(SocketEvents.PLAYER_DISCONNECTED, handlePlayerDisconnected);
    socket.on(SocketEvents.PLAYER_TIMEOUT, handlePlayerTimeout);
    socket.on(SocketEvents.OPPONENT_RECONNECTED, handleOpponentReconnected);

    return () => {
      socket.off(SocketEvents.ROUND_START);
      socket.off(SocketEvents.ROUND_RESULT);
      socket.off(SocketEvents.GAME_OVER);
      socket.off(SocketEvents.PLAYER_DISCONNECTED);
      socket.off(SocketEvents.PLAYER_TIMEOUT);
      socket.off(SocketEvents.OPPONENT_RECONNECTED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check round results
  useEffect(() => {
    if (winnerRoundRecord && !winnerRoundRecord?.isDraw) {
      if (winnerRoundRecord?.winnerChatId === user_chatId)
        setUserWinCount((prev) => prev + 1);
      else setOpponnentWinCount((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winnerRoundRecord]);

  useEffect(() => {
    if (winnerRoundRecord) {
      let opponentMove = "";
      let userMove = "";

      // Check if you are player1 then pick player 2's move and vice versa
      if (winnerRoundRecord?.player1?.chatId === user_chatId) {
        opponentMove = winnerRoundRecord?.player2?.move as UserMove;
        userMove = winnerRoundRecord?.player1?.move as UserMove;
      } else {
        opponentMove = winnerRoundRecord?.player1?.move as UserMove;
        userMove = winnerRoundRecord?.player2?.move as UserMove;
      }

      // Get the images based on moves
      const { userMoveImage, opponentMoveImage } = getSelectedImages(
        userMove as UserMove,
        opponentMove as UserMove
      );

      setUserMoveImage(userMoveImage);
      setOpponentMoveImage(opponentMoveImage);
    }
  }, [winnerRoundRecord, user_chatId]);
  // Handle round start
  const handleRoundStart = (data: RoundRecord) => {
    console.log("inside handleRoundStart");
    setRoundTimeLeft(0); //timer reset
    setDisconnectedUserChatId(null);
    setReconnectedUserChatId(null);
    setTimeout(() => {
      setOpponentMoveImage(null); //rest the opponent image
      setUserMoveImage(null); //reset the usermove image
      console.log("Round started", data);
      setWinnerRoundRecord(null);
      setRoundRecord(data);
      setIsRoundStarted(true);
    }, 4000);
  };
  // Handle round result

  const handleRoundResult = (data: string) => {
    console.log("ROUND_RESULT", data);
    setRoundRecord(null); // Reset round
    setUserSelectedMove(null); //reset user move
    setWinnerRoundRecord(JSON.parse(data));
    setIsRoundStarted(false);
    socket.on(SocketEvents.ROUND_START, handleRoundStart);
  };
  // Handle game over
  const handleGameOver = (data: GameOverDTO | null) => {
    console.log("GAME_OVER", data);
    setTimeout(() => setisGameOverModal(true), 2000); // Delay game over modal
    setGameOverResult(data);
  };
  //player disconnected
  const handlePlayerDisconnected = (data: UserDisconnectedProps | null) => {
    console.log("user disconnected");
    setOpponentMoveImage(null);
    setReconnectedUserChatId(null);
    setDisconnectedUserChatId(data);
    setRoundRecord(null);

    setIsRoundStarted(false);
  };
  //handle player time out
  const handlePlayerTimeout = (data: GameOverDTO) => {
    console.log("playerTimeout console", data);
    setTimeout(() => setisGameOverModal(true), 2000); // Delay game over modal
    setGameOverResult(data);
  };
  //opponnent reconnected flow
  const handleOpponentReconnected = (data: UserDisconnectedProps | null) => {
    console.log("user reconnected", data);
    setRoundRecord(null);
    setReconnectedUserChatId(data);
    setDisconnectedUserChatId(null);
  };

  //handle user Move
  const handleUserMove = (userMove: string) => {
    setIsRoundStarted(false);
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
        background: "url('/images/1v1 Round Start.png')",
      }}
    >
      <Box as="p">{chatId}</Box>
      <FixedBgWrapper
        css={{
          position: "fixed",
          height: winnerRoundRecord ? "min(40vh, 35vh)" : "min(20vh,15vh)",
          top: disconnectedUserChatId ? "33px" : 0,
        }}
      >
        {opponentMoveImage && (
          <Box
            as="img"
            //if we have opponnent move from round result
            src={opponentMoveImage}
            css={{
              height: "100%",
              transform: "rotate(180deg)",
            }}
          />
        )}
        {disconnectedUserChatId && (
          <Flex justify={"center"} direction={"column"} align={"center"}>
            <Spinner />
            <Box as="p">
              {disconnectedUserChatId !== user_chatId
                ? "Opponnent  Disconnected"
                : ""}
            </Box>
          </Flex>
        )}
        {!roundRecord && reconnectedUserChatId && (
          <Box as="p">
            {reconnectedUserChatId !== user_chatId
              ? "Opponnent  reconnecting..."
              : ""}
          </Box>
        )}
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
              !disconnectedUserChatId &&
                (roundRecord ? (
                  `Round ${roundRecord?.roundNo}` // Check if roundRecord exists, show the round number
                ) : winnerRoundRecord ? ( //check if round record
                  winnerRoundRecord.isDraw ? (
                    "Draw" // If the game was a draw
                  ) : winnerRoundRecord.winnerChatId === user_chatId ? (
                    "You Won" // If the user won the round
                  ) : (
                    "You Lost"
                  ) // If the user lost the round
                ) : (
                  <Countdown />
                )) // If no round record, indicate that the game is starting
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
      {isGameOverModal && chatId && (
        <WinOverLay gameOverRecord={gameOverResult} userChatId={chatId} />
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
