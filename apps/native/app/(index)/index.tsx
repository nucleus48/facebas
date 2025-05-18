import JoinAttendanceBottomSheet from "@/components/modal/join-attendance-bottom-sheet";
import AttendanceCard from "@/components/ui/attendance-card";
import FAB from "@/components/ui/fab";
import BottomSheet from "@gorhom/bottom-sheet";
import { Stack, useRouter } from "expo-router";
import { UserIcon } from "lucide-react-native";
import { useRef } from "react";
import { Pressable } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null);

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
            onPress: () => bottomSheetRef.current?.expand(),
          },
        ]}
      />
      <JoinAttendanceBottomSheet ref={bottomSheetRef} />
    </>
  );
}
