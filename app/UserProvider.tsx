"use client";

import React, { createContext, FC, useEffect } from "react";
import { getUser, User } from "./api/auth";
import { useQuery } from "@tanstack/react-query";
import { TokenManager } from "./api/tokenmanager";
import { useRouter } from "next/navigation";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useUser = () => {
  const userContext = React.useContext(UserContext);
  if (!userContext) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return userContext;
};

export const useRedirectIfAuthenticated = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dash");
    }
  }, [user]);
};

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  useEffect(() => {
    TokenManager.init();
    userQuery.refetch();
  }, []);

  useEffect(() => {
    console.log(userQuery);
    if (userQuery.isSuccess && userQuery.data) {
      setUser(userQuery.data);
    } else {
      setUser(null);
    }
  }, [userQuery.isSuccess, userQuery.data]);

  console.log(user);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
