import { ReactNode } from "react";
import { Player } from "../../utilis/type";

export type useAvatarProps = {
  label: string | ReactNode;
  image?: string;
};
export type GameStartType = {
  room: string;
  player1: Player;
  player2: Player;
};
