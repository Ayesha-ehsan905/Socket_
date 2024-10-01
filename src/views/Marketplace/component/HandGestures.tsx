import { Flex } from "../../../components/Flex/Flex";
import MarketPlaceCard from "./MarketPlaceCard";

const HandGestures = () => {
  return (
    <Flex wrap="wrap" css={{ marginTop: "1rem", gap: ".5rem" }}>
      {[1, 2, 3, 4, 5].map(() => (
        <MarketPlaceCard imageUrl="/images/Stone.png" isPadding={true} />
      ))}
    </Flex>
  );
};

export default HandGestures;
