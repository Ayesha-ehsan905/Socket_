import { UserMove } from "../../utilis/enum";
import { Player } from "../../utilis/type";

export type WinnerRoundRecordType = {
  isDraw: boolean;
  player1: Player;
  player2: Player;
  winnerChatId: string;
  looserChatId: string;
};
export type RoundRecord = {
  roundTimeLimit: number;
  totalRounds: number;
  roundNo: number;
};
export type GameSectionProps = {
  userMoveImage: string | null;
  userSelectedMove: string | null;
  handleUserMove: (move: UserMove) => void;
  isWinnerRoundRecordExist: boolean;
  isRoundStarted: boolean;
};
export type GameOverDTO = {
  winner: number;
  winnerRoundWon: number;
  totalRounds: number;
  totalDraw: number;
  isMatchDraw: boolean;
};
export type WinOverLayProps = {
  gameOverRecord: GameOverDTO | null;
  userChatId?: number | string; //current user chat id
};
export type UserDisconnectedProps = {
  userChatId: string;
};
