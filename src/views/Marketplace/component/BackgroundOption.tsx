import React, { useState } from "react";
import { Flex } from "../../../components/Flex/Flex";
import MarketPlaceCard from "./MarketPlaceCard";
import PurchaseModal from "./PurchaseModal";
import { Box } from "../../../components/elements";
import { ICollectiblesProps } from "../type";
import { Spinner } from "../../../components/Loader/Spinner";
import { GridWrapper } from "./HandGestures";

const BackgroundOption = ({
  collectibles,
  isApiloading,
}: ICollectiblesProps) => {
  const [showModal, setShowModal] = useState(false);
  if (isApiloading) {
    return (
      <Flex justify={"center"} align={"center"} css={{ marginTop: "1.5rem" }}>
        <Spinner />
      </Flex>
    ); // Show loader when api is fetching
  }
  return (
    <>
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
                  />
                </Box>
              </React.Fragment>
            ))}
        </GridWrapper>
        {showModal && (
          <PurchaseModal showModal={showModal} setShowModal={setShowModal} />
        )}
      </Flex>
    </>
  );
};

export default BackgroundOption;
