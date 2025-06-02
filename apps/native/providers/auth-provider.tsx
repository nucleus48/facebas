import { firebaseAuth } from "@/lib/firebase";
import * as SplashScreen from "expo-splash-screen";
import { type User } from "firebase/auth";
import { createContext, use, useEffect, useState } from "react";

export type AuthLoading = {
  user: null;
  isAuthenticated: false;
  isLoading: true;
};

export type Authenticated = {
  user: User;
  isAuthenticated: true;
  isLoading: false;
};

export type UnAuthenticated = {
  user: null;
  isAuthenticated: false;
  isLoading: false;
};

export type AuthContextValue = AuthLoading | Authenticated | UnAuthenticated;

const initialValue: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthContext = createContext<AuthContextValue>(initialValue);

export default function AuthProvider({
  children,
}: {
  children: (props: AuthContextValue) => React.ReactNode;
}) {
  const [value, setValue] = useState<AuthContextValue>(initialValue);

  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setValue({ user, isAuthenticated: true, isLoading: false });
      } else {
        setValue({ user, isAuthenticated: false, isLoading: false });
      }

      SplashScreen.hide();
    });
  }, []);

  if (value.isLoading) return null;

  return <AuthContext value={value}>{children?.(value)}</AuthContext>;
}

export const useAuth = () => {
  const auth = use(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  if (!auth.isAuthenticated) {
    throw new Error(
      "Unauthenticated routes should not access the auth context"
    );
  }

  return auth;
};
