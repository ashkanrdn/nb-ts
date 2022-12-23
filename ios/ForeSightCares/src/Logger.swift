import os.log

let TensorFlowErrorType = OSLog(subsystem: "com.foresightcares.rt_processor", category: .pointsOfInterest)

func logMe(message: String, catagory: OSLog){
  os_log("%@", log: catagory, type: .fault, message)
}

func maybe<T>(_ arg: @autoclosure () throws -> T) -> T? {
  do {
    return try arg()
  }
  catch {
    os_log("Cannot init the value due to error: \(error)")
    return nil
  }
}
