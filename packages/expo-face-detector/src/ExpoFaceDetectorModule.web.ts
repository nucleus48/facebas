import { registerWebModule, NativeModule } from 'expo';

import { ExpoFaceDetectorModuleEvents } from './ExpoFaceDetector.types';

class ExpoFaceDetectorModule extends NativeModule<ExpoFaceDetectorModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoFaceDetectorModule, 'ExpoFaceDetectorModule');
