import { Flex } from "../../../components/Flex/Flex";
import MarketPlaceCard from "./MarketPlaceCard";

const BackgroundOption = () => {
  return (
    <>
      <Flex wrap="wrap" css={{ marginTop: "1rem", gap: ".5rem" }}>
        {[1, 2, 3, 4, 5].map(() => (
          <MarketPlaceCard imageUrl="/images/Background.png" />
        ))}
      </Flex>
    </>
  );
};

export default BackgroundOption;
