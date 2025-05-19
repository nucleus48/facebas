import AttendanceCard from "@/components/ui/attendance-card";
import FAB from "@/components/ui/fab";
import { firebaseAuth } from "@/lib/firebase";
import { Stack, useRouter } from "expo-router";
import { LogOutIcon, UserIcon } from "lucide-react-native";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const handleSignOut = async () => {
    firebaseAuth.signOut();
    router.dismissTo("/sign-in");
  };

  const renderHeaderRight = () => (
    <>
      <Pressable>
        <UserIcon size={20} />
      </Pressable>
      <Pressable onPress={handleSignOut}>
        <LogOutIcon size={20} />
      </Pressable>
    </>
  );

  return (
    <>
      <Stack.Screen
        options={{ title: "Attendance", headerRight: renderHeaderRight }}
      />
      <AttendanceCard />
      <FAB>
        <FAB.Action
          index={1}
          btnText="C"
          title="Create"
          onPress={() => router.push("/attendance/create")}
        />
        <FAB.Action
          index={2}
          btnText="J"
          title="Join"
          onPress={() => router.push("/attendance/join")}
        />
      </FAB>
    </>
  );
}
