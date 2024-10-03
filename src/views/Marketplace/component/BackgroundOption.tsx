import React, { useState } from "react";
import { Flex } from "../../../components/Flex/Flex";
import MarketPlaceCard from "./MarketPlaceCard";
import PurchaseModal from "./PurchaseModal";
import { Box } from "../../../components/elements";
import { ICollectiblesProps } from "../type";
import { GridWrapper } from "./HandGestures";
import APILoader from "../../../components/ApiLoader";
import NoItemsFind from "../../../components/NoItemsFind/NoItemsFind";
import { Collectible } from "../../../utilis/type";
import { RECORD_NOT_FOUND } from "../../../utilis/enum";

const BackgroundOption = ({
  collectibles,
  isApiloading,
  isApiError,
  setIsApiReFetched,
}: ICollectiblesProps) => {
  const [showModal, setShowModal] = useState(false);
  const [userSelectedCollectible, setUserSelectedCollectible] =
    useState<Collectible | null>(null);
  if (isApiloading) {
    return <APILoader />; // Show loader when api is fetching
  }
  return (
    <>
      <Flex wrap="wrap" css={{ marginTop: "1.5rem", gap: "1rem" }}>
        <GridWrapper>
          {collectibles &&
            collectibles.length > 0 &&
            collectibles.map((collectible, index) => (
              <React.Fragment key={index}>
                <Box
                  onClick={() => {
                    setUserSelectedCollectible(collectible);
                    setShowModal(true);
                  }}
                >
                  <MarketPlaceCard
                    imageUrl={collectible.image_url}
                    name={collectible.name}
                    price={collectible.price}
                  />
                </Box>
              </React.Fragment>
            ))}
          {((collectibles && collectibles.length === 0) || isApiError) && (
            <NoItemsFind text={RECORD_NOT_FOUND.ITEM_NOT_FOUND} />
          )}
        </GridWrapper>

        {showModal && (
          <PurchaseModal
            setIsApiReFetched={setIsApiReFetched}
            showModal={showModal}
            setShowModal={setShowModal}
            userSelectedCollectible={userSelectedCollectible}
          />
        )}
      </Flex>
    </>
  );
};

export default BackgroundOption;
