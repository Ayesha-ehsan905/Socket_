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

const Profile = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const [userDetails, setUserDetails] = useState<UserDTO>();
  const [userCollectibles, setUserCollectibles] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const { userData } = useAuth();

  const tabData = [
    {
      label: "Profile Details",
      component: (
        <PersonalDetails
          first_name={userDetails?.user?.first_name ?? ""}
          last_name={userDetails?.user?.last_name ?? ""}
        />
      ),
    },
    {
      label: "Collectibles",
      component: <Collectibles collectibles={userCollectibles as object} />,
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

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userData.token}` },
        };

        // Fetch both profile and collectibles in parallel
        const [profileResponse, collectiblesResponse] = await Promise.all([
          axios.get(endpoint.userProfile, config),
          axios.get(endpoint.userCollectables, config),
        ]);

        // Set state after both requests are successful
        setUserDetails({
          ...profileResponse.data.data,
          wallet: profileResponse.data.wallet,
        });
        setUserCollectibles(collectiblesResponse.data.data);
      } catch (error) {
        console.error("Error fetching profile or collectibles data:", error);
      }
    };

    fetchProfileData();
  }, [userData.token]);

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
                    {userDetails?.user?.wallet
                      ? userDetails?.user?.wallet
                      : "0x6944C...DK239F0"}
                  </Box>
                  <Box
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText("0x6944C...DK239F0");
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
