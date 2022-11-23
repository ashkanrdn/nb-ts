import { proxy } from "valtio";

export const AssessmentExercises = proxy([
  {
    Exc_id: 1,
    Exc_name: "Sit to Stand",
    Exc_Icon: "../assets/1.png",
    Exc_Video: "src/assets/results_3d.mp4",
    Exc_Description:
      "Sit near the front edge of a chair. Lean forward at the waist, press down with your legs, and raise to a standing position with your arms on your chest. Lower your arms by your sides as you raise to stand. Maintain a standing posture. Then, return to your chair by leaning forward and raising your arms. ",
    Exc_equipment: { equipment_1: { name: "Chair", icon: "src/assets/cartoon.png" } },
    Exc_overview: "1 set, ~30 sec",
  },
  {
    Exc_id: 2,
    Exc_name: "Forward bend",
    Exc_Icon: "../assets/2.png",
    Exc_Video: "src/assets/results_3d.mp4",
    Exc_Description:
      "Sit near the front edge of a chair. Lean forward at the waist, press down with your legs, and raise to a standing position with your arms on your chest. Lower your arms by your sides as you raise to stand. Maintain a standing posture. Then, return to your chair by leaning forward and raising your arms. ",
    Exc_equipment: {},
    Exc_overview: "1 set, ~30 sec",
  },

  {
    Exc_id: 3,
    Exc_name: "Forward bend",
    Exc_Icon: "../assets/3.png",
    Exc_Video: "src/assets/results_3d.mp4",
    Exc_Description:
      "Sit near the front edge of a chair. Lean forward at the waist, press down with your legs, and raise to a standing position with your arms on your chest. Lower your arms by your sides as you raise to stand. Maintain a standing posture. Then, return to your chair by leaning forward and raising your arms. ",
    Exc_equipment: {},
    Exc_overview: "1 set, ~30 sec",
  },
  {
    Exc_id: 4,
    Exc_name: "Forward bend",
    Exc_Icon: "../assets/4.png",
    Exc_Video: "src/assets/results_3d.mp4",
    Exc_Description:
      "Sit near the front edge of a chair. Lean forward at the waist, press down with your legs, and raise to a standing position with your arms on your chest. Lower your arms by your sides as you raise to stand. Maintain a standing posture. Then, return to your chair by leaning forward and raising your arms. ",
    Exc_equipment: {},
    Exc_overview: "1 set, ~30 sec",
  },
  {
    Exc_id: 5,
    Exc_name: "Forward bend",
    Exc_Icon: "../assets/5.png",
    Exc_Video: "src/assets/results_3d.mp4",
    Exc_Description:
      "Sit near the front edge of a chair. Lean forward at the waist, press down with your legs, and raise to a standing position with your arms on your chest. Lower your arms by your sides as you raise to stand. Maintain a standing posture. Then, return to your chair by leaning forward and raising your arms. ",
    Exc_equipment: {},
    Exc_overview: "1 set, ~30 sec",
  },
]);

export const User = proxy({ User_FName: "Betty", User_LName: "Betty" });
