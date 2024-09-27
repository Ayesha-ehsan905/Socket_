import React, { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { SocketEvents } from "../../utilis/enum";
import LoadingDots from "./component/LoadingDots";
import { GameStartType, useAvatarProps } from "../../utilis/type";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utilis/constant";
import { useTelegram } from "../../hooks/useTelegram";
import { useSocketContext } from "../../components/SocketContext/useSocketContext";

const MatchingOpponent = () => {
  const { socket } = useSocketContext();
  const [gameRoomInfo, setGameRoomInfo] = useState<null | GameStartType>(null);
  const [OpponentName, setOpponentName] = useState<string | null>(null);
  const { chatId } = useTelegram(); //current user chat_id

  const [fade, setFade] = useState(true);
  const navigate = useNavigate();
  console.log("socket  connection from Matching opponenet", socket.connected);

  useEffect(() => {
    if (!gameRoomInfo) {
      socket.on(SocketEvents.GAME_START, (data) => {
        console.log("gameStart", data);
        setGameRoomInfo(data);
      });

      return () => {
        socket.off(SocketEvents.GAME_START);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // concate the oppositie player name
    if (gameRoomInfo) {
      if (gameRoomInfo?.player1.chatId === chatId?.toString()) {
        const OpponentName =
          gameRoomInfo?.player2?.first_name +
          " " +
          gameRoomInfo?.player2?.last_name;
        setOpponentName(OpponentName);
      } else {
        const OpponentName =
          gameRoomInfo?.player1?.first_name +
          " " +
          gameRoomInfo?.player1?.last_name;
        setOpponentName(OpponentName);
      }
    }
  }, [chatId, gameRoomInfo]);

  useEffect(() => {
    if (OpponentName) {
      const timer = setTimeout(() => {
        //wait for 3sec then fade false
        setFade(false);
        setTimeout(() => {
          navigate(routes.One_one, {
            state: { gameRoomKey: gameRoomInfo?.room, chatId: chatId },
          }); //wait for 1 sec then navigate
        }, 2000);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [OpponentName, chatId, gameRoomInfo, navigate]);

  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
        opacity: fade ? 1 : 0,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <MatchingOponentLayout>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          css={{ height: "100vh", position: "relative" }}
        >
          {gameRoomInfo ? (
            <>
              <UserAvatar label={OpponentName} image="/images/avatar_1.png" />
              <Box as="span" css={{ fontSize: "5vh", margin: "5vh 0" }}>
                Get Ready
              </Box>
            </>
          ) : (
            <>
              <UserAvatar
                label={<LoadingDots />}
                image="/images/Mask-group.png"
              />
              <Box as="span" css={{ fontSize: "11vh", margin: "5vh 0" }}>
                VS
              </Box>
            </>
          )}

          <UserAvatar label={"You"} image="/images/avatar_1.png" />
        </Flex>
      </MatchingOponentLayout>
      {/* </Box> */}
    </Box>
  );
};
const UserAvatar = (props: useAvatarProps) => {
  const { label, image } = props;
  return (
    <Flex direction="column" justify="center" wrap="wrap">
      <Box as="img" src={image} css={{ width: "80px", height: "80px" }} />
      <Box
        as="span"
        css={{ textAlign: "center", mt: "1rem", fontSize: "$20px" }}
      >
        {label}
      </Box>
    </Flex>
  );
};

export const MatchingOponentLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box css={{ position: "relative" }}>
      <Box
        as="img"
        css={{
          zIndex: 0,
          position: "absolute",
          width: "100vw",
          height: "100vh",
        }}
        src="/images/MatchingOponent.png"
      />
      <Box css={{ zIndex: 10 }}> {children}</Box>
    </Box>
  );
};

export default MatchingOpponent;
