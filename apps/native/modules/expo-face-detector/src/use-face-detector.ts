import { useEvent } from "expo";
import { useMemo } from "react";
import { Frame, VisionCameraProxy } from "react-native-vision-camera";
import ExpoFaceDetectorModule from "./ExpoFaceDetectorModule";

export type FaceDetectorPluginOptions = {
  threshold?: number;
  runningMode?: "image" | "stream";
  currentDelegate?: "cpu" | "gpu";
};

export function createFaceDetectorPlugin(
  options: FaceDetectorPluginOptions = {}
) {
  const plugin = VisionCameraProxy.initFrameProcessorPlugin(
    "extractFaces",
    options
  );

  function extractFaces(
    frame: Frame
  ): (typeof options)["runningMode"] extends "image" ? {} : void {
    "worklet";
    if (plugin == null) {
      throw new Error("Failed to load Frame Processor Plugin!");
    }
    return plugin.call(frame) as any;
  }

  return { extractFaces };
}

export function useFaceDetector(options: FaceDetectorPluginOptions) {
  const facesDetectedEvent = useEvent(
    ExpoFaceDetectorModule,
    "onFacesDetected"
  );

  const errorEvent = useEvent(ExpoFaceDetectorModule, "onError");

  const { extractFaces } = useMemo(() => {
    return createFaceDetectorPlugin(options);
  }, [options]);

  if (options.runningMode === "stream") {
    return {
      extractFaces,
      ...facesDetectedEvent,
      ...errorEvent,
    };
  }
  
  return { extractFaces };
}
