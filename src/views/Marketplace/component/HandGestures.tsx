import { useState } from "react";
import { Flex } from "../../../components/Flex/Flex";
import MarketPlaceCard from "./MarketPlaceCard";
import PurchaseModal from "./PurchaseModal";
import { Box } from "../../../components/elements";

const HandGestures = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Flex wrap="wrap" css={{ marginTop: "1rem", gap: "1rem" }}>
      {[1, 2, 3, 4, 5].map(() => (
        <Box onClick={() => setShowModal(true)}>
          <MarketPlaceCard imageUrl="/images/Stone.png" isPadding={true} />
        </Box>
      ))}
      {showModal && (
        <PurchaseModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </Flex>
  );
};

export default HandGestures;
