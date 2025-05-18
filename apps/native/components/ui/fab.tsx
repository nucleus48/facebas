import { PlusIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface FABActionProps {
  index: number;
  title: string;
  btnText: string;
  isExpanded: SharedValue<boolean>;
  onPress?: () => void;
}

export interface FABProps {
  actions: Omit<FABActionProps, "index" | "isExpanded">[];
}

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

export default function FAB({ actions }: FABProps) {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const rotateValue = isExpanded.value ? "45deg" : "0deg";

    return {
      transform: [{ rotate: withTiming(rotateValue) }],
    };
  });

  return (
    <View className="absolute bottom-16 right-5">
      <AnimatedPressable
        onPress={handlePress}
        style={plusIconStyle}
        className="p-4 bg-blue-600 rounded-full"
      >
        <PlusIcon color={"#FFFFFF"} />
      </AnimatedPressable>
      {actions.map((action, index) => (
        <FABAction
          key={index}
          index={index}
          isExpanded={isExpanded}
          {...action}
        />
      ))}
    </View>
  );
}

function FABAction({
  title,
  btnText,
  index,
  isExpanded,
  onPress,
}: FABActionProps) {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * (index + 1) : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  return (
    <Animated.View
      className="absolute flex-row items-center gap-4 -z-10 right-0"
      style={animatedStyles}
    >
      <Animated.Text>{title}</Animated.Text>
      <AnimatedPressable
        onPress={onPress}
        className="size-[48px] items-center justify-center rounded-full bg-gray-50"
      >
        <Animated.Text>{btnText}</Animated.Text>
      </AnimatedPressable>
    </Animated.View>
  );
}
