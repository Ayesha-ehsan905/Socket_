import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { Flex } from "../../../components/Flex/Flex";
import { Box, Button } from "../../../components/elements";
import { CollectibleImageBoxStyles } from "../../../styles/style";
import InputField from "../../../components/InputFeild/InputFeild";

interface IWithdrawModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const WithdrawModal = ({ setShowModal, showModal }: IWithdrawModalProps) => {
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
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
              }}
              src={"/images/Stone.png"}
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
            Cartoon Hand Set
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
            <InputField
              label="Wallet Address"
              placeholder="Enter Wallet Address"
              value={walletAddress}
              setValue={setWalletAddress}
            />
          )}
        </Flex>

        <Flex
          css={{
            gap: "10px",
            width: "100%",
          }}
        >
          <Button
            variant={!walletAddress ? "disabled" : "filled"}
            css={buttonCss}
            onClick={() => {
              if (isWithdrawn) {
                setShowModal(false);
              } else {
                setIsWithdrawn(true);
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
