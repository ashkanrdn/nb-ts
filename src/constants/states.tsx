import { proxy } from "valtio";

export const AssessmentExercises = proxy([
  {
    Exc_id: 1,
    Exc_name: "Sit to Stand",
    Exc_Icon: "https://github.com/ashkanrdn/nb-ts/blob/main/src/assets/2.png?raw=true",
    Exc_Video: "../assets/Assessment1.mov",
    Exc_Description:
      "Sit near the front edge of a chair. Lean forward at the waist, press down with your legs, and raise to a standing position with your arms on your chest. Lower your arms by your sides as you raise to stand. Maintain a standing posture. Then, return to your chair by leaning forward and raising your arms. ",
    Exc_equipment: { equipment_1: { name: "Chair", icon: "src/assets/cartoon.png" } },
    Exc_overview: "1 set, ~30 sec",
  },
  {
    Exc_id: 2,
    Exc_name: "Forward bend",
    Exc_Icon: "https://github.com/ashkanrdn/nb-ts/blob/main/src/assets/1.png?raw=true",
    Exc_Video: "../assets/Assessment1.mov",
    Exc_Description:
      "Place your feet comfortably, about shoulder width apart. Bend forward slowly, let your hands fall straight ahead of you until you feel a stretch. Hold for 30 seconds before returning to the standing position",
    Exc_equipment: {},
    Exc_overview: "1 set, ~30 sec",
  },

  {
    Exc_id: 3,
    Exc_name: "Hip Extension",
    Exc_Icon: "https://github.com/ashkanrdn/nb-ts/blob/main/src/assets/4.png?raw=true",
    Exc_Video: "../assets/Assessment1.mov",
    Exc_Description:
      "Move your leg back behind you while standing. Keep your torso upright and your knees straight throughout. Use your arms for balancing support.",
    Exc_equipment: {},
    Exc_overview: "1 set, ~30 sec",
  },
  {
    Exc_id: 4,
    Exc_name: "Shoulder Elevation",
    Exc_Icon: "https://github.com/ashkanrdn/nb-ts/blob/main/src/assets/2.png?raw=true",
    Exc_Video: "../assets/Assessment1.mov",
    Exc_Description:
      "Stand tall, arms at your sides, palms front. Slowly raise your arms to your sides. Lift only as high as you can without letting your shoulders to roll up toward your ears. Lower your arms slowly back. Repeat",
    Exc_equipment: {},
    Exc_overview: "1 set, ~30 sec",
  },
  {
    Exc_id: 5,
    Exc_name: "Shoulder Rotation",
    Exc_Icon: "https://github.com/ashkanrdn/nb-ts/blob/main/src/assets/3.png?raw=true",
    Exc_Video: "../assets/Assessment1.mov",
    Exc_Description:
      "Stand with your elbow around 90 degrees away from your side. Rotate your shoulder with a 90-degree bend in your elbow so that your forearm starts straight up and then moves downward. Repeat",
    Exc_equipment: {},
    Exc_overview: "1 set, ~30 sec",
  },
]);

export const User = proxy({ User_FName: "Betty", User_LName: "Betty" });

export var currentExercise = proxy({ currentExerciseNum: 0 });
