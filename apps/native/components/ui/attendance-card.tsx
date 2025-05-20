import { useAttendanceValue } from "@/stores/attendance-store";
import { useRouter } from "expo-router";
import { TablePropertiesIcon, UserIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export interface AttendanceCardProps {
  attendanceId: string;
}

export default function AttendanceCard({ attendanceId }: AttendanceCardProps) {
  const router = useRouter();
  const attendanceName = useAttendanceValue("name", attendanceId);

  if (!attendanceName) return null;

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
        <Text className="t-base text-lg font-roboto-500">{attendanceName}</Text>
        <Text className="t-base text-green-600 text-sm">Active</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <UserIcon size={16} color={"#4b5563"} />
        <Text className="t-base mr-2 text-slate-600">200 / 257</Text>
        <TablePropertiesIcon size={16} color={"#4b5563"} />
        <Text className="t-base text-slate-600">7 / 9</Text>
        <Text className="t-base text-sm ml-auto text-slate-600">10:18 pm</Text>
      </View>
    </Pressable>
  );
}
