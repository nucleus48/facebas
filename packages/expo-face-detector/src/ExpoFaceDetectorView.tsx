import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoFaceDetectorViewProps } from './ExpoFaceDetector.types';

const NativeView: React.ComponentType<ExpoFaceDetectorViewProps> =
  requireNativeView('ExpoFaceDetector');

export default function ExpoFaceDetectorView(props: ExpoFaceDetectorViewProps) {
  return <NativeView {...props} />;
}
