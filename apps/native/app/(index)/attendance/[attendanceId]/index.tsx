import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth-provider";
import {
  useAttendanceCell,
  useAttendanceHasRow,
  useAttendanceStore,
  useAttendanceValue,
} from "@/stores/attendance-store";
import { useUserStore } from "@/stores/user-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

export default function AttendanceScreen() {
  const { user } = useAuth();
  const { attendanceId } = useLocalSearchParams<{ attendanceId: string }>();
  const router = useRouter();

  const userStore = useUserStore(user.uid);
  const attendanceStore = useAttendanceStore(attendanceId);
  const attendanceName = useAttendanceValue("name", attendanceStore);
  const attendanceDescription = useAttendanceValue(
    "description",
    attendanceStore
  );

  const isAdmin = useAttendanceHasRow("admin", user.uid, attendanceStore);
  const isUser = useAttendanceHasRow("user", user.uid, attendanceStore);

  const userDataJSon = useAttendanceCell(
    "user",
    user.uid,
    "dataJson",
    attendanceId
  );

  const userData = Object.entries<string>(JSON.parse(userDataJSon ?? "{}"));

  const handleDeleteAttendance = () => {
    userStore?.delRow("attendance", attendanceId);
    router.dismissTo("/");
  };

  return (
    <ScrollView contentContainerClassName="p-5 pt-safe-or-40 gap-8">
      <View className="gap-4 pb-8">
        <Avatar size="2xl" className="mx-auto">
          <AvatarFallbackText>{attendanceName}</AvatarFallbackText>
        </Avatar>

        <View className="gap-2 px-10">
          <Heading className="text-center" size="xl">
            {attendanceName}
          </Heading>
          <Text className="text-typography-600 text-center">
            {attendanceDescription}
          </Text>
        </View>

        <View className="max-w-60 mx-auto w-full">
          {isUser ? (
            <Button
              onPress={() =>
                router.push({
                  pathname: "/attendance/[attendanceId]/verification",
                  params: { attendanceId },
                })
              }
            >
              <ButtonText>Mark Attendance</ButtonText>
            </Button>
          ) : (
            <Button
              onPress={() =>
                router.push({
                  pathname: "/attendance/[attendanceId]/registration",
                  params: { attendanceId },
                })
              }
            >
              <ButtonText>Register</ButtonText>
            </Button>
          )}

          {isAdmin ? null : null}
        </View>
      </View>

      <View className="gap-4">
        {userData.map(([title, value], index) => (
          <View key={index} className="gap-2">
            <Text className="text-typography-600">{title}</Text>
            <Text>{value}</Text>
          </View>
        ))}
      </View>

      <Pressable onPress={handleDeleteAttendance}>
        <Text className="text-error-600">Delete Attendance</Text>
      </Pressable>
    </ScrollView>
  );
}
