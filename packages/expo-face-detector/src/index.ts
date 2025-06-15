// Reexport the native module. On web, it will be resolved to ExpoFaceDetectorModule.web.ts
// and on native platforms to ExpoFaceDetectorModule.ts
export { default } from './ExpoFaceDetectorModule';
export { default as ExpoFaceDetectorView } from './ExpoFaceDetectorView';
export * from  './ExpoFaceDetector.types';
