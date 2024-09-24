import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { useSocket } from "../../hooks/useSocket";
import { SocketEvents } from "../../utilis/enum";
import LoadingDots from "./component/LoadingDots";
import { useAvatarProps } from "../../utilis/type";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utilis/constant";
import { BackgroundCardCSS } from "../../styles/style";

const MatchingOpponent = () => {
  const { socket, disconnectSocketEvent } = useSocket();
  const [gameRoomKey, setGameRoomKey] = useState<null | string>(null);

  const [fade, setFade] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameRoomKey) {
      const timer = setTimeout(() => {
        //wait for 3sec then fade false
        setFade(false);
        setTimeout(() => {
          navigate(routes.One_one, { state: { gameRoomKey, chatId: 1 } }); //wait for 1 sec then navigate
        }, 2000);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [gameRoomKey, navigate]);

  useEffect(() => {
    if (!gameRoomKey) {
      socket.on(SocketEvents.WAITING, (data) => {
        console.log("SocketEvents.WAITING:", data);
      });
      socket.on(SocketEvents.GAME_START, (data) => {
        console.log("gameStart", data);
        setGameRoomKey(data?.room);
      });

      return () => {
        disconnectSocketEvent(SocketEvents.WAITING);
        disconnectSocketEvent(SocketEvents.GAME_START);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
        opacity: fade ? 1 : 0,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <Box
        css={{
          ...BackgroundCardCSS,
          background: "url('/images/MatchingOponent.png')",
        }}
      >
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          css={{ height: "100vh" }}
        >
          {gameRoomKey ? (
            <>
              <UserAvatar label="Opponent" image="/images/avatar_1.png" />
              <Box as="span" css={{ fontSize: "56px", margin: "60px 0" }}>
                Get Ready
              </Box>
            </>
          ) : (
            <>
              <UserAvatar
                label={<LoadingDots />}
                image="/images/Mask-group.png"
              />
              <Box as="span" css={{ fontSize: "120px", marginTop: "60px" }}>
                VS
              </Box>
            </>
          )}

          <UserAvatar label={"You"} image="/images/avatar_1.png" />
        </Flex>
      </Box>
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

export default MatchingOpponent;
