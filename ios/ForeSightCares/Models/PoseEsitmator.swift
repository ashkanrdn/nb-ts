//
//  metrabs_eff_small.swift
//  fsccameraexpo
//
//  Created by Reza Baharani on 11/10/22.
//

import Foundation
import CoreML
import TensorFlowLite

final class PoseEsitomator{
  
  private var interpreter: Interpreter
  
  /// TensorFlow lite `Tensor` of model input and output.
  private var featureTensorInput: Tensor
  private var imageSizeInput: Tensor
  private var cameraAngleInput: Tensor
  private var poses2DOutput: Tensor
  private var poses3DOutput: Tensor
  
  private var modelFeatureInputHeight: Int
  private var modelFeatureInputWidth: Int
  private var modelFeatureChannelSize: Int
  private var modelFeatureInputBatchSize: Int
  
  
  
  private var poseNetFile = FileInfo(name: "eff2s_head_with_post_process", ext: "tflite")
  
  
  // Initilizer
  init(threadCount: Int, delegate: Delegates) throws {
    guard
      let modelPath = Bundle.main.path(forResource: poseNetFile.name, ofType: poseNetFile.ext)
    else {
      throw FSC_Error.nativeError("Failed to find the TFLite model file.")
    }
    
    // Specify the options for the `Interpreter`.
    var options = Interpreter.Options()
    options.threadCount = threadCount
    
    // Specify the delegates for the `Interpreter`.
    var delegates: [Delegate]?
    switch delegate {
    case .gpu:
      delegates = [MetalDelegate()]
    case .npu:
      if let coreMLDelegate = CoreMLDelegate() {
        delegates = [coreMLDelegate]
      } else {
        delegates = nil
      }
    case .cpu:
      delegates = nil
    }
    
    do {
      // Create the `Interpreter`.
      interpreter = try Interpreter(modelPath: modelPath, options: options, delegates: delegates)
      
      // Initialize input and output `Tensor`s.
      // Allocate memory for the model's input `Tensor`s.
      try interpreter.allocateTensors()
      
      
      featureTensorInput = try interpreter.input(at: 0)
      cameraAngleInput = try interpreter.input(at: 1)
      imageSizeInput = try interpreter.input(at: 2)
      
      // Read input shape from model.
      modelFeatureInputBatchSize = featureTensorInput.shape.dimensions[0]
      modelFeatureInputWidth = featureTensorInput.shape.dimensions[1]
      modelFeatureInputHeight = featureTensorInput.shape.dimensions[2]
      modelFeatureChannelSize = featureTensorInput.shape.dimensions[3]
      
      poses2DOutput = try interpreter.output(at: 0)
      poses3DOutput = try interpreter.output(at: 1)
    } catch let error {
      throw FSC_Error.nativeError("Error happened at creating interpretor due to \(error)")
    }
  }
  
  
  func estimateSinglePose(on feature: MLMultiArray, size imageSize:CGSize, cameraAngle: Float = 50) throws -> (Array<Array<Float>>, Array<Array<Float>>) {
    do {
      
      let imageSize : [Float] = [Float(imageSize.width), Float(imageSize.height)]
      let imageSizeData = imageSize.withUnsafeBufferPointer({ Data(buffer: $0) })
      let cameraAngleData = [cameraAngle].withUnsafeBufferPointer({ Data(buffer: $0) })
      
      let length = feature.count
      let floatPtr =  feature.dataPointer.bindMemory(to: Float.self, capacity: length)
      let floatBuffer = UnsafeBufferPointer(start: floatPtr, count: length)
      let feature_data = Data(buffer: floatBuffer)

      
      try interpreter.copy(feature_data, toInputAt: 0)
      try interpreter.copy(cameraAngleData, toInputAt: 1)
      try interpreter.copy(imageSizeData, toInputAt: 2)
      
      
      try interpreter.invoke()
      
      
      poses2DOutput = try interpreter.output(at: 0)
      poses3DOutput = try interpreter.output(at: 1)
      
      let poses2D_flat = poses2DOutput.data.withUnsafeBytes({
        Array(UnsafeBufferPointer<Float>(start: $0, count: poses2DOutput.data.count/MemoryLayout<Float>.stride))
        }
      )
      let poses2D = poses2D_flat.unflattening(dim: 2)
      
      let poses3D_flat = poses3DOutput.data.withUnsafeBytes({
        Array(UnsafeBufferPointer<Float>(start: $0, count: poses3DOutput.data.count/MemoryLayout<Float>.stride))
        }
      )
      let poses3D = poses3D_flat.unflattening(dim: 3)
      
      return (poses2D, poses3D)
    }
    catch(let error) {
      throw FSC_Error.nativeError("Error happend during interpreter invocation: \(error)")
    }
  }
}
