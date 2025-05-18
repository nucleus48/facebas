import BottomSheet, {
  BottomSheetView,
  useBottomSheet,
  useBottomSheetInternal,
} from "@gorhom/bottom-sheet";
import { Text } from "react-native";
import Button from "../ui/button";
import TextInput from "../ui/text-input";

export default function JoinAttendanceBottomSheet(
  props: Omit<React.ComponentProps<typeof BottomSheet>, "children">
) {
  return (
    <BottomSheet
      {...props}
      index={-1}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
    >
      <JoinAttendanceBottomSheetInternal />
    </BottomSheet>
  );
}

function JoinAttendanceBottomSheetInternal() {
  const { close } = useBottomSheet();
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  const handleOnFocus = () => {
    shouldHandleKeyboardEvents.value = true;
  };

  const handleOnBlur = () => {
    shouldHandleKeyboardEvents.value = false;
  };

  return (
    <BottomSheetView className="p-5">
      <Text className="t-base font-roboto-700 text-3xl text-center mb-2">
        Join Attendance
      </Text>
      <Text className="t-base text-center text-slate-600 mb-8">
        Enter the attendance code to join
      </Text>
      <TextInput
        className="mb-8"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <Button title="Join" className="mb-4" />
      <Button title="Cancel" onPress={() => close()} />
    </BottomSheetView>
  );
}
