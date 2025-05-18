import { cn } from "@/lib/utils";
import { Pressable, Text, type PressableProps } from "react-native";

export interface ButtonProps extends Omit<PressableProps, "children"> {
  title: string;
  textClassName?: string;
}

export default function Button({
  title,
  className,
  textClassName,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn("bg-slate-900 rounded-xl py-3", className)}
      {...props}
    >
      <Text
        className={cn("text-center t-base text-white", textClassName)}
      >
        {title}
      </Text>
    </Pressable>
  );
}
