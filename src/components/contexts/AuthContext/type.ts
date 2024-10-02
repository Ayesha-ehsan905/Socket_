export type UserDTO = {
  token: string | null;
  user: {
    id: number | null;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    chatId: string | null;
  } | null;
  wallet: {
    id: number | null;
    address: string | null;
    chainType: string | null;
    created_at: string | null;
    updated_at: string | null;
  } | null;
};

export type AuthContextProps = {
  userData: UserDTO;
  updateUserData: (data: UserDTO) => void;
  setUserData: (data: UserDTO) => void;
};
