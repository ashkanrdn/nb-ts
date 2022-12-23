export enum EExercise_Status {
    NotStarted,
    Activated,
    Finished
}

export enum EExercises {
    ChairStand_30Sec,
}

export enum EJoint_Name {
    Right_Shoulder,
    Left_Shoulder,
    Right_Shoulder_Rotation,
    Left_Shoulder_Rotation,
    Right_Hip_Duction,
    Left_Hip_Duction,
    Right_Hip_Flex_Ext,
    Left_Hip_Flex_Ext,
    Back,
    Left_Elbow,
    Right_Elbow,
    Right_Knee,
    Left_Knee
}

export interface EJointAngle {
    [key: number]: number;
}


export enum ESystem_AI_Mode {
    Calibration,
    Skeleton
}

export enum EDirection {
    Forward,
    Backup,
    Left,
    Right,
    StandStill,
    BeInFrontOfCamera
}  

export enum EGender {
    Female,
    Male
}  

export enum EEvaluation {
    Green,
    Yellow,
    Red,
    NotEvaluated
}

/**
 * /**
 * Indicates the quality level or bit rate of the output.
 *
 * * `"cif-352x288"`: Specifies capture settings suitable for CIF quality (352 x 288 pixel) video output
 * * `"hd-1280x720"`: Specifies capture settings suitable for 720p quality (1280 x 720 pixel) video output.
 * * `"hd-1920x1080"`: Capture settings suitable for 1080p-quality (1920 x 1080 pixels) video output.
 * * `"hd-3840x2160"`: Capture settings suitable for 2160p-quality (3840 x 2160 pixels, "4k") video output.
 * * `"high"`: Specifies capture settings suitable for high-quality video and audio output.
 * * `"iframe-1280x720"`: Specifies capture settings to achieve 1280 x 720 quality iFrame H.264 video at about 40 Mbits/sec with AAC audio.
 * * `"iframe-960x540"`: Specifies capture settings to achieve 960 x 540 quality iFrame H.264 video at about 30 Mbits/sec with AAC audio.
 * * `"input-priority"`: Specifies that the capture session does not control audio and video output settings.
 * * `"low"`: Specifies capture settings suitable for output video and audio bit rates suitable for sharing over 3G.
 * * `"medium"`: Specifies capture settings suitable for output video and audio bit rates suitable for sharing over WiFi.
 * * `"photo"`: Specifies capture settings suitable for high-resolution photo quality output.
 * * `"vga-640x480"`: Specifies capture settings suitable for VGA quality (640 x 480 pixel) video output.
export type CameraPreset =
| 'cif-352x288'
| 'hd-1280x720'
| 'hd-1920x1080'
| 'hd-3840x2160'
| 'high'
| 'iframe-1280x720'
| 'iframe-960x540'
| 'input-priority'
| 'low'
| 'medium'
| 'photo'
| 'vga-640x480';
 */

export const __FSC_CONSTANT__ = Object.freeze({
    frame_height: 960,
    frame_width: 540,
    camera_preset: 'iframe-960x540',
    fps: 8,
    bounding_box_refresh_rate: 100/6,
    iou_threshould: [0.3, 0.5],
    up_count_timer_threshould: 3,
    //Mode 0 is the graph mode and 1 is calibration mode.
    mode: ESystem_AI_Mode.Skeleton
})


export const __Exercise_Time__ = Object.freeze({
    ChairStand_30Sec: 30
})
