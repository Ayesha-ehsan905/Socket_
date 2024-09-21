import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import {
  AvatarImg,
  FixedBgWrapper,
  GridWrapper,
  VerticalLine,
} from "../../styles/style";
import { MatchingOponentCard } from "../MatchingOpponent/MatchingOpponent";
import { PaperIcon } from "../../components/icons";

const OneVsOne = () => {
  const [timeLeft, setTimeLeft] = useState(0); // Start at 0 seconds

  useEffect(() => {
    if (timeLeft < 30) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const heightPercentage = (timeLeft / 30) * 100; // Full height is 100%

  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <MatchingOponentCard>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          css={{ height: "75vh" }}
        >
          <Flex
            justify={"between"}
            direction={"row"}
            align={"center"}
            css={{
              width: "100vw",
              padding: "0 24px",
              boxSizing: "border-box",
            }}
          >
            <Flex
              direction={"column"}
              css={{ height: "100%", justifyContent: "center" }}
            >
              <VerticalLine
                css={{
                  height: "50%",
                  position: "relative",
                }}
              >
                <Box
                  css={{
                    position: "absolute",
                    bottom: 0, // Start from the bottom
                    height: `${heightPercentage}%`, // Adjust height
                    background: "red",
                    borderRadius: "24px",
                    transition: "height 0.5s ease",
                    width: "100%",
                  }}
                />
              </VerticalLine>
              <Box as="span" css={{ marginTop: "16px" }}>
                {timeLeft}
              </Box>
            </Flex>
            <Box as="h3" css={{ fontSize: "40px" }}>
              Round One
            </Box>
            <Flex
              direction={"column"}
              align={"center"}
              css={{
                background: "$grey4",
                width: "10px",
                borderRadius: "20px",
              }}
            >
              <AvatarImg src="/images/avatar.png" />
              <Box css={{ height: "35vh" }} />
              <AvatarImg src="/images/avatar.png" />
            </Flex>
          </Flex>
        </Flex>
      </MatchingOponentCard>
      {/* end part */}
      <FixedBgWrapper css={{ bottom: "0px" }}>
        <GridWrapper>
          <Box></Box>
          <Flex justify={"center"} align={"center"}>
            <PaperIcon />
          </Flex>
          <Box></Box>
          <Flex justify={"center"} align={"center"}>
            <PaperIcon />
          </Flex>

          <Box></Box>
          <Flex justify={"center"} align={"center"}>
            <PaperIcon />
          </Flex>

          <Box></Box>
          <Flex justify={"center"} align={"center"}>
            <PaperIcon />
          </Flex>

          <Box></Box>
        </GridWrapper>
      </FixedBgWrapper>
    </Box>
  );
};

export default OneVsOne;
