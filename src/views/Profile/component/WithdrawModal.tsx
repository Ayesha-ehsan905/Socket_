import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { Flex } from "../../../components/Flex/Flex";
import { Box, Button } from "../../../components/elements";
import { CollectibleImageBoxStyles } from "../../../styles/style";
import InputField from "../../../components/InputFeild/InputFeild";
import { endpoint } from "../../../utilis/endpoints";
import { useAuth } from "../../../components/contexts/AuthContext/useAuth";
import { axios } from "../../../lib/axios";
import { AxiosError } from "axios";
import { Collectible, ErrorResponse } from "../../../utilis/type";

interface IWithdrawModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  collectable: Collectible;
  setRefetch?: (value: boolean) => void;
}

const WithdrawModal = ({
  setShowModal,
  showModal,
  collectable,
  setRefetch,
}: IWithdrawModalProps) => {
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);
  const { userData } = useAuth();

  const withdrawCollectable = async (collectibleId: number) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userData.token}` },
      };

      // Api call to withdraw collectable
      await axios.patch(
        `${endpoint.withdrawCollectable}/${collectibleId}?address=${walletAddress}`,
        {},
        config
      );
      setIsWithdrawn(true);
    } catch (error) {
      //api error handling
      const axiosError = error as AxiosError<ErrorResponse>;
      setApiError(
        axiosError?.response?.data?.message || "An unexpected error occurred"
      );
      console.error("Error Applying Collectable:", error);
    }
  };
  return (
    <Modal show={showModal}>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <Flex align={"center"} direction={"column"}>
          <Box css={CollectibleImageBoxStyles}>
            <Box
              as="img"
              css={{
                height: "100%",
                width: "100%",
                maxHeight: "120px",
                maxWidth: "94px",
                objectFit: "contain",
              }}
              src={collectable?.image_url}
            />
          </Box>
          <Box
            as="p"
            css={{
              ...textStyles,
              fontSize: "$14",
              margin: "12px 0 0",
            }}
          >
            {collectable?.name}
          </Box>
        </Flex>
        {!isWithdrawn && (
          <Box
            as="p"
            css={{
              ...textStyles,
              fontSize: "$16",
              margin: "24px 0",
            }}
          >
            Please enter wallet address below where you want to withdraw this
            NFT.{" "}
          </Box>
        )}
        <Flex css={{ width: "100%" }}>
          {isWithdrawn ? (
            <Box
              as="p"
              css={{
                ...textStyles,
                fontSize: "$16",
                margin: "24px 0",
              }}
            >
              You have successfully withdrawn your collectible to{" "}
              <Box as="span" css={{ fontWeight: "$bold" }}>
                {walletAddress}
              </Box>
            </Box>
          ) : (
            <Flex direction={"column"} css={{ width: "100%" }}>
              <InputField
                label="Wallet Address"
                placeholder="Enter Wallet Address"
                value={walletAddress}
                setValue={setWalletAddress}
              />
              {apiError && (
                <Box as="p" css={{ color: "$error", margin: "8px 0 0 " }}>
                  {" "}
                  {apiError}
                </Box>
              )}
            </Flex>
          )}
        </Flex>

        <Flex
          css={{
            gap: "10px",
            width: "100%",
            mt: "20px",
          }}
        >
          <Button
            variant={!walletAddress ? "disabled" : "filled"}
            css={buttonCss}
            onClick={() => {
              if (isWithdrawn) {
                setShowModal(false);
                setRefetch?.(true);
              } else {
                withdrawCollectable(collectable?.id);
              }
            }}
          >
            {isWithdrawn ? "Continue" : "Withdraw"}
          </Button>
          <Button
            variant="outlined"
            css={{
              ...buttonCss,
              display: isWithdrawn ? "none" : "block",
            }}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default WithdrawModal;

const buttonCss = {
  flex: 1,
  fontSize: "$16",
  padding: "12px",
};

const textStyles = {
  fontFamily: "$Gilmer",
  textAlign: "center",
  fontWeight: "$semibold",
};
