import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { Stack } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function AttendanceCreateScreen() {
  const renderHeaderRight = () => (
    <Pressable>
      <Text className="t-base">Done</Text>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{ title: "Create", headerRight: renderHeaderRight }}
      />
      <KeyboardAwareScrollView contentContainerClassName="p-5">
        <Text className="t-base mb-2">Name</Text>
        <TextInput className="mb-4" placeholder="Enter attendance room name" />
        <Text className="t-base mb-2">Description</Text>
        <TextInput
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          className="h-[100px] mb-8"
          placeholder="Write a description..."
        />

        <View className="gap-4 mb-8">
          <Text className="t-base">Fields</Text>
          <View className="flex-row gap-4">
            <TextInput className="flex-1" placeholder="Enter a field title" />
            <Button title="Remove" className="h-auto" textClassName="text-sm" />
          </View>
          <View className="flex-row gap-4">
            <TextInput className="flex-1" placeholder="Enter a field title" />
            <Button title="Remove" className="h-auto" textClassName="text-sm" />
          </View>
          <View className="flex-row gap-4">
            <TextInput className="flex-1" placeholder="Enter a field title" />
            <Button title="Remove" className="h-auto" textClassName="text-sm" />
          </View>
          <View className="flex-row gap-4">
            <TextInput className="flex-1" placeholder="Enter a field title" />
            <Button title="Remove" className="h-auto" textClassName="text-sm" />
          </View>
        </View>

        <Button title="+ Add field" />
      </KeyboardAwareScrollView>
    </>
  );
}
