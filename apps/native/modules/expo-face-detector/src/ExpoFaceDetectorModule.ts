import { NativeModule, requireNativeModule } from "expo";

type ExpoFaceDetectorModuleEvents = {
  onFacesDetected: (event: { resultBundle: {} }) => void;
  onError: (event: { error: string; errorCode: number }) => void;
};

declare class ExpoFaceDetectorModule extends NativeModule<ExpoFaceDetectorModuleEvents> {}

export default requireNativeModule<ExpoFaceDetectorModule>("ExpoFaceDetector");
