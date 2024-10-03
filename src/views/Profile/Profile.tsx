import { useEffect, useState } from "react";
import { Box } from "../../components/elements";
import Tabs from "../Marketplace/component/Tabs";
import Collectibles from "./component/Collectibles";
import PersonalDetails from "./component/PersonalDetails";
import { Flex } from "../../components/Flex/Flex";
import { styled } from "../../styles";
import { BackgroundCardCSS } from "../../styles/style";
import NavigationMenu from "../Dashboard/component/NavigationMenu";
import { ClipboardIcon, TickIcon } from "../../components/icons";
import { axios } from "../../lib/axios";
import { endpoint } from "../../utilis/endpoints";
import { useAuth } from "../../components/contexts/AuthContext/useAuth";
import { UserDTO } from "../../components/contexts/AuthContext/type";
import { truncateString } from "../../utilis/function";
import { Collectible, ErrorResponse } from "../../utilis/type";
import Alert from "../../components/Popup";
import { useLocation } from "react-router-dom";
import { AxiosError } from "axios";

const Profile = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Track initial load
  const [userDetails, setUserDetails] = useState<UserDTO>();
  const [userCollectibles, setUserCollectibles] = useState<Collectible[]>();
  const [isCopied, setIsCopied] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const { userData } = useAuth();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const location = useLocation();
  const tab_number = location.state?.tabNumber;
  useEffect(() => {
    if (tab_number) {
      setTabNumber(tab_number);
    }
  }, [tab_number]);

  const tabData = [
    {
      label: "Profile Details",
      component: (
        <PersonalDetails
          first_name={userDetails?.user?.first_name ?? ""}
          last_name={userDetails?.user?.last_name ?? ""}
          isApiloading={loading}
        />
      ),
    },
    {
      label: "Collectibles",
      component: (
        <Collectibles
          collectibles={userCollectibles as Collectible[]}
          isApiloading={loading}
          setRefetch={setRefetch}
        />
      ),
    },
    // Add more tabs here as needed
  ];

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);

  // create functions to fetch profile and collectibles data

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!refetch) return; // If refetch is false, exit

      setLoading(true); // Start loading

      try {
        const config = {
          headers: { Authorization: `Bearer ${userData.token}` },
        };

        // Initialize variables to hold the API responses
        let profileResponse, collectiblesResponse;

        // First load: Call both profile and collectibles APIs
        if (isFirstLoad) {
          [profileResponse, collectiblesResponse] = await Promise.all([
            axios.get(endpoint.userProfile, config),
            axios.get(endpoint.userCollectables, config),
          ]);

          // Set user details state
          setUserDetails({
            token: userData.token,
            user: profileResponse.data.data.user,
            wallet: profileResponse.data.data.wallet,
          });

          // Set isFirstLoad to false after the initial load
          setIsFirstLoad(false);
        } else {
          // On subsequent loads, only fetch the collectibles API
          collectiblesResponse = await axios.get(
            endpoint.userCollectables,
            config
          );
        }

        // Set user collectibles state
        setUserCollectibles(collectiblesResponse.data.data);

        setLoading(false); // Stop loading
        setRefetch(false); // Reset refetch state
      } catch (error) {
        // Handle API error
        const axiosError = error as AxiosError<ErrorResponse>;
        setApiError(
          axiosError?.response?.data?.message || "An unexpected error occurred"
        );
        console.error("Error fetching profile or collectibles data:", error);

        setLoading(false); // Stop loading
        setRefetch(false); // Reset refetch state
      }
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch, userData.token]);
  return (
    <>
      <Box css={{ ...BackgroundCardCSS, background: "$white1" }}>
        {/* Add more tabs here as needed */}
        <ProfileCardWrapper>
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            css={{ height: "100%" }}
          >
            {tabNumber === 0 ? (
              <>
                <ProfileImageWrapper>
                  <Box as="img" src="/images/Profile-avatar.png" />
                </ProfileImageWrapper>
                <Box
                  css={{
                    marginTop: "1rem",
                    fontSize: "$24",
                    fontFamily: "$Baloo",
                    fontWeight: "$normal",
                  }}
                >
                  John Doe
                </Box>
              </>
            ) : (
              <>
                <Flex direction={"row"} align={"center"} css={{ gap: "8px" }}>
                  <Box
                    as="p"
                    css={{
                      fontFamily: "$Gilmer",
                      fontWeight: "$bold",
                      fontSize: "28px",
                      margin: "0",
                    }}
                  >
                    {userDetails?.wallet?.address
                      ? truncateString(userDetails?.wallet?.address, 5, 5)
                      : "No Wallet Address"}
                  </Box>
                  <Box
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText(
                        userDetails?.wallet?.address ?? ""
                      );
                    }}
                  >
                    {isCopied ? <TickIcon /> : <ClipboardIcon />}
                  </Box>
                </Flex>
                <Box
                  css={{
                    marginTop: "1rem",
                    fontSize: "$16",
                    fontFamily: "$Gilmer",
                    fontWeight: "$medium",
                  }}
                >
                  Wallet Address
                </Box>
              </>
            )}
          </Flex>
        </ProfileCardWrapper>
        <Box css={{ margin: "24px 13px 0px 13px" }}>
          <Tabs
            tabData={tabData}
            tabNumber={tabNumber}
            setTabNumber={setTabNumber}
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
          onClose={() => setApiError("")}
        />
      )}
    </>
  );
};

const ProfileCardWrapper = styled(Box, {
  height: "14rem",
  borderBottomLeftRadius: "2rem",
  borderBottomRightRadius: "2rem",
  background: "$secondary",
});
export const ProfileImageWrapper = styled(Box, {
  width: "6.5rem",
  height: "6.5rem",
  padding: "15px",
  borderRadius: "100%",
  background: "$white1",
  display: "flex",
  justifyContent: "center",
});

export default Profile;
