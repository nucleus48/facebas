import { firebaseAuth } from "@/lib/firebase";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { type User } from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";

export interface AuthContextValue {
  user: User;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

AuthContext.displayName = "AuthContext";

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/sign-in");
    }

    SplashScreen.hide();
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !user) {
    return null;
  }

  return <AuthContext value={{ user }}>{children}</AuthContext>;
}

export const useAuth = () => {
  const auth = use(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};
