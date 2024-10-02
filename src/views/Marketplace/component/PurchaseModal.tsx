import { useState } from "react";
import { Button } from "../../../components/elements";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import Modal from "../../../components/Modal/Modal";
import MarketPlaceCard from "./MarketPlaceCard";

interface IPurchaseModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const PurchaseModal = ({ showModal, setShowModal }: IPurchaseModalProps) => {
  const [isPurchased, setIsPurchased] = useState(false);

  return (
    <Modal show={showModal}>
      <Flex
        justify={"center"}
        direction={"column"}
        align={"center"}
        css={{ gap: "1rem" }}
      >
        {isPurchased ? (
          <Box>
            <Box as="img" src="/images/payment-success.png" />
          </Box>
        ) : (
          <MarketPlaceCard imageUrl="/images/Stone.png" isPadding={true} />
        )}
        <Box css={{ textAlign: "center" }}>
          {isPurchased
            ? "Purchase Successfull!"
            : "Are you sure you want to purchase Robot Hand Gesture?"}
        </Box>
        <Flex
          css={{
            gap: "10px",
            width: "100%",
            flexDirection: isPurchased ? "row-reverse" : "row",
          }}
        >
          {/*Note: If is purchased flex is row reversed */}
          {/*Todo: Implement navigation and navigation check */}
          <Button
            variant="filled"
            css={{ flex: 1 }}
            onClick={() => setIsPurchased(true)}
          >
            {isPurchased ? "Inventory" : "Confirm"}
          </Button>
          <Button
            variant="outlined"
            css={{ flex: 1 }}
            onClick={() => setShowModal(false)}
          >
            {isPurchased ? "Continue" : "Cancel"}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default PurchaseModal;
