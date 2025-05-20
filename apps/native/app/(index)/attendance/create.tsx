import { Button, ButtonIcon, ButtonText } from "@/components/ui/button2";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import {
  AttendanceCreateSchema,
  AttendanceCreateSchemaData,
} from "@/lib/schema";
import { useAuth } from "@/providers/auth-provider";
import { useUserStore } from "@/stores/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Crypto from "expo-crypto";
import { Stack, useRouter } from "expo-router";
import { PlusIcon, Trash2Icon } from "lucide-react-native";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";

export default function AttendanceCreateScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const userStore = useUserStore(user.uid);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AttendanceCreateSchemaData>({
    resolver: zodResolver(AttendanceCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      fields: [{ name: "Name" }, { name: "Matric No." }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "fields" });

  const onSubmit = (data: AttendanceCreateSchemaData) => {
    const attendanceId = Crypto.randomUUID();
    userStore?.setRow("attendance", attendanceId, {
      attendanceId,
      initialContentJson: JSON.stringify([
        { admin: { [attendanceId]: { attendanceId } } },
        data,
      ]),
    });

    router.dismissTo("/");
  };

  const renderHeaderRight = () => (
    <Pressable disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
      <Text>Save</Text>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{ title: "Create", headerRight: renderHeaderRight }}
      />
      <KeyboardAwareScrollView contentContainerClassName="p-5 gap-8">
        <Controller
          control={control}
          name="name"
          render={({
            field: { value, onChange, onBlur, disabled },
            fieldState: { invalid, error },
          }) => (
            <FormControl isInvalid={invalid} isDisabled={disabled}>
              <FormControlLabel>
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <Input
                variant="outline"
                isDisabled={disabled}
                isInvalid={invalid}
              >
                <InputField
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter attendance room name"
                  enterKeyHint="next"
                />
              </Input>
              <FormControlError>
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({
            field: { value, onChange, onBlur, disabled },
            fieldState: { invalid, error },
          }) => (
            <FormControl isInvalid={invalid} isDisabled={disabled}>
              <FormControlLabel>
                <FormControlLabelText>Description</FormControlLabelText>
              </FormControlLabel>
              <Textarea size="md" isDisabled={disabled} isInvalid={invalid}>
                <TextareaInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  textAlignVertical="top"
                  placeholder="Write a description..."
                />
              </Textarea>
              <FormControlError>
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />

        <View className="gap-4">
          <Text bold>Fields</Text>
          {fields.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`fields.${index}.name`}
              render={({
                field: { value, onChange, onBlur, disabled },
                fieldState: { invalid, error },
              }) => (
                <FormControl isInvalid={invalid} isDisabled={disabled}>
                  <View className="flex-row items-center gap-4">
                    <Input
                      className="flex-1"
                      variant="outline"
                      isDisabled={disabled}
                      isInvalid={invalid}
                    >
                      <InputField
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Enter field title"
                        enterKeyHint="next"
                      />
                    </Input>
                    <Pressable onPress={() => remove(index)}>
                      <Icon as={Trash2Icon} className="text-red-600" />
                    </Pressable>
                  </View>
                  <FormControlError>
                    <FormControlErrorText>
                      {error?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
            />
          ))}
          {errors.fields?.message && (
            <Text className="text-error-700">{errors.fields.message}</Text>
          )}
        </View>

        <Button onPress={() => append({ name: "" })}>
          <ButtonIcon as={PlusIcon} />
          <ButtonText>Add Field</ButtonText>
        </Button>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
}
