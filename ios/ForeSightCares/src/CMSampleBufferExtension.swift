//
//  CMSampleBufferExtension.swift
//  fsccameraexpo
//
//  Created by Reza Baharani on 11/21/22.
//

import Foundation

extension CMSampleBuffer {
  /// https://stackoverflow.com/questions/15726761/make-an-uiimage-from-a-cmsamplebuffer
  func image(orientation: UIImage.Orientation = .up, scale: CGFloat = 1.0) -> UIImage? {
    if let buffer = CMSampleBufferGetImageBuffer(self) {
      let ciImage = CIImage(cvPixelBuffer: buffer)
      
      return UIImage(ciImage: ciImage, scale: scale, orientation: orientation)
    }
    
    return nil
  }
  
  func imageWithCGImage(orientation: UIImage.Orientation = .up, scale: CGFloat = 1.0) -> UIImage? {
    if let buffer = CMSampleBufferGetImageBuffer(self) {
      let ciImage = CIImage(cvPixelBuffer: buffer)
      
      let context = CIContext(options: nil)
      
      guard let cg = context.createCGImage(ciImage, from: ciImage.extent) else {
        return nil
      }
      
      return UIImage(cgImage: cg, scale: scale, orientation: orientation)
    }
    
    return nil
  }
}
