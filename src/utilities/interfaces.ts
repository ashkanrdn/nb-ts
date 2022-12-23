export interface IPoses3D_Data{
    x: number[],
    y: number[],
    z: number[]
}
  
export interface IFSC_Data {
poses2D: number[][];
poses3D: number[][];
bounding_box: number[];
img_size: number[];
camera_angle: number;
errorCode: number;
errorDescription: string;
num_people: number;
detection_time_elapsed:  number;
skeleton_time_elapsed: number;
total_time_elapsed:  number
}


export interface IBoundingBox {
    x: number,
    y: number,
    width: number,
    height: number
}

//-------------- Init Values

export const initFSC_Data :  IFSC_Data  = {
poses2D:  [],
poses3D:  [],
bounding_box: [0, 0, 0, 0],
img_size: [],
camera_angle: 55,
errorCode:  -1,
errorDescription: '',
num_people: 0,
detection_time_elapsed: 0,
skeleton_time_elapsed: 0,
total_time_elapsed: 0
}

export const initBox : IBoundingBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
}
