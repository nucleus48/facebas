import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import * as SplashScreen from "expo-splash-screen";
import React, { createContext, use, useEffect, useState } from "react";

export type AuthContextValue = { user: FirebaseAuthTypes.User | null };

const initialState: AuthContextValue = {
  user: null,
};

const AuthContext = createContext<AuthContextValue>(initialState);

export default function AuthProvider({
  children,
}: {
  children: (props: { isAuthenticated: boolean }) => React.ReactNode;
}) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticated(user !== null);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isLoading) SplashScreen.hide();
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <AuthContext value={{ user }}>{children({ isAuthenticated })}</AuthContext>
  );
}

export function useAuth() {
  const auth = use(AuthContext);

  if (!auth) {
    throw new Error("useAuth should be called within the AuthContext");
  }

  if (auth.user === null) {
    throw new Error(
      "useAuth should not be called from an unauthenticated route"
    );
  }

  return auth;
}
