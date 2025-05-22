import { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useFaceDetector } from "react-native-vision-camera-face-detector";

export default function VerificationScreen() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("front");
  const { detectFaces } = useFaceDetector();

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    const faces = detectFaces(frame);

    if (faces.length > 0) {
      console.log(faces[0]);
    }
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  return (
    <>
      {device && hasPermission && (
        <Camera
          isActive
          device={device}
          style={StyleSheet.absoluteFill}
          frameProcessor={frameProcessor}
        />
      )}
    </>
  );
}
