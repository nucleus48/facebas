import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button2";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { firebaseAuth } from "@/lib/firebase";
import { AuthSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { AlertCircleIcon, InfoIcon } from "lucide-react-native";
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
  } = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: z.infer<typeof AuthSchema>) => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      router.dismissTo("/");
    } catch (error) {
      let errorMessage = "";

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case AuthErrorCodes.EMAIL_EXISTS:
            errorMessage = "Email already exists.";
            break;
          case AuthErrorCodes.INVALID_EMAIL:
            errorMessage = "Invalid email address.";
            break;
          case AuthErrorCodes.WEAK_PASSWORD:
            errorMessage = "Password is too weak.";
            break;
          case AuthErrorCodes.NETWORK_REQUEST_FAILED:
            errorMessage = "Network error. Please try again.";
            break;
          default:
            errorMessage = "An error occurred. Please try again.";
        }
      }

      setError(errorMessage);
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView contentContainerClassName="pt-safe-offset-20 p-5 gap-8">
        <View className="gap-4">
          <Heading bold size="3xl">
            Sign Up
          </Heading>
          <Text>
            Enter your email address and password to create an account
          </Text>
        </View>

        {error && (
          <Alert action="error" variant="solid" className="items-start">
            <AlertIcon as={InfoIcon} className="mt-1" />
            <AlertText className="pr-5">{error}</AlertText>
          </Alert>
        )}

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
                  placeholder="Email address"
                  inputMode="email"
                  autoCapitalize="none"
                  enterKeyHint="next"
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
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
                  placeholder="Password"
                  secureTextEntry
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
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
