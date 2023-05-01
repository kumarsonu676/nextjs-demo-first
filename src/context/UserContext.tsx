import { NextPage } from "next";
import React, { createContext, useEffect, useState } from "react";
import { UserType } from "./UserType";

export interface UserContextValue {
  user: UserType;
  setUser: (user: UserType) => void;
}

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider: NextPage<UserContextProviderProps> = (props) => {
  const [user, setUser] = useState<UserType>({ name: "", age: 0 });

  async function fetchUser() {
    const userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const userDetail = await userResponse.json();
    const newUser: UserType = {
      name: userDetail.name,
      age: userDetail.id,
    };
    setUser(newUser);
  }

  useEffect(() => {
    (async () => {
      fetchUser();
    })();
  }, []);

  const value: UserContextValue = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
