package expo.modules.facedetector

import android.content.Context
import androidx.core.os.bundleOf
import com.google.mediapipe.tasks.vision.core.RunningMode
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.mrousavy.camera.frameprocessors.FrameProcessorPluginRegistry
import expo.modules.kotlin.exception.Exceptions

private const val FACES_DETECTED_EVENT = "onFacesDetected"
private const val FACES_ERROR_EVENT = "onError"

class ExpoFaceDetectorModule : Module() {
  private val faceDetectorHelpers = mutableListOf<FaceDetectorHelper>()

  private val context: Context
    get() = appContext.reactContext?.applicationContext ?: throw Exceptions.ReactContextLost()

  private class FaceDetectorListener(val module: Module): FaceDetectorHelper.DetectorListener {
    override fun onResults(resultBundle: FaceDetectorHelper.ResultBundle) {
      module.sendEvent(FACES_DETECTED_EVENT, bundleOf("resultBundle" to resultBundle))
    }

    override fun onError(error: String, errorCode: Int) {
      module.sendEvent(FACES_ERROR_EVENT, bundleOf("error" to error, "errorCode" to errorCode))
    }
  }

  override fun definition() = ModuleDefinition {
    Events(FACES_DETECTED_EVENT, FACES_ERROR_EVENT)

    OnCreate {
      FrameProcessorPluginRegistry.addFrameProcessorPlugin("extractFaces") { _, options ->
        var threshold = FaceDetectorHelper.THRESHOLD_DEFAULT

        if (options?.get("threshold") != null) {
          threshold = options["threshold"].toString().toFloat()
        }

        val currentDelegate = when(options?.get("currentDelegate")) {
          "gpu" -> FaceDetectorHelper.DELEGATE_GPU
          else -> FaceDetectorHelper.DELEGATE_CPU
        }

        val runningMode = when(options?.get("runningMode")) {
          "stream" -> RunningMode.LIVE_STREAM
          else -> RunningMode.IMAGE
        }

        val faceDetectorHelper = FaceDetectorHelper(
          threshold = threshold,
          runningMode = runningMode,
          currentDelegate = currentDelegate,
          context = this@ExpoFaceDetectorModule.context,
          faceDetectorListener = FaceDetectorListener(this@ExpoFaceDetectorModule),
        )

        this@ExpoFaceDetectorModule.faceDetectorHelpers.add(faceDetectorHelper)

        FaceDetectorPlugin(faceDetectorHelper)
      }
    }

    OnDestroy {
      this@ExpoFaceDetectorModule.faceDetectorHelpers.forEach {
        it.clearFaceDetector()
      }
    }
  }
}
