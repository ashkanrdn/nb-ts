//
//  ArrayExtension.swift
//  fsccameraexpo
//
//  Created by Reza Baharani on 11/16/22.
//

import Foundation


// From this link: https://forums.swift.org/t/ways-of-creating-2-dimensional-array-in-swift/36595
extension Array {
  func unflattening(dim: Int) -> [[Element]] {
    let hasRemainder = !count.isMultiple(of: dim)
    
    var result = [[Element]]()
    let size = count / dim
    result.reserveCapacity(size + (hasRemainder ? 1 : 0))
    for i in 0..<size {
      result.append(Array(self[i*dim..<(i + 1) * dim]))
    }
    if hasRemainder {
      result.append(Array(self[(size * dim)...]))
    }
    return result
  }
}
