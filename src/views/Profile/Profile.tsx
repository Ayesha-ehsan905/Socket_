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

const Profile = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const tabData = [
    { label: "Profile Details", component: <PersonalDetails /> },
    { label: "Collectibles", component: <Collectibles /> },
    // Add more tabs here as needed
  ];

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [isCopied]);
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
                    0x6944C...DK239F0
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
