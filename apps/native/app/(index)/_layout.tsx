import { useAuth } from "@/providers/auth-provider";
import { Redirect, Stack } from "expo-router";

export default function IndexLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack />;
}
