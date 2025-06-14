import { firebaseAuth } from "@/lib/firebase";
import * as SplashScreen from "expo-splash-screen";
import { type User } from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";

export type AuthContextValue = { user: User | null };

export const AuthContext = createContext<AuthContextValue>({ user: null });

export default function AuthProvider({
  children,
}: {
  children: (props: { isAuthenticated: boolean }) => React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) SplashScreen.hide();
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <AuthContext value={{ user }}>{children({ isAuthenticated })}</AuthContext>
  );
}

export const useAuth = () => {
  const { user } = use(AuthContext);

  if (user === null) {
    throw new Error("useAuth must be called in an authenticated route");
  }

  return { user };
};
