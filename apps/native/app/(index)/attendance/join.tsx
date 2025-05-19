import { Stack } from "expo-router";
import { CameraView } from "expo-camera";

export default function AttendanceJoinScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <CameraView className="flex-1" facing="back" />
    </>
  );
}
