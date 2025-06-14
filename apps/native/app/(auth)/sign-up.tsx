import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { firebaseAuth, handleFirebaseError } from "@/lib/firebase";
import { SignUpFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { InfoIcon } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import { z } from "zod";

export default function SignUpScreen() {
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    password,
  }: z.infer<typeof SignUpFormSchema>) => {
    try {
      setError(null);
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await updateProfile(user, { displayName: name });
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = handleFirebaseError(error);
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      <KeyboardAwareScrollView contentContainerClassName="pt-safe-offset-20 p-5 gap-8">
        <View className="gap-4">
          <Heading bold size="3xl">
            Sign Up
          </Heading>
          <Text>Enter your details to create an account</Text>
        </View>

        {error && (
          <Alert action="error" variant="solid" className="items-start">
            <AlertIcon as={InfoIcon} className="mt-1" />
            <AlertText className="pr-5">{error}</AlertText>
          </Alert>
        )}

        <Controller
          control={control}
          name="name"
          render={({
            field: { value, onChange, onBlur, disabled },
            fieldState: { invalid, error },
          }) => (
            <FormControl isInvalid={invalid} isDisabled={disabled}>
              <FormControlLabel>
                <FormControlLabelText>Fullname</FormControlLabelText>
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
                  placeholder="e.g. John Doe"
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
          name="email"
          render={({
            field: { value, onChange, onBlur, disabled },
            fieldState: { invalid, error },
          }) => (
            <FormControl isInvalid={invalid} isDisabled={disabled}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
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
                  placeholder="e.g. johndoe@gmail.com"
                  inputMode="email"
                  autoCapitalize="none"
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
          name="password"
          render={({
            field: { value, onChange, onBlur, disabled },
            fieldState: { invalid, error },
          }) => (
            <FormControl isInvalid={invalid} isDisabled={disabled}>
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
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
                  placeholder="Enter a secure password"
                  secureTextEntry
                />
              </Input>
              <FormControlError>
                <FormControlErrorText>{error?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>
          )}
        />

        <Button
          isDisabled={isSubmitting || !isValid}
          onPress={handleSubmit(onSubmit)}
        >
          {isSubmitting && <ButtonSpinner color="#FFF" />}
          <ButtonText>Create account</ButtonText>
        </Button>

        <View className="gap-4">
          <Text className="text-center">Already have an account?</Text>
          <Link href="/sign-in" replace>
            <Text className="text-center text-info-700" underline>
              Sign in
            </Text>
          </Link>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
}
