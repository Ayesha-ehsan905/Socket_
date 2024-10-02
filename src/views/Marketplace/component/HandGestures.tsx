import React, { useState } from "react";
import { Flex } from "../../../components/Flex/Flex";
import MarketPlaceCard from "./MarketPlaceCard";
import PurchaseModal from "./PurchaseModal";
import { Box } from "../../../components/elements";
import { ICollectiblesProps } from "../type";
import { Spinner } from "../../../components/Loader/Spinner";
import { styled } from "../../../styles";

const HandGestures = ({ collectibles, isApiloading }: ICollectiblesProps) => {
  console.log(!collectibles, "collectibles");
  const [showModal, setShowModal] = useState(false);
  if (isApiloading) {
    return (
      <Flex justify={"center"} align={"center"} css={{ marginTop: "1.5rem" }}>
        <Spinner />
      </Flex>
    ); //Show loader when api is fetching
  }

  return (
    <Flex wrap="wrap" css={{ marginTop: "1.5rem", gap: "1rem" }}>
      <GridWrapper>
        {collectibles &&
          collectibles.length > 0 &&
          collectibles.map((collectible, index) => (
            <React.Fragment key={index}>
              <Box onClick={() => setShowModal(true)}>
                <MarketPlaceCard
                  imageUrl={collectible.image_url}
                  name={collectible.name}
                  price={collectible.price}
                  isPadding={true}
                />
              </Box>
            </React.Fragment>
          ))}
      </GridWrapper>

      {showModal && (
        <PurchaseModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </Flex>
  );
};
export const GridWrapper = styled(Box, {
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", // Adjust card size based on available space
  width: "100%",
  padding: "0 1rem",
});
export default HandGestures;
