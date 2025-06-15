import { useEffect } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Svg, { Defs, Ellipse, Mask, Rect } from "react-native-svg";
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useFaceDetector } from "react-native-vision-camera-face-detector";

export default function EnrollmentScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const { width, height } = useWindowDimensions();

  const device = useCameraDevice("front");
  const format = useCameraFormat(device, Templates.FrameProcessing);

  const { detectFaces } = useFaceDetector({
    performanceMode: "fast",
    cameraFacing: "front",
    contourMode: "none",
    landmarkMode: "none",
    classificationMode: "none",
  });

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    const faces = detectFaces(frame);

    console.log("Detected faces:", faces);
  }, []);

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  return (
    <View className="flex-1">
      {hasPermission && device && (
        <Camera
          isActive
          device={device}
          format={format}
          frameProcessor={frameProcessor}
          style={StyleSheet.absoluteFill}
        />
      )}

      <Svg height={height} width={width}>
        <Defs>
          <Mask id="mask" x="0" y="0" width={width} height={height}>
            <Rect x="0" y="0" width={width} height={height} fill="white" />

            <Ellipse
              cx={width / 2}
              cy={height / 2}
              rx={150}
              ry={200}
              fill="black"
            />
          </Mask>
        </Defs>

        <Rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="white"
          mask="url(#mask)"
        />
      </Svg>
    </View>
  );
}
