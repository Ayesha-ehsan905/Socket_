import { Box } from "../../../components/elements/Box";
import { Flex } from "../../../components/Flex/Flex";
import {
  PaperIcon,
  RandomIcon,
  ScissorIcon,
  StoneIcon,
} from "../../../components/icons";
import { FixedBgWrapper } from "../../../styles/style";
import { UserMove } from "../../../utilis/enum";
import { getRandomMove } from "../../../utilis/function";
import { GameSectionProps } from "../type";

const GameSection = (props: GameSectionProps) => {
  const {
    userMoveImage,
    userSelectedMove,
    handleUserMove,
    isWinnerRoundRecordExist,
    isRoundStarted,
  } = props;

  const moveIconStyles = {
    pointerEvents: isRoundStarted ? "auto" : "none",
    opacity: isRoundStarted ? 1 : 0.5, // Visual feedback for disabled state
  };

  return (
    <FixedBgWrapper
      css={{
        bottom: "0px",
        // move round result
        background: userMoveImage
          ? `url(${userMoveImage}) no-repeat center top`
          : "",
        height: isWinnerRoundRecordExist ? "min(45vh, 40vh)" : "min(30vh,25vh)",
      }}
    >
      <Flex
        direction="row"
        align="center"
        justify="center"
        css={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      >
        <Box onClick={() => handleUserMove(UserMove.ROCK)} css={moveIconStyles}>
          <StoneIcon customColor={userSelectedMove === UserMove.ROCK} />
        </Box>
        <Flex direction="column" css={{ gap: "2rem" }} align="center">
          <Box
            onClick={() => handleUserMove(UserMove.PAPER)}
            css={moveIconStyles}
          >
            <PaperIcon customColor={userSelectedMove === UserMove.PAPER} />
          </Box>
          <Box
            onClick={() => handleUserMove(getRandomMove())}
            css={moveIconStyles}
          >
            <RandomIcon customColor={userSelectedMove === UserMove.RANDOM} />
          </Box>
        </Flex>
        <Box
          onClick={() => handleUserMove(UserMove.SCISSOR)}
          css={moveIconStyles}
        >
          <ScissorIcon customColor={userSelectedMove === UserMove.SCISSOR} />
        </Box>
      </Flex>
    </FixedBgWrapper>
  );
};

export default GameSection;
