import AuthProvider from "@/providers/auth-provider";
import { Stack } from "expo-router";

export default function IndexLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
