import { ReactNode } from "react";

export type useAvatarProps = {
  label: string | ReactNode;
  image?: string;
};

export type GameStartType = {
  room: string;
  player1: Player;
  player2: Player;
};
export type Player = {
  move?: string;
  first_name: string;
  last_name: string;
  chatId: number | string;
};
export type WinnerRoundRecordType = {
  isDraw: boolean;
  player1: Player;
  player2: Player;
  winnerChatId: string;
  looserChatId: string;
};
