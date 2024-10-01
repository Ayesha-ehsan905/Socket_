export type UserDTO = {
  token: string | null;
  user: {
    id: number | null;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    chatId: string | null;
  } | null;
};

export type AuthContextProps = {
  userData: UserDTO;
  updateUserData: (data: UserDTO) => void;
  setUserData: (data: UserDTO) => void;
};
