import { Box } from "../../components/elements";
import { Flex } from "../../components/Flex/Flex";

export const ErrorScreen = () => {
  return (
    <Flex
      style={{ width: "100%", height: "100vh", background: "black" }}
      align={"center"}
      justify={"center"}
    >
      <Box
        as={"img"}
        src="/images/qr-code.jpg"
        css={{ maxWidth: "400px", height: "100vh" }}
      />
    </Flex>
  );
};
