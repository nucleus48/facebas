import { firebaseAuth } from "@/lib/firebase";
import * as SplashScreen from "expo-splash-screen";
import { type User } from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";

export interface AuthContextValue {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }

      setIsLoading(false);
      SplashScreen.hide();
    });
  }, []);

  return (
    <AuthContext value={{ user: user!, isLoading, isAuthenticated }}>
      {children}
    </AuthContext>
  );
}

export const useAuth = () => {
  const auth = use(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
};
