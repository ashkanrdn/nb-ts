//
//  DebugLibraries.swift
//  fsccameraexpo
//
//  Created by Reza Baharani on 11/8/22.
//

import Foundation

class ImageSaver: NSObject {
  func writeToPhotoAlbum(image: UIImage) {
    UIImageWriteToSavedPhotosAlbum(image, self, #selector(saveCompleted), nil)
  }
  
  @objc func saveCompleted(_ image: UIImage, didFinishSavingWithError error: Error?, contextInfo: UnsafeRawPointer) {
    print("Save finished!")
  }
}
