import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextProps } from "./type";
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContext provider"
    );
  }
  return context;
};
