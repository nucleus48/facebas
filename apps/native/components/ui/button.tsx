import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Pressable, Text, type PressableProps } from "react-native";

export interface ButtonProps
  extends Omit<PressableProps, "children">,
    VariantProps<typeof buttonVariants> {
  title: string;
  textClassName?: string;
}

const buttonVariants = cva(
  "flex-row items-center justify-center gap-2 rounded-xl transition-transform active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-slate-900 shadow",
        destructive: "bg-red-600 shadow-sm",
        outline: "border border-slate-600 bg-transparent shadow-sm",
        ghost: "bg-transparent border-transparent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
      disabled: {
        true: "opacity-50",
        false: "opacity-100",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      disabled: false,
    },
  }
);

const textVariants = cva("font-roboto-500 text-sm leading-[1]", {
  variants: {
    variant: {
      default: "text-white",
      destructive: "text-white",
      outline: "text-slate-900",
      ghost: "text-slate-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export default function Button({
  title,
  className,
  textClassName,
  variant,
  size,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size, disabled, className }))}
      disabled={disabled}
      {...props}
    >
      <Text className={cn(textVariants({ variant, className: textClassName }))}>
        {title}
      </Text>
    </Pressable>
  );
}
