"use client";
import React, { createContext, useState, useEffect } from "react";
import { UserType } from "../types/UserType";

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    fetch("/api/auth/getuser")
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
