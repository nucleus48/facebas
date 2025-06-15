import * as React from 'react';

import { ExpoFaceDetectorViewProps } from './ExpoFaceDetector.types';

export default function ExpoFaceDetectorView(props: ExpoFaceDetectorViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
