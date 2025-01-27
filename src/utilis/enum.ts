export enum SocketEvents {
  CONNECT = "CONNECT",
  DISCONNECT = "DISCONNECT",
  REGISTER_CHAT_ID = "REGISTER_CHAT_ID",
  SEARCH_GAME = "SEARCH_GAME",
  PLAYER_MOVE = "PLAYER_MOVE",
  GAME_OVER = "GAME_OVER",
  GAME_START = "GAME_START",
  ERROR = "ERROR",
  OPPONENT_MOVE = "OPPONENT_MOVE",
  ROUND_RESULT = "ROUND_RESULT",
  ROUND_START = "ROUND_START",
  READY_FOR_GAME = "READY_FOR_GAME",
  ON_SCREEN = "ON_SCREEN",
  PLAYER_DISCONNECTED = "PLAYER_DISCONNECTED",
  PLAYER_TIMEOUT = "PLAYER_TIMEOUT",
  OPPONENT_RECONNECTED = "OPPONENT_RECONNECTED",
  GAME_RESUMED = "GAME_RESUMED",
  CANCEL_SEARCH_GAME = "CANCEL_SEARCH_GAME",
}

export enum UserMove {
  PAPER = "PAPER",
  SCISSOR = "SCISSOR",
  ROCK = "ROCK",
  RANDOM = "RANDOM",
}
export enum AlertEnum {
  SUCCESS = "success",
  ERROR = "error",
}
export enum USER_SCREENS_ROUTES {
  DASHBOARD = "DASHBOARD",
  SEARCH = "SEARCH",
  ONE_VS_ONE = "ONE_VS_ONE",
}
export enum COLLECTABLE_TYPE {
  BACKGROUND = "BACKGROUND",
  HAND_GESTURE = "HAND_GESTURE",
}

export enum RECORD_NOT_FOUND {
  ITEM_NOT_FOUND = "No Items Found",
}

export enum MARKETPLACE_CONTENT {
  HAND_GESTURE = "Choose your perfect hand gesture—more unique ones on the way!Unlock cool features and stand out with every gesture.",
  BACKGROUND = "Each background adds its own vibe, making every game session more exciting—new ones dropping soon!Choose your favorite and level up your gaming experience.",
}
export enum TAB_NUMBER {
  TAB_ZERO = 0,
  TAB_ONE = 1,
}
