import { useNavigation } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { createContext, use, useEffect } from "react";
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
  onPress?: () => void;
}

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

const FABContext = createContext<SharedValue<boolean> | null>(null);

export default function FAB({ children }: React.PropsWithChildren) {
  const isExpanded = useSharedValue(false);
  const navigation = useNavigation();

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const rotateValue = isExpanded.value ? "45deg" : "0deg";

    return {
      transform: [{ rotate: withTiming(rotateValue) }],
    };
  });

  useEffect(() => {
    return navigation.addListener("blur", () => {
      isExpanded.value = false;
    });
  }, [navigation, isExpanded]);

  return (
    <FABContext value={isExpanded}>
      <View className="absolute bottom-16 right-5">
        <AnimatedPressable
          onPress={handlePress}
          style={plusIconStyle}
          className="p-4 bg-blue-600 rounded-full"
        >
          <PlusIcon color={"#FFFFFF"} />
        </AnimatedPressable>
        {children}
      </View>
    </FABContext>
  );
}

function FABAction({ title, btnText, index, onPress }: FABActionProps) {
  const isExpanded = use(FABContext)!;

  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
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

FAB.Action = FABAction;
