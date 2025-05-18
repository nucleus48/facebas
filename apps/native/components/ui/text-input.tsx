import { cn } from "@/lib/utils";
import { type TextInputProps, TextInput as TextInputRN } from "react-native";

export default function TextInput({ className, ...props }: TextInputProps) {
  return (
    <TextInputRN className={cn("border border-gray-600 rounded-xl px-4 t-base placeholder:font-roboto-400", className)} {...props} />
  );
}
