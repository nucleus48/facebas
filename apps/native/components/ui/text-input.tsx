import { cn } from "@/lib/utils";
import { type TextInputProps, TextInput as TextInputRN } from "react-native";

export default function TextInput({ className, ...props }: TextInputProps) {
  return (
    <TextInputRN
      className={cn(
        "font-roboto-400 h-9 rounded-xl border border-slate-600 bg-transparent px-3 py-1 text-base shadow-sm placeholder:text-slate-600 md:text-sm",
        className
      )}
      {...props}
    />
  );
}
