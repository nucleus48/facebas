import { useAppState } from "@/hooks/use-app-state";
import { getScaledBound } from "@/lib/utils";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useTensorflowModel } from "react-native-fast-tflite";
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useFaceDetector } from "react-native-vision-camera-face-detector";
import { useResizePlugin } from "vision-camera-resize-plugin";

export default function EnrollmentScreen() {
  const device = useCameraDevice("front");
  const format = useCameraFormat(device, Templates.FrameProcessing);
  const { hasPermission, requestPermission } = useCameraPermission();

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isCameraActive = isFocused && appState === "active";

  const { resize } = useResizePlugin();
  const { detectFaces } = useFaceDetector();

  const { model: livenessDetectionModel } = useTensorflowModel(
    require("@/assets/models/anti-spoof.tflite")
  );

  const { model: faceRecognitionModel } = useTensorflowModel(
    require("@/assets/models/edgeface.tflite")
  );

  const frameProcessor = useFrameProcessor(
    frame => {
      "worklet";
      if (!livenessDetectionModel || !faceRecognitionModel) return;

      const faces = detectFaces(frame);
      if (faces.length < 1) return;

      const [face] = faces;

      const livenessDetectionInput = resize(frame, {
        dataType: "float32",
        pixelFormat: "bgr",
        crop: getScaledBound(frame.width, frame.height, face.bounds, 2.7),
        scale: {
          width: 80,
          height: 80,
        },
      });

      const [livenessResult] = livenessDetectionModel.runSync([
        livenessDetectionInput,
      ]);

      const label = argmax(livenessResult);
      if (label != 2) console.log(livenessResult);
    },
    [livenessDetectionModel, faceRecognitionModel]
  );

  useEffect(() => {
    if (!hasPermission) requestPermission();
  }, [hasPermission, requestPermission]);

  return (
    <>
      {hasPermission && device && (
        <Camera
          isActive={isCameraActive}
          device={device}
          format={format}
          frameProcessor={frameProcessor}
          style={StyleSheet.absoluteFill}
        />
      )}
    </>
  );
}

function argmax(arr: number[]): number {
  "worklet";
  // if (arr.length === 0) throw new Error("Empty array");

  let maxIndex = 0;
  let maxValue = arr[0];

  for (let i = 1; i < 3; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
      maxIndex = i;
    }
  }

  return maxIndex;
}
