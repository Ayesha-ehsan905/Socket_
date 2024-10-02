import { useState } from "react";
import { Flex } from "../../../components/Flex/Flex";
import MarketPlaceCard from "./MarketPlaceCard";
import PurchaseModal from "./PurchaseModal";
import { Box } from "../../../components/elements";

const BackgroundOption = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Flex wrap="wrap" css={{ marginTop: "1rem", gap: ".5rem" }}>
        {[1, 2, 3, 4, 5].map(() => (
          <Box onClick={() => setShowModal(true)}>
            <MarketPlaceCard imageUrl="/images/Background.png" />
          </Box>
        ))}
        {showModal && (
          <PurchaseModal showModal={showModal} setShowModal={setShowModal} />
        )}
      </Flex>
    </>
  );
};

export default BackgroundOption;
