import AttendanceCard from "@/components/ui/attendance-card";
import FAB from "@/components/ui/fab";
import { Stack, useRouter } from "expo-router";
import { UserIcon } from "lucide-react-native";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const renderHeaderRight = () => (
    <Pressable>
      <UserIcon size={20} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{ title: "Attendance", headerRight: renderHeaderRight }}
      />
      <AttendanceCard />
      <FAB
        actions={[
          {
            title: "Create",
            btnText: "C",
            onPress: () => router.push("/attendance/create"),
          },
          {
            title: "Join",
            btnText: "J",
            onPress: () => router.push("/attendance/join"),
          },
        ]}
      />
    </>
  );
}
