import { routes } from "./constant";
import { USER_SCREENS_ROUTES, UserMove } from "./enum";

export const getSelectedImages = (
  userMove: UserMove,
  opponentMove: UserMove
) => {
  const moveImages = {
    [UserMove.ROCK]: "/images/Stone.png",
    [UserMove.PAPER]: "/images/Paper.png",
    [UserMove.SCISSOR]: "/images/Scissor.png",
    [UserMove.RANDOM]: "/images/Random.png",
  };

  // Return the selected images for both user and opponent
  return {
    userMoveImage: moveImages[userMove], // Fallback image
    opponentMoveImage: moveImages[opponentMove], // Fallback image
  };
};
export const getRandomMove = () => {
  const moves = [UserMove.ROCK, UserMove.PAPER, UserMove.SCISSOR];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
};
export const getCurrentPath = (path: string) => {
  if (path === routes.dashboard) return USER_SCREENS_ROUTES.DASHBOARD;
  if (path === routes.matching_screen) return USER_SCREENS_ROUTES.SEARCH;
  if (path === routes.One_one) return USER_SCREENS_ROUTES.ONE_VS_ONE;
};
export const returnTelegramID = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram?.WebApp;
  let chat_Id;
  if (app) {
    app.ready();

    // Check if initDataUnsafe and user exist
    chat_Id = app.initDataUnsafe?.user?.id;
    return chat_Id;
  }
};

export const truncateString = (str: string, start: number, end: number) => {
  return str.length > start + end
    ? str.slice(0, start) + "..." + str.slice(str.length - end)
    : str;
};

export const getFullName = (first_name: string, last_name: string) => {
  return `${first_name ?? "-"} ${last_name ?? ""}`;
};
