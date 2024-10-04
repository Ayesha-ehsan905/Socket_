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
import { Collectible, ErrorResponse } from "../../../utilis/type";
import APILoader from "../../../components/ApiLoader";
import NoItemsFind from "../../../components/NoItemsFind/NoItemsFind";
import { endpoint } from "../../../utilis/endpoints";
import { axios } from "../../../lib/axios";
import { useAuth } from "../../../components/contexts/AuthContext/useAuth";
import Alert from "../../../components/Popup";
import { AxiosError } from "axios";
import { changeBackgroundImage } from "../../../utilis/function";

interface ICollectiblesProps {
  collectibles: Collectible[];
  isApiloading?: boolean;
  setRefetch?: (value: boolean) => void;
}

const Collectibles = ({
  collectibles,
  isApiloading,
  setRefetch,
}: ICollectiblesProps) => {
  const [showModal, setShowModal] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { userData } = useAuth();

  const applyCollectible = async (collectibleId: number, image_url: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${userData.token}` },
      };
      // Api call to apply collectable
      await axios.patch(
        `${endpoint.applyCollectable}/${collectibleId}`,
        {},
        config
      );
      //applied the background image on 1v1 match
      changeBackgroundImage(image_url);
      setRefetch?.(true);
    } catch (error) {
      //api error handling
      const axiosError = error as AxiosError<ErrorResponse>;
      setApiError(
        axiosError?.response?.data?.message || "An unexpected error occurred"
      );
      console.error("Error Applying Collectable:", error);
    }
  };

  if (isApiloading) return <APILoader />;
  return (
    <Box css={navBottomSpace}>
      <Divder />
      <Box as="h2" css={HeadingCss}>
        Items
      </Box>
      {/*TODO: Integrate Api and map data here */}
      <Flex css={{ gap: "16px" }} direction={"column"}>
        {collectibles &&
          collectibles.length > 0 &&
          collectibles.map((collectible, index) => (
            <Flex
              align={"center"}
              css={{ gap: "16px", width: "100%" }}
              key={index}
            >
              <Flex align={"center"}>
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
                    src={collectible?.image_url}
                  />
                </Box>
              </Flex>
              <Box>
                <Box
                  as="h2"
                  css={{
                    fontSize: "$18",
                    fontFamily: "$Gilmer",
                    margin: "0 0 20px",
                  }}
                >
                  {collectible?.name}
                </Box>
                <Flex css={{ gap: "16px" }}>
                  <Button
                    css={{ fontSize: "$16", padding: "12px" }}
                    onClick={() => setShowModal(true)}
                  >
                    Withdraw
                  </Button>
                  <Button
                    variant="outlined"
                    css={{
                      fontSize: "$16",
                      padding: "12px",
                      pointerEvents: collectible?.is_applied ? "none" : "auto",
                    }}
                    onClick={() =>
                      applyCollectible(collectible?.id, collectible?.image_url)
                    }
                  >
                    {collectible?.is_applied ? "Applied" : "Apply"}
                  </Button>
                </Flex>
              </Box>

              {showModal && (
                <WithdrawModal
                  setShowModal={setShowModal}
                  showModal={showModal}
                  collectable={collectible}
                  setRefetch={setRefetch}
                />
              )}
            </Flex>
          ))}
        {collectibles && collectibles.length === 0 && (
          <NoItemsFind text={"No Collectibles Found"} />
        )}
        {apiError && (
          <Alert
            text={apiError}
            open={!!apiError}
            severity={"error"}
            onClose={() => setApiError("")}
          />
        )}
      </Flex>
    </Box>
  );
};

export default Collectibles;
