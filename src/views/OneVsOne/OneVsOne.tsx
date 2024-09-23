import { useEffect, useState } from "react";
import { Box } from "../../components/elements/Box";
import { Flex } from "../../components/Flex/Flex";
import { AvatarImg, FixedBgWrapper, VerticalLine } from "../../styles/style";
import { BackgroundCard } from "../MatchingOpponent/MatchingOpponent";
import {
  PaperIcon,
  RandomIcon,
  ScissorIcon,
  StoneIcon,
} from "../../components/icons";
import { styled } from "../../styles";
import { UserMove } from "../../utilis/enum";
import WinOverLay from "./component/WinOverLay";

const OneVsOne = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [userSelectedMove, setUserSelectedMove] = useState<null | string>(null);
  const [isWin, setIsWin] = useState(false); // New state for win condition

  useEffect(() => {
    if (timeLeft < 30) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const heightPercentage = (timeLeft / 30) * 100; // Full height is 100%
  const handleUserMove = (userMove: string) => {
    setUserSelectedMove(userMove);
    if (userMove === UserMove.STONE) {
      setIsWin(true); // Set win condition
    }
  };
  return (
    <Box
      css={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        pointerEvents: isWin ? "none" : "auto",
      }}
    >
      <BackgroundCard
        css={{ background: "url('/images/1v1 Round Start.png')" }}
      >
        <GameSection>
          <Flex
            direction={"column"}
            align={"center"}
            justify={"center"}
            css={{ height: "95vh" }}
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
                  <TimerBar css={{ height: `${heightPercentage}%` }} />
                </VerticalLine>
                <Box as="span" css={{ marginTop: "16px", width: "20px" }}>
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

                <ProgressBar
                  heightPercentage={heightPercentage}
                  position={"top"}
                />
                <Box
                  as="span"
                  css={{ borderTop: "2px solid black", width: "20px" }}
                />
                <ProgressBar
                  heightPercentage={heightPercentage}
                  position={"bottom"}
                />

                <AvatarImg src="/images/avatar.png" />
              </Flex>
            </Flex>
          </Flex>
        </GameSection>
      </BackgroundCard>

      {/* Game Section */}
      <FixedBgWrapper
        css={{
          bottom: "0px",
          background: "url('/images/Scissor.png') no-repeat center top",
          height: "300px",
        }}
      >
        <Box />

        <Flex
          direction={"row"}
          align={"center"}
          justify={"center"}
          css={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
          <StoneIcon
            customColor={userSelectedMove === UserMove.STONE}
            onClick={() => handleUserMove(UserMove.STONE)}
          />
          <Flex direction={"column"} css={{ gap: "2rem" }} align={"center"}>
            <PaperIcon
              customColor={userSelectedMove === UserMove.PAPER}
              onClick={() => handleUserMove(UserMove.PAPER)}
            />
            <RandomIcon
              customColor={userSelectedMove === UserMove.RANDOM}
              onClick={() => handleUserMove(UserMove.RANDOM)}
            />
          </Flex>
          <ScissorIcon
            customColor={userSelectedMove === UserMove.SCISSOR}
            onClick={() => handleUserMove(UserMove.SCISSOR)}
          />
        </Flex>
      </FixedBgWrapper>
      {isWin && <WinOverLay />}
    </Box>
  );
};
// opponent and your win bar
const ProgressBar = ({
  heightPercentage,
  position,
}: {
  heightPercentage: number;
  position: string;
}) => {
  return (
    <Box
      css={{
        height: "17vh",
        position: "relative",
        width: "10px",
        overflow: "hidden",
      }}
    >
      <Box
        css={{
          position: "absolute",
          [position]: 0,
          height: `${heightPercentage}%`,
          background: "$secondary",
          transition: "height 0.5s ease",
          width: "100%",
          transformOrigin: position === "top" ? "top" : "bottom",
        }}
      />
    </Box>
  );
};

export const GameSection = styled(Box, {
  background: "url('/images/Stone.png') no-repeat center top",
  backgroundSize: "contain",
  height: "300px",
});
const TimerBar = styled(Box, {
  position: "absolute",
  bottom: 0,
  backgroundColor: "$secondary",
  borderRadius: "24px",
  transition: "height 0.5s ease",
  width: "100%",
});

export default OneVsOne;
