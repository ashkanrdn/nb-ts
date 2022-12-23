//
//  fsc_frame_processor.swift
//  fsccameraexpo
//
//  Created by Reza Baharani on 10/11/22.
//

import Foundation

@objc(FSC_FrameProcessorV2)
public class FSC_FrameProcessorV2: NSObject, FrameProcessorPluginBase {
  
  @objc
  public static func callback(_ frame: Frame!, withArgs args: [Any]!) -> Any! {
       
    guard let buffer = frame.buffer else {
      let result = FSC_Data(error: FSC_Error.nativeError(" Camera buffer was empty."))
      return result.getMutableArray() //[try! result.getJSON()]
    }
    
    guard let image = buffer.imageWithCGImage() else {
      let result = FSC_Data(error: FSC_Error.nativeError(" Couln't convert camera buffer to an UIImage."))
      return result.getMutableArray() //[try! result.getJSON()]
    }
    
    do {
      let mode = try getAIMode(from: args)
      let result = DetectSkeleton.detect(from: image, basedOn: mode)
      return result.getMutableArray(mode: mode)
    } catch let error {
      let results = FSC_Data(error: FSC_Error.nativeError("\(error)"))
      return results.getMutableArray()
    }
  }
}
