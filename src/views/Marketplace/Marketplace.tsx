import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { styled } from "../../styles";
import { HeadingCss, navBottomSpace } from "../../styles/style";
import NavigationMenu from "../Dashboard/component/NavigationMenu";
import { UserCardBox, UserDetailCard } from "../Dashboard/component/UserCard";
import BackgroundOption from "./component/BackgroundOption";
import HandGestures from "./component/HandGestures";
import Tabs from "./component/Tabs";
import { useAuth } from "../../components/contexts/AuthContext/useAuth";
import { axios } from "../../lib/axios";
import { endpoint } from "../../utilis/endpoints";
import { Collectible, ErrorResponse } from "../../utilis/type";
import { COLLECTABLE_TYPE } from "../../utilis/enum";
import Alert from "../../components/Popup";
import { AxiosError } from "axios";

const Marketplace = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const { userData } = useAuth();
  const [apiError, setApiError] = useState("");
  const [isApiError, setIsApiError] = useState(false);
  const [marketplaceCollectibles, setMarketplaceCollectibles] = useState<
    Collectible[] | null
  >(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [isApiReFetched, setIsApiReFetched] = useState(false);

  useEffect(() => {
    // fetchMarketplaceData data only when tabNumber changes
    setMarketplaceCollectibles(null);

    fetchMarketplaceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabNumber]);
  useEffect(() => {
    if (isApiReFetched) fetchMarketplaceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApiReFetched]);

  //fetch marketpalce data
  const fetchMarketplaceData = async () => {
    setLoading(true); // Start loading
    try {
      const config = {
        headers: { Authorization: `Bearer ${userData.token}` },
      };
      const collectiblesType =
        tabNumber === 0
          ? COLLECTABLE_TYPE.HAND_GESTURE
          : COLLECTABLE_TYPE.BACKGROUND;
      const marketplaceResponse = await axios.get(
        `${endpoint.collectibles}?type=${collectiblesType}`,
        config
      );

      setMarketplaceCollectibles(marketplaceResponse?.data.data);
      setLoading(false); // End loading when data is fetched
    } catch (error) {
      //error handling
      const axiosError = error as AxiosError<ErrorResponse>;
      setApiError(
        axiosError?.response?.data?.message || "An unexpected error occurred"
      );
      setLoading(false); // End loading if there's an error

      console.error("Error  collectibles data:", error);
    }
  };
  const tabData = [
    {
      label: "Hand Gestures",
      component: (
        <HandGestures
          collectibles={marketplaceCollectibles as Collectible[]}
          isApiloading={loading}
          isApiError={isApiError}
          setIsApiReFetched={setIsApiReFetched}
        />
      ),
    },
    {
      label: "Backgrounds",
      component: (
        <BackgroundOption
          collectibles={marketplaceCollectibles as Collectible[]}
          isApiloading={loading}
          isApiError={isApiError}
          setIsApiReFetched={setIsApiReFetched}
        />
      ),
    },
    // Add more tabs here as needed
  ];
  return (
    <>
      <Box css={{ background: "$white1", minHeight: "100vh" }}>
        <UserCardBox css={{ background: "$white", height: "72px" }}>
          <UserDetailCard />
        </UserCardBox>
        <Box css={{ ...navBottomSpace, padding: "24px 16px 24px 1rem" }}>
          <Flex direction={"row"} wrap={"wrap"}>
            <Box css={HeadingCss}>Marketplace</Box>
            <Box
              css={{
                fontSize: "$16",
                fontWeight: "$normal",
                fontFamily: "$Gilmer",
                paddingTop: "1rem",
                color: "$black",
              }}
            >
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
              dolor sit amet .
            </Box>
          </Flex>
          <Divder />
          {/* Add more tabs here as needed */}
          <Tabs
            tabData={tabData}
            setTabNumber={setTabNumber}
            tabNumber={tabNumber}
          />
        </Box>
        <NavigationMenu />
      </Box>
      {/* Popup on api error */}
      {apiError && (
        <Alert
          text={apiError}
          open={!!apiError}
          severity={"error"}
          onClose={() => {
            //error state to display no record found,
            //if api through error
            setIsApiError(true);
            setApiError("");
          }}
        />
      )}
    </>
  );
};

export const Divder = styled(Box, {
  marginTop: "1rem",
  border: "1px solid $grey5",
});
export default Marketplace;
