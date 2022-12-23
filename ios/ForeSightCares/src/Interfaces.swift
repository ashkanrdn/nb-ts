//
//  Interfaces.swift
//  fsccameraexpo
//
//  Created by Reza Baharani on 11/21/22.
//

import Foundation

struct Detection {
  let box:CGRect
  let confidence:Float
  let label:String?
  let color:UIColor
}

struct MetaData {
  static let classLabels = ["person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat", "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat", "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair", "couch", "potted plant", "bed", "dining table", "toilet", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"]
  
  static let colorSet:[UIColor] = {
    var colorSet:[UIColor] = []
    
    for _ in 0...80 {
      let color = UIColor(red: CGFloat.random(in: 0...1), green: CGFloat.random(in: 0...1), blue: CGFloat.random(in: 0...1), alpha: 1)
      colorSet.append(color)
    }
    
    return colorSet
  }()
}

/// TFLite Delegate used to run the model.
enum Delegates: String, CaseIterable {
  case cpu = "CPU"
  case gpu = "GPU"
  case npu = "NPU"
}

/// Information about a TFLite model file.
struct FileInfo {
  var name: String
  var ext: String
}


enum FSC_Error: Error {
  case noError
  case nativeError(String?)
  case noPersonDetected
  case tooManyPersonDetected
}


enum ESystem_AI_Mode : Int, CaseIterable {
  case Calibration = 0
  case SkeletonEstimation = 1
}

protocol FSC_DataProtocol {
  var error: FSC_Error {get}
  var num_people: UInt? {get}
  var poses2D: [[Float]]? {get}
  var poses3D: [[Float]]? {get}
  var bounding_box: [Float]? {get}
}

