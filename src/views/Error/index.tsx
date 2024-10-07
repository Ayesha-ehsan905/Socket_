import { Box } from "../../components/elements";
import { Flex } from "../../components/Flex/Flex";

export const ErrorScreen = () => {
  return (
    <Flex
      css={{ width: "100%", height: "100vh", background: "black" }}
      align={"center"}
      justify={"center"}
      direction={"column"}
    >
      <Box
        as={"h3"}
        css={{
          color: "$white",
          position: "absolute",
          maxWidth: "370px",
          top: "10%",
          textAlign: "center",
          margin: "0 ",
        }}
      >
        Please scan the QR code to play the game on your mobile device.
      </Box>
      <Box
        as={"img"}
        src="/images/qr-code.jpg"
        css={{ maxWidth: "400px", height: "100vh" }}
      />
    </Flex>
  );
};
