import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
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
import { AuthSchema, AuthSchemaData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { AlertCircleIcon, InfoIcon } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";

export default function SignInScreen() {
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<AuthSchemaData>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: AuthSchemaData) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.dismissTo("/");
    } catch (error) {
      let errorMessage = "";

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case AuthErrorCodes.NETWORK_REQUEST_FAILED:
            errorMessage = "Network error. Please try again.";
            break;
          case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
            errorMessage = "Invalid email or password.";
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
            Sign In
          </Heading>
          <Text>
            Welcome back! Please enter your email address and password to sign
            in
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
          <ButtonText>Continue</ButtonText>
        </Button>

        <View className="gap-4">
          <Text className="text-center">Don&apos;t have an account?</Text>
          <Link href="/sign-up" replace>
            <Text className="text-center text-info-700" underline>
              Sign up
            </Text>
          </Link>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
}
