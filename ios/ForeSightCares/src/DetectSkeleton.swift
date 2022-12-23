//
//  ML_Package.swift
//  ForesightCares
//
//  Created by Reza Baharani on 9/22/22.
//

import Foundation
import Vision
import UIKit
import os.log


struct DetectSkeleton {
  
  private func createError(message: String)-> NSError{
    let error = NSError(domain: "DetectSkeleton", code: 0,userInfo: [NSLocalizedDescriptionKey: message])
    return error
  }
  
  private static var objectDetection:VNCoreMLRequest? = {
    do {
      let model = try yolov5s(configuration: MLModelConfiguration()).model
      let vnCoreMLModel = try VNCoreMLModel(for: model)
      let request = VNCoreMLRequest(model: vnCoreMLModel)
      request.imageCropAndScaleOption = .scaleFill
      return request
    } catch let error {
      print(error)
      return nil
    }
  }()

  
  private static var featureExtractor:VNCoreMLRequest? = {
    do {
      let model = try bbone_eff2s(configuration: MLModelConfiguration()).model
      let vnCoreMLModel = try VNCoreMLModel(for: model)
      let request = VNCoreMLRequest(model: vnCoreMLModel)
      request.imageCropAndScaleOption = .scaleFill
      return request
    } catch let error {
      print(error)
      return nil
    }
  }()

  
  private static var poseEstimator: PoseEsitomator? = {
    do {
      let defaultThreadCount = 4
      let defaultDelegate: Delegates = .cpu
      let model = try PoseEsitomator(threadCount: defaultThreadCount, delegate: defaultDelegate)
      return model
    } catch let error {
      let str_error = "\(error)"
      logMe(message: str_error, catagory: TensorFlowErrorType)
      return nil
    }
  }()
  
  
  private static func find_person(from mlOutputs:[VNDetectedObjectObservation], image_size: CGSize, filter: String = "person") -> [Detection] {
    var detections:[Detection] = []
    for detectResult in mlOutputs {
      // 結果の座標は下が０なので反転させる
      let flippedBox = CGRect(x: detectResult.boundingBox.minX, y: 1 - detectResult.boundingBox.maxY, width: detectResult.boundingBox.width, height: detectResult.boundingBox.height)
      
      // ０〜１で返ってきた座標を画像の座標に非正規化
      let box = VNImageRectForNormalizedRect(flippedBox, Int(image_size.width), Int(image_size.height))
      let confidence = detectResult.confidence
      var label:String = ""
      if let recognizedResult = detectResult as? VNRecognizedObjectObservation, let classLabel = recognizedResult.labels.first?.identifier {
        label = classLabel
      }
      // ランダムな色の配列から、ラベルのインデックスのものを選ぶ。色を指定したい場合はcolorSetをハードコードしてください。
      let labelIndex = Int.random(in: 0...80)
      let detection = Detection(box: box, confidence: confidence, label: label, color: MetaData.colorSet[labelIndex])

      if detection.label == filter{
        detections.append(detection)
      }

    }

    return detections
  }
   
