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
    userMoveImage: moveImages[userMove] || "/images/Scissor.png", // Fallback image
    opponentMoveImage: moveImages[opponentMove] || "/images/fist.png", // Fallback image
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
