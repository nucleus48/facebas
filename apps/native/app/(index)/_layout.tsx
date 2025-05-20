import { useAuth } from "@/providers/auth-provider";
import UserStore from "@/stores/user-store";
import { Redirect, Stack } from "expo-router";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";

export default function IndexLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <TinyBaseProvider>
      <UserStore />
      <Stack />
    </TinyBaseProvider>
  );
}
