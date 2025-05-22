import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import {
  FieldsSchemaData,
  RegistrationFormSchema,
  RegistrationFormSchemaData,
} from "@/lib/schema";
import { useAuth } from "@/providers/auth-provider";
import {
  useAttendanceStore,
  useAttendanceValue,
} from "@/stores/attendance-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function RegistrationScreen() {
  const { user } = useAuth();
  const { attendanceId } = useLocalSearchParams<{ attendanceId: string }>();
  const attendanceStore = useAttendanceStore(attendanceId);
  const router = useRouter();

  const fieldsJson = useAttendanceValue("fieldsJson", attendanceStore);
  const fields = JSON.parse(fieldsJson) as FieldsSchemaData;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegistrationFormSchemaData>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {},
  });

  const onSubmit = (data: RegistrationFormSchemaData) => {
    attendanceStore?.setRow("user", user.uid, {
      userId: user.uid,
      dataJson: JSON.stringify(data),
    });

    router.dismissTo({
      pathname: "/attendance/[attendanceId]",
      params: { attendanceId },
    });
  };

  return (
    <KeyboardAwareScrollView contentContainerClassName="p-5 gap-8">
      {fields.map((field) => (
        <Controller
          key={field.name}
          control={control}
          name={field.name}
          render={({
            field: { value, onChange, onBlur, disabled },
            fieldState: { invalid, error },
          }) => (
            <FormControl isInvalid={invalid} isDisabled={disabled}>
              <FormControlLabel>
                <FormControlLabelText>{field.name}</FormControlLabelText>
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
                />
              </Input>
              <FormControlError>
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />
      ))}

      <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
        <ButtonText>Register</ButtonText>
      </Button>
    </KeyboardAwareScrollView>
  );
}
