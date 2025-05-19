import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function AuthLayout() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
