import { createContext, useState } from "react";
import { AuthContextProps, UserDTO } from "./type";
export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserDTO>({
    token: null,
    user: {
      id: null,
      username: null,
      first_name: null,
      last_name: null,
      chatId: null,
    },
  });
  const updateUserData = (data: UserDTO) => {
    setUserData({
      ...userData,
      user: {
        id: data.user?.id ?? null,
        username: data.user?.username ?? null,
        first_name: data.user?.first_name ?? null,
        last_name: data.user?.last_name ?? null,
        chatId: data.user?.chatId ?? null,
      },
    });
  };
  return (
    <AuthContext.Provider value={{ userData, updateUserData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
