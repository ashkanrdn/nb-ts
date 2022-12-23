import { Frame, useFrameProcessor } from 'react-native-vision-camera';
import { runOnJS, SharedValue } from 'react-native-reanimated';
import {ESystem_AI_Mode, EDirection} from './Const'
import {IFSC_Data} from './interfaces'
import {__FSC_CONSTANT__} from '../utilities/Const'


export class NotImplementedError extends Error{
  constructor(message = "")
  {
    super();
    this.name = "NotImplementedError";
    this.message = message;
  }
}

export function frame_processor(frame: Frame, mode: ESystem_AI_Mode) : IFSC_Data {
  'worklet';
  const obj = __frame_processorv2(frame, mode)[0];
  return obj
}


export function useFSC_FrameProcessor(
    fsc_data: SharedValue<IFSC_Data>, 
    systemMode : SharedValue<ESystem_AI_Mode>
  ) {

  const frameProcessor = useFrameProcessor((frame: Frame) => {
    'worklet';
    const nextFSC_data = frame_processor(frame, systemMode.value);

    fsc_data.value = nextFSC_data

    //runOnJS(addFrame)(nextFSC_data, currentSkeletonFrames)
  }, []);

  return frameProcessor

}

export function getIoU(boxA: number[], boxB: number[]) : number  {
  const xA = Math.max(boxA[0], boxB[0])
  const yA = Math.max(boxA[1], boxB[1])
  const xB = Math.min(boxA[2], boxB[2])
  const yB = Math.min(boxA[3], boxB[3])

  //compute the area of intersection rectangle
  const interArea = (xB - xA) * (yB - yA)

  //compute the area of both the prediction and ground-truth
  //rectangles
  const boxAArea = (boxA[2] - boxA[0]) * (boxA[3] - boxA[1])
  const boxBArea = (boxB[2] - boxB[0]) * (boxB[3] - boxB[1])

  //compute the intersection over union by taking the intersection
  //area and dividing it by the sum of prediction + ground-truth
  //areas - the interesection area
  const iou = interArea / (boxAArea + boxBArea - interArea)

  return iou
}

export function getUpdateDirection(
  currentFSC_data: SharedValue<IFSC_Data>,
  isCalibrated: SharedValue<boolean>,
  currentDirection: SharedValue<EDirection>,
  howManySecond: SharedValue<number>,
)  {
    var isPerfect = false;
    var direction = EDirection.BeInFrontOfCamera
    if (currentFSC_data.value.bounding_box.length > 0){
      const box = currentFSC_data.value.bounding_box
      const box_camera = [0, 0, __FSC_CONSTANT__.frame_width, __FSC_CONSTANT__.frame_height]
      const person_box = [box[0], box[1], box[0]+box[2], box[1]+box[3]]
      const x_center_person = (person_box[0]+person_box[2]) / 2
      const x_percent_center =  x_center_person/ __FSC_CONSTANT__.frame_width
      const iou = getIoU(box_camera, person_box)
      console.log(x_percent_center)
      if (iou == 0) {
        direction = EDirection.BeInFrontOfCamera
      }else {
        // We are in a good spot. Now let's see if we need to move the person to the left ot right.
        if(x_percent_center < 0.45){
          direction = EDirection.Right
        } else if (x_percent_center > 0.55) {
          direction = EDirection.Left
        } else {
          // if the direction is still `BeInFrontOfCamera`, it means the person is in the
          // middle of the screan. Now let's check the IoU
          if (iou <= 0.3) {
            direction = EDirection.Forward
          } else if (iou > 0.4) {
            direction = EDirection.Backup
          }else{
              direction = EDirection.StandStill
          }    
        }
      } 
    }
    if (direction == EDirection.StandStill){
      howManySecond.value = howManySecond.value+1
    }else{
      howManySecond.value = 0
    }
    if(howManySecond.value >= __FSC_CONSTANT__.up_count_timer_threshould){
      isPerfect = true
    }
    
    const nameOfDirection = EDirection[direction]
    console.log("Direction:", nameOfDirection)

    isCalibrated.value  = isPerfect
    currentDirection.value =  direction
}