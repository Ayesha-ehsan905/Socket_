import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { useSocket } from "../../hooks/useSocket";
import { styled } from "../../styles";
import { SocketEvents } from "../../utilis/enum";
import LoadingDots from "./component/LoadingDots";
import { useAvatarProps } from "../../utilis/type";

const MatchingOpponent = () => {
  const { socket, disconnectSocketEvent } = useSocket();
  const [gameRoomKey, setGameRoomKey] = useState("");
  useEffect(() => {
    // socket.emit(SocketEvents.SEARCH_GAME, { chatId: 1 });
    // console.log("serarch game");
    if (gameRoomKey === "") {
      socket.on(SocketEvents.WAITING, (data) => {
        console.log("socketData:", data);
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
  }, [gameRoomKey]);
  console.log("roomKey", gameRoomKey);
  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <MatchingOponentCard>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          css={{ height: "100vh" }}
        >
          <Flex
            direction={"column"}
            align={"center"}
            justify={"between"}
            css={{ height: "60vh" }}
          >
            {gameRoomKey ? (
              <>
                <UserAvatar label="Opponenet" image="/images/avatar.png" />
                <Box as="span" css={{ fontSize: "56px", marginTop: "60px" }}>
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

            <UserAvatar label={"You"} image="/images/avatar.png" />
          </Flex>
        </Flex>
      </MatchingOponentCard>
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
const MatchingOponentCard = styled(Box, {
  background: "url('/images/MatchingOponent.png')",
  width: "100vw",
  height: "100vh",
});

export default MatchingOpponent;
