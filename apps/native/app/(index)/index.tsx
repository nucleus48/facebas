import AttendanceCard from "@/components/ui/attendance-card";
import FAB from "@/components/ui/fab";
import { Icon } from "@/components/ui/icon";
import { firebaseAuth } from "@/lib/firebase";
import { useAuth } from "@/providers/auth-provider";
import { useUserRowIds } from "@/stores/user-store";
import { Stack, useRouter } from "expo-router";
import { LogOutIcon } from "lucide-react-native";
import { Pressable, ScrollView } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const attendanceRowIds = useUserRowIds("attendance", user.uid);

  const handleSignOut = async () => {
    firebaseAuth.signOut();
  };

  const renderHeaderRight = () => (
    <Pressable onPress={handleSignOut}>
      <Icon as={LogOutIcon} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{ title: "Attendance", headerRight: renderHeaderRight }}
      />
      <ScrollView>
        {attendanceRowIds.map((attendanceId) => (
          <AttendanceCard key={attendanceId} attendanceId={attendanceId} />
        ))}
      </ScrollView>

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
