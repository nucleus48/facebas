package expo.modules.facedetector

import com.google.mediapipe.tasks.vision.core.RunningMode
import com.mrousavy.camera.frameprocessors.Frame
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin

class FaceDetectorPlugin(val faceDetectorHelper: FaceDetectorHelper): FrameProcessorPlugin() {
  override fun callback(frame: Frame, arguments: Map<String, Any>?): Any? {
    return when (faceDetectorHelper.runningMode) {
      RunningMode.LIVE_STREAM -> faceDetectorHelper.detectLivestreamFrame(frame.imageProxy)
      else -> faceDetectorHelper.detectImage(frame.imageProxy.toBitmap())
    }
  }
}
