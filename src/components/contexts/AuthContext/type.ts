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
    id: number;
    address: string;
    chainType: string;
    created_at: string;
    updated_at: string;
  } | null;
};

export type AuthContextProps = {
  userData: UserDTO;
  updateUserData: (data: UserDTO) => void;
  setUserData: (data: UserDTO) => void;
};
