import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { firebaseAuth } from "@/lib/firebase";
import { AuthSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Constants from "expo-constants";
import { Link } from "expo-router";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { z } from "zod";

export default function SignUpScreen() {
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
    const { user } = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    await sendEmailVerification(user, {
      url: "https://face-bas",
      handleCodeInApp: true,
      iOS: {
        bundleId: Constants.expoConfig?.ios?.bundleIdentifier!,
      },
      android: {
        packageName: Constants.expoConfig?.android?.package!,
        installApp: true,
        minimumVersion: "12",
      },
    });
  };

  return (
    <KeyboardAwareScrollView contentContainerClassName="pt-safe-offset-20 p-5">
      <Text className="t-base font-roboto-700 text-3xl mb-4">Sign Up</Text>
      <Text className="t-base text-slate-600 mb-8">
        Enter your email address and password to create an account
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className="mb-4"
            placeholder="Email address"
            inputMode="email"
            autoCapitalize="none"
            enterKeyHint="next"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className="mb-8"
            placeholder="Password"
            secureTextEntry
          />
        )}
      />

      <Button
        size={"lg"}
        title={isSubmitting ? "Submitting..." : "Create account"}
        className="mb-8"
        disabled={isSubmitting || !isValid}
        onPress={handleSubmit(onSubmit)}
      />

      <Text className="t-base text-center mb-2">Already have an account?</Text>
      <Link
        className="t-base text-center text-blue-600 active:underline"
        href="/sign-in"
        replace
      >
        Sign in
      </Link>
    </KeyboardAwareScrollView>
  );
}