  static func detect(from image:UIImage, basedOn mode : ESystem_AI_Mode) -> FSC_Data {
    let start = Date()
       
    var results = FSC_Data(error: FSC_Error.noError)
    
    guard let objectDetection = objectDetection else {
      results.error = FSC_Error.nativeError("Cannot load object detector.")
      return results
    }
    
    guard let featureExtractor = featureExtractor else {
      results.error = FSC_Error.nativeError("Cannot load the backbone.")
      return results
    }
    
    guard let poseEstimator = poseEstimator else {
      results.error = FSC_Error.nativeError("Cannot load pose estimator.")
      return results
    }
    
    
    guard let ciImage = CIImage(image: image) else {
      results.error = FSC_Error.nativeError("Cannot load backbone of skeleton detector.")
      return results
    }
    
    let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])
      
    do {
      
      try handler.perform([objectDetection]);
      
      guard let detectResults = objectDetection.results as? [VNDetectedObjectObservation] else {
        results.error = FSC_Error.nativeError("Error during object detection inference.")
        return results
      }
      
      var diff = Date().timeIntervalSince(start)
      results.detection_time_elapsed = diff
      
      
      // 結果（複数の検出ボックス）をbox,label,confidenceのDetectionというstructでラップ
      let persons = find_person(from: detectResults, image_size: image.size)
      results.num_people = UInt(persons.count)
      
      if persons.count > 2 {
        results.error = FSC_Error.tooManyPersonDetected
        return results
      }
      
      if persons.isEmpty {
        results.error = FSC_Error.noPersonDetected
        return results
      }
      let start_skeleton = Date()
      
      let box = persons[0].box
      let size = ciImage.extent.size
      let invertedBox = CGRect(x: box.minX, y: size.height - box.maxY, width: box.width, height: box.height)

      results.bounding_box = [Float(box.origin.x), Float(box.origin.y), Float(box.width), Float(box.height)]

      if (mode == ESystem_AI_Mode.Calibration) {
        return results
      }
      
      let person_img = ciImage.cropped(to: invertedBox)
           
      let ciContext = CIContext()
      //guard let safeSelf = self else { return }
      guard let person_cgImage = ciContext.createCGImage(person_img, from: person_img.extent) else {
        results.error = FSC_Error.nativeError("Cannot create CGImage out of the Contex.")
        return results
      } //safeSelf.ciContext.createCGImage(person_img, from: person_img.extent) else {return}
      let person_uiImage = UIImage(cgImage: person_cgImage) //UIImage(cgImage: cgImage)

#if DEBUG
      let imageSaver = ImageSaver()
      imageSaver.writeToPhotoAlbum(image: person_uiImage)
#endif

      //uiImageView.image = UIImage(cgImage: cgImage)
      let new_resized_person =   person_uiImage.scaled(to: CGSize(width: 256, height: 256), scalingMode: .aspectFit) //safeSelf.imageWithImage(sourceImage: person_uiImage, scaledToHight: 256.0/person_uiImage.size.height)//ImageScaler.scaleToFill(UIImage(cgImage: cgImage), in: CGSize(width: 256, height: 256))  //safeSelf.downscaleImage(image: UIImage(cgImage: cgImage), toPixelSize: CGSize(width: 256, height: 256))
      
      guard let new_person_ciImage = CIImage(image: new_resized_person) else {
        results.error = FSC_Error.nativeError("Detected person's crops cannot be converted to CIIMage.")
        return results
      }      //return saveImage(from: new_resized_person)
      //print(new_person_ciImage.)
      let handler = VNImageRequestHandler(ciImage: new_person_ciImage, options: [:])
      
      try handler.perform([featureExtractor])
      
      guard let embedded_features = featureExtractor.results as? [VNCoreMLFeatureValueObservation] else {
        results.error = FSC_Error.nativeError("Error during object skeleton backbone inference.")
        return results
      }
      
      let person_feature = embedded_features[0].featureValue

      guard let feature_MLarray_value = person_feature.multiArrayValue else {
        results.error = FSC_Error.nativeError("Cannot convert embbeded freatures to MultiArray.")
        return results
       }
      
      
      
      /* guard let MLarray_value = person_feature.multiArrayValue else {
          results.error = FSC_Error.nativeError("Cannot convert embbeded freatures to MultiArray.")
          return results
        }
      }*/
      
      
      let (poses2d, poses3d) = try poseEstimator.estimateSinglePose(on: feature_MLarray_value, size: CGSize(width: box.width, height: box.height))
       
      diff = Date().timeIntervalSince(start_skeleton)
      results.detection_time_elapsed = diff

      
        
      results.poses2D = poses2d
      results.poses3D = poses3d
      
      diff = Date().timeIntervalSince(start)
      results.total_time_elapsed = diff
      
    }
    catch(let error){
      results.error = .nativeError("\(error)")
    }
    
    return results
    
  }
  
  private func saveImage(from uiImage:UIImage) -> NSString{
    var img_uri = NSString(string: "")
    
    // Obtaining the Location of the Documents Directory
    let documents = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    
    // Create URL
    let url = documents.appendingPathComponent("image.png")
    
    // Convert to Data
    if let data = uiImage.jpegData(compressionQuality: 1.0) {
      do {
        try data.write(to: url)
        img_uri = NSString(string: url.absoluteString)
      } catch {
        print("Unable to Write Image Data to Disk")
        img_uri = NSString(string: "Unable to Write Image Data to Disk")
      }
    }
    
    return img_uri
  }
  
  private func saveImage(from ciImage:CIImage) -> NSString{
    let uiImage = UIImage(ciImage: ciImage)
    var img_uri = saveImage(from: uiImage)
    return img_uri
  }


}
