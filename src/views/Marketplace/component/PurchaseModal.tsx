import { useState } from "react";
import { Button } from "../../../components/elements";
import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import Modal from "../../../components/Modal/Modal";
import MarketPlaceCard from "./MarketPlaceCard";
import { Collectible, ErrorResponse } from "../../../utilis/type";
import { useAuth } from "../../../components/contexts/AuthContext/useAuth";
import { axios } from "../../../lib/axios";
import { endpoint } from "../../../utilis/endpoints";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../utilis/constant";
import { AxiosError } from "axios";

interface IPurchaseModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  userSelectedCollectible: Collectible | null;
  setIsApiReFetched?: (value: boolean) => void;
}

const PurchaseModal = ({
  showModal,
  setShowModal,
  userSelectedCollectible,
  setIsApiReFetched,
}: IPurchaseModalProps) => {
  const { userData } = useAuth();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();
  const handleCollectiablesPurchased = async () => {
    console.log("inside");
    setIsApiLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${userData.token}` },
      };

      await axios.patch(
        `${endpoint.collectiblesPurchased}${userSelectedCollectible?.id}`,
        {},
        config
      );
      setIsPurchased(true);
      setIsApiLoading(false);
    } catch (error) {
      setIsApiLoading(true);
      setIsPurchased(false);
      const axiosError = error as AxiosError<ErrorResponse>;
      setApiError(
        axiosError?.response?.data?.message || "An unexpected error occurred"
      );
      console.error("Error on purchasing collectibles :", error);
    }
  };

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
          userSelectedCollectible && (
            <MarketPlaceCard
              imageUrl={userSelectedCollectible?.image_url}
              name={userSelectedCollectible?.name}
              price={userSelectedCollectible?.price}
              isBackgroundCollectibles={true}
              isPadding={false}
            />
          )
        )}
        <Box
          css={{ textAlign: "center", fontFamily: "$Gilmer", fontSize: "16px" }}
        >
          {isPurchased ? (
            "Purchase Successfull!"
          ) : (
            <Box as="p" css={{ fontFamily: "$Gilmer", fontSize: "16px" }}>
              Are you sure you want to purchase
              <Box
                as="span"
                css={{
                  fontFamily: "$Gilmer",
                  fontWeight: "$bold",
                  fontSize: "16px",
                }}
              >
                &nbsp;
                {userSelectedCollectible?.name}
              </Box>
              ?
            </Box>
          )}
        </Box>

        {!!apiError && (
          <Box css={{ textAlign: "center", color: "$error" }}>
            Error: {apiError}
          </Box>
        )}
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
            variant={
              isApiLoading ? "disabled" : isPurchased ? "outlined" : "filled"
            }
            css={{ flex: 1 }}
            onClick={() => {
              if (!isPurchased) {
                handleCollectiablesPurchased();
              } else {
                navigate(routes.profile, { state: { tabNumber: 1 } });
              }
            }}
          >
            {isPurchased ? "Inventory" : "Confirm"}
          </Button>
          <Button
            variant={isPurchased ? "filled" : "outlined"}
            css={{ flex: 1 }}
            onClick={() => {
              if (isPurchased) {
                setIsApiReFetched?.(true);
              }
              setShowModal(false);
            }}
          >
            {isPurchased ? "Continue" : "Cancel"}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default PurchaseModal;
