import UserStore from "@/stores/user-store";
import { Stack } from "expo-router";
import { Provider as TinyBaseProvider } from "tinybase/ui-react";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function IndexLayout() {
  return (
    <TinyBaseProvider>
      <UserStore />
      <Stack>
        <Stack.Screen
          name="enrollment"
          options={{
            title: "Face Enrollment",
            headerTransparent: true,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="attendance/[attendanceId]/index"
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="attendance/[attendanceId]/verification"
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="attendance/[attendanceId]/registration"
          options={{ title: "Registration" }}
        />
      </Stack>
    </TinyBaseProvider>
  );
}
