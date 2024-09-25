import { HomeBlackIcon } from ".";
import { styled } from "../../styles";
import { Box } from "../elements/Box";
import { Flex } from "../Flex/Flex";

const WinOverLay = () => {
  return (
    <WinOverlay>
      <OverLayBackground>
        <Flex direction={"column"} align={"center"} justify={"center"}>
          <Box as="img" src="/images/avatar_1.png" />
          <Flex
            justify={"evenly"}
            css={{
              borderRadius: "24px",
              height: "fit-content",
              background: "$beige",
              margin: "25px 0",
              padding: "8px 6px",
              width: "110px",
            }}
          >
            <Box
              as="img"
              src="/images/Vector.png"
              css={{ width: "25px", height: "25px", alignSelf: "baseline" }}
            />
            <Box>
              <Box as="span">+</Box>
              <Box as="span"> 150</Box>
            </Box>
          </Flex>
          <Box as="span" css={{ fontSize: "24px" }}>
            You Win
          </Box>
          <Box as="span" css={{ fontSize: "64px" }}>
            3 - 1
          </Box>
          <Flex direction={"row"} css={{ gap: "$4", margin: "40px 0" }}>
            <Box
              css={{
                padding: "12px 26px",
                background: "$secondary",
                boxShadow: "0 4px #c19935",
                borderRadius: "16px",
                display: "inline-flex",
                alignSelf: "center",
              }}
            >
              <HomeBlackIcon />
            </Box>
            <Box
              css={{
                padding: "12px 26px",
                background: "$secondary",
                boxShadow: "0 4px #c19935",
                borderRadius: "16px",
                display: "inline-flex",
                alignSelf: "center",
              }}
            >
              <HomeBlackIcon />
            </Box>
          </Flex>
        </Flex>
      </OverLayBackground>
    </WinOverlay>
  );
};
const WinOverlay = styled(Box, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
  pointerEvents: "auto", // Ensure this layer is clickable
});
const OverLayBackground = styled(Box, {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  textAlign: "center",
  boxSizing: "border-box",
  //   height: "50vh",
  borderRadius: "32px 32px 0px  0px",
  background: "white",
  padding: "32px 0",
});

export default WinOverLay;