//
//  libraries.swift
//  ForesightCares
//
//  Created by Reza Baharani on 9/22/22.
//

import Foundation
import UIKit


let _NSObjectArrat__CAPACITY_ = 1

func getAIMode(from args: [Any]!) throws -> ESystem_AI_Mode {
  guard let mode = args[0] as? Int else {
    return ESystem_AI_Mode.Calibration
  }
  
  switch mode{
  case 0:
    return ESystem_AI_Mode.Calibration
  case 1:
    return ESystem_AI_Mode.SkeletonEstimation
  default:
    throw FSC_Error.nativeError("Wrong mode setup.")
  }
  
}

extension FSC_Error: LocalizedError {
  public var errorDescription: String? {
    switch self {
    case .nativeError(let errorMessage):
      guard let added_desctiprion = errorMessage else {
        return "An error happened at native application. No more information is provided!"
      }
      return "An error happened at native application. More information: \(added_desctiprion)"
    case .noPersonDetected:
      return "No person has been detected. Please stand in front of camera."
    case .tooManyPersonDetected:
      return "There are too many persons seen camera."
    case .noError:
      return "No error has occurred until now."
    }
  }
}


extension FSC_Error: CustomNSError {
  var errorCode: Int {
    switch self {
    case .nativeError:
      return 0
    case .tooManyPersonDetected:
      return 1
    case .noPersonDetected:
      return 2
    case .noError:
      return -1
    }
  }
}


struct FSC_Data : FSC_DataProtocol {
  var error: FSC_Error
  var num_people: UInt?
  var poses2D: [[Float]]?
  var poses3D: [[Float]]?
  var bounding_box: [Float]?
  var detection_time_elapsed : Double = 0.0
  var skeleton_time_elapsed : Double = 0.0
  var total_time_elapsed : Double = 0.0
  
  init(error: FSC_Error?){
    guard let final_error = error else {
      self.error = FSC_Error.noError
      return
    }
    self.error = final_error
  }
  
  
  func getJSON(fromImageResultion imageRes: NSArray = [256, 256], cameraAngle: Int = 55) throws -> String? {
    let payload = getMutableArray(fromImageResultion: imageRes, cameraAngle: cameraAngle)[0]
    return try String(data: JSONSerialization.data(withJSONObject: payload), encoding: .utf8)
  }
  
  func getMutableArray(fromImageResultion imageRes: NSArray = [256, 256], cameraAngle: Int = 55, mode: ESystem_AI_Mode = ESystem_AI_Mode.SkeletonEstimation) -> [[String:Any]] {
    
    if (error.errorCode != FSC_Error.noError.errorCode) {
      let payload : [String: Any] = ["poses2D": NSArray(array: [[]]), "poses3D": NSArray(array: [[]]), "bounding_box": NSArray(array: [0, 0, 0, 0]), "img_size": imageRes, "camera_angle":cameraAngle, "errorCode": error.errorCode, "errorDescription": error.errorDescription, "num_people": num_people, "detection_time_elapsed": detection_time_elapsed, "skeleton_time_elapsed": skeleton_time_elapsed, "total_time_elapsed": total_time_elapsed]
      return [payload]
    }
    
    guard let bbox = bounding_box else {
      let tmp_error = FSC_Error.nativeError("Bounding box was empty.")
      let payload : [String: Any] = ["poses2D": NSArray(array: [[]]), "poses3D": NSArray(array: [[]]), "bounding_box": NSArray(array: [0, 0, 0, 0]), "img_size": imageRes, "camera_angle":cameraAngle, "errorCode": tmp_error.errorCode, "errorDescription": tmp_error.errorDescription, "num_people": num_people, "detection_time_elapsed": detection_time_elapsed, "skeleton_time_elapsed": skeleton_time_elapsed, "total_time_elapsed": total_time_elapsed]
      return [payload]
    }
    
    if (mode == ESystem_AI_Mode.Calibration) {
      let payload : [String: Any] = ["poses2D": NSArray(array: [[]]), "poses3D": NSArray(array: [[]]), "bounding_box": bbox, "img_size": imageRes, "camera_angle":cameraAngle, "errorCode": error.errorCode, "errorDescription": error.errorDescription, "num_people": num_people, "detection_time_elapsed": detection_time_elapsed, "skeleton_time_elapsed": skeleton_time_elapsed, "total_time_elapsed": total_time_elapsed]
      return [payload]
    }
    
    guard let final_poses2D = poses2D else {
      let tmp_error = FSC_Error.nativeError("Poses2D was empty.")
      let payload : [String: Any] = ["poses2D": NSArray(array: [[]]), "poses3D": NSArray(array: [[]]), "bounding_box": bbox, "img_size": imageRes, "camera_angle":cameraAngle, "errorCode": tmp_error.errorCode, "errorDescription": tmp_error.errorDescription, "num_people": num_people, "detection_time_elapsed": detection_time_elapsed, "skeleton_time_elapsed": skeleton_time_elapsed, "total_time_elapsed": total_time_elapsed]
      return [payload]
    }
    guard let final_poses3D = poses3D else {
      let tmp_error = FSC_Error.nativeError("Poses3D was empty.")
      let payload : [String: Any] = ["poses2D": NSArray(array: [[]]), "poses3D": NSArray(array: [[]]), "bounding_box": bbox, "img_size": imageRes, "camera_angle":cameraAngle, "errorCode": tmp_error.errorCode, "errorDescription": tmp_error.errorDescription, "num_people": num_people, "detection_time_elapsed": detection_time_elapsed, "skeleton_time_elapsed": skeleton_time_elapsed, "total_time_elapsed": total_time_elapsed]
      return [payload]
    }
    let payload : [String: Any] = ["poses2D": final_poses2D, "poses3D": final_poses3D, "img_size": imageRes, "bounding_box": bbox, "camera_angle":cameraAngle, "errorCode": error.errorCode, "errorDescription": error.errorDescription, "num_people": num_people, "detection_time_elapsed": detection_time_elapsed, "skeleton_time_elapsed": skeleton_time_elapsed, "total_time_elapsed": total_time_elapsed]
    return [payload]
  }
  
}
/*  let data = do {
    guard let final_feature = embedded_feature else {
      final_feature = NSArray(array: [])
      self.error = FSC_Error.
    }
    let str = ["embedded_features": final_feature, "img_size": [256,256], "camera_angle":55]
  } catch {
    
  }
} */
