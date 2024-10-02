import { useState } from "react";
import { Box, Button } from "../../../components/elements";
import { Flex } from "../../../components/Flex/Flex";
import WithdrawModal from "./WithdrawModal";
import {
  CollectibleImageBoxStyles,
  HeadingCss,
  navBottomSpace,
} from "../../../styles/style";
import { Divder } from "../../Marketplace/Marketplace";

const Collectibles = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box css={navBottomSpace}>
      <Divder />
      <Box as="h2" css={HeadingCss}>
        Items
      </Box>
      {/*TODO: Integrate Api and map data here */}
      <Flex css={{ gap: "16px" }} direction={"column"}>
        {[1, 2, 3].map(() => (
          <Flex align={"center"} justify={"between"}>
            <Flex css={{ gap: "16px" }} align={"center"}>
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
                as="h2"
                css={{
                  fontSize: "$18",
                  fontFamily: "$Gilmer",
                  margin: "24px 0",
                }}
              >
                Arcade Machine
              </Box>
            </Flex>
            <Button
              css={{ fontSize: "$16", padding: "12px" }}
              onClick={() => setShowModal(true)}
            >
              Withdraw
            </Button>
          </Flex>
        ))}
      </Flex>

      {showModal && (
        <WithdrawModal setShowModal={setShowModal} showModal={showModal} />
      )}
    </Box>
  );
};

export default Collectibles;