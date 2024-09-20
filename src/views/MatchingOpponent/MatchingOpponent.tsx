import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { useSocket } from "../../hooks/useSocket";
import { styled } from "../../styles";
import { SocketEvents } from "../../utilis/enum";

const MatchingOpponent = () => {
  const { socket, disconnectSocket } = useSocket();
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
        disconnectSocket(SocketEvents.WAITING);
        disconnectSocket(SocketEvents.GAME_START);
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
                <Flex direction={"column"} justify={"center"} wrap={"wrap"}>
                  <Box
                    as="img"
                    src="/images/avatar.png"
                    css={{ width: "80px", height: "80px" }}
                  />
                  <Box
                    as="span"
                    css={{ textAlign: "center", mt: "1rem", fontSize: "$20px" }}
                  >
                    You
                  </Box>
                </Flex>
                <Box as="span" css={{ fontSize: "56px", marginTop: "60px" }}>
                  Get Ready
                </Box>
              </>
            ) : (
              <>
                <Flex direction={"column"} justify={"center"} wrap={"wrap"}>
                  <Box as="img" src="/images/Mask-group.png" />
                  <Box
                    as="span"
                    css={{ textAlign: "center", mt: "1rem", fontSize: "$20px" }}
                  >
                    Searching...
                  </Box>
                </Flex>
                <Box as="span" css={{ fontSize: "120px", marginTop: "60px" }}>
                  VS
                </Box>
              </>
            )}

            <Flex direction={"column"} justify={"center"} wrap={"wrap"}>
              <Box
                as="img"
                src="/images/avatar.png"
                css={{ width: "80px", height: "80px" }}
              />
              <Box
                as="span"
                css={{ textAlign: "center", mt: "1rem", fontSize: "$20px" }}
              >
                You
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </MatchingOponentCard>
    </Box>
  );
};

const MatchingOponentCard = styled(Box, {
  background: "url('/images/MatchingOponent.png')",
  width: "100vw",
  height: "100vh",
});

export default MatchingOpponent;
