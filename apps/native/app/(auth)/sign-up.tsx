import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { Link, Stack } from "expo-router";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function SignUp() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAwareScrollView contentContainerClassName="pt-safe-offset-20 p-5">
        <Text className="t-base font-roboto-700 text-3xl mb-4">Sign Up</Text>
        <Text className="t-base text-gray-600 mb-8">
          Enter your email address and password to create an account
        </Text>
        <TextInput
          className="mb-4"
          placeholder="Email address"
          inputMode="email"
          autoCapitalize="none"
        />
        <TextInput className="mb-8" placeholder="Password" secureTextEntry />
        <Button title="Create account" className="mb-8" />
        <Text className="t-base text-center mb-2">
          Don&apos;t have an account?
        </Text>
        <Link
          className="t-base text-center text-blue-600 active:underline"
          href="/sign-in"
          replace
        >
          Sign in
        </Link>
      </KeyboardAwareScrollView>
    </>
  );
}
