import { Flex } from "../../../components/Flex/Flex";
import {
  PaperIcon,
  RandomIcon,
  ScissorIcon,
  StoneIcon,
} from "../../../components/icons";
import { FixedBgWrapper } from "../../../styles/style";
import { UserMove } from "../../../utilis/enum";
import { GameSectionProps } from "../../../utilis/type";

const GameSection = (props: GameSectionProps) => {
  const {
    userMoveImage,
    userSelectedMove,
    handleUserMove,
    isWinnerRoundRecordExist,
  } = props;
  return (
    <FixedBgWrapper
      css={{
        bottom: "0px",
        background: `url(${userMoveImage}) no-repeat center top`,
        height: isWinnerRoundRecordExist ? "min(45vh, 40vh)" : "min(30vh,25vh)",
      }}
    >
      <Flex
        direction="row"
        align="center"
        justify="center"
        css={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      >
        <StoneIcon
          customColor={userSelectedMove === UserMove.ROCK}
          onClick={() => handleUserMove(UserMove.ROCK)}
        />
        <Flex direction="column" css={{ gap: "2rem" }} align="center">
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
  );
};

export default GameSection;
