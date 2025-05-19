import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Text, TextProps, View, ViewProps } from "react-native";

const alertVariants = cva(
  "rounded-xl border border-slate-600 px-4 py-3",
  {
    variants: {
      variant: {
        default: "bg-",
        destructive:
          "border-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = ({
  className,
  variant,
  ...props
}: ViewProps & VariantProps<typeof alertVariants>) => (
  <View className={cn(alertVariants({ variant }), className)} {...props} />
);

const AlertTitle = ({ className, ...props }: TextProps) => (
  <Text
    className={cn(
      "mb-1 text-base font-roboto-500 leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const AlertDescription = ({ className, ...props }: TextProps) => (
  <Text className={cn("text-sm", className)} {...props} />
);

export { Alert, AlertDescription, AlertTitle };

