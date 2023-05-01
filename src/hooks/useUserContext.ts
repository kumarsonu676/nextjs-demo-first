import { UserContext, UserContextValue } from "@/context/UserContext";
import { useContext } from "react";

export const useUserContext = (): UserContextValue => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
