import { ReactNode } from "react";

export type useAvatarProps = {
  label: string | ReactNode;
  image?: string;
};

export type GameStartDTO = {
  room: string;
  player1: {
    first_name: string;
    last_name: string;
  };
};
export type WinnerRoundRecordDTO = {
  winner: {
    chatId: string;
    inGame: boolean;
    roundsWon: number;
    roundsPlayed: number;
    move?: string; // Store player's move
  };
  isDraw: boolean;
};
