"use client";
import React, { createContext, useState, useEffect } from "react";
import { UserType } from "../types/UserType";
import { Spinner } from "@/components/ui/spinner";

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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await fetch("/api/auth/getuser");
        if (!res.ok) return null;
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />

            <Spinner className="relative size-10 animate-spin text-primary" />
          </div>

          <p className="mt-6 animate-pulse text-sm font-medium tracking-wide text-zinc-400">
            Carregando sessão...
          </p>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}
