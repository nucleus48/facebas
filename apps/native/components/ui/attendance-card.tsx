import {
  useAttendanceRowCount,
  useAttendanceValue,
} from "@/stores/attendance-store";
import { useRouter } from "expo-router";
import { TablePropertiesIcon, UserIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "./text";

export interface AttendanceCardProps {
  attendanceId: string;
}

export default function AttendanceCard({ attendanceId }: AttendanceCardProps) {
  const router = useRouter();
  const attendanceName = useAttendanceValue("name", attendanceId);
  const userCount = useAttendanceRowCount("user", attendanceId);
  const sessionCount = useAttendanceRowCount("session", attendanceId);
  const attendanceCount = useAttendanceRowCount("attendance");
  // const presentCount = useAttendanceResultRowCount("")

  return (
    <Pressable
      className="p-5 gap-2 bg-white"
      onPress={() =>
        router.push({
          pathname: "/attendance/[attendanceId]",
          params: { attendanceId },
        })
      }
    >
      <View className="flex-row justify-between items-center">
        <Text size="lg">{attendanceName}</Text>
        <Text size="sm" className="text-green-600">
          Active
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        <UserIcon size={16} color={"#4b5563"} />
        <Text className="mr-2 text-typography-600">
          {attendanceCount} / {userCount}
        </Text>
        <TablePropertiesIcon size={16} color={"#4b5563"} />
        <Text className="text-typography-600">7 / {sessionCount}</Text>
        <Text size="sm" className="ml-auto text-typography-600">
          10:18 pm
        </Text>
      </View>
    </Pressable>
  );
}
