import { Flex } from "../Flex/Flex";
import { Spinner } from "../Loader/Spinner";

const APILoader = () => {
  return (
    <Flex justify={"center"} align={"center"} css={{ marginTop: "1.5rem" }}>
      <Spinner />
    </Flex>
  );
};

export default APILoader;
