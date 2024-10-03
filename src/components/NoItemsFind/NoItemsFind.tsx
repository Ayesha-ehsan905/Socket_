import { Box } from "../elements";
import { Flex } from "../Flex/Flex";

export type NoItemsFindProps = {
  text: string;
};

const NoItemsFind = ({ text }: NoItemsFindProps) => {
  return (
    <Flex justify={"center"} align={"center"} css={{ minHeight: "40vh" }}>
      <Box
        as="p"
        css={{ fontSize: "$14", fontFamily: "$Baloo", fontWeight: "$bold" }}
      >
        {text}
      </Box>
    </Flex>
  );
};

export default NoItemsFind;
