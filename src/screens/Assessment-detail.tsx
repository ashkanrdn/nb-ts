import React from "react";
import { Box } from "native-base";

import ExcPreview from "../components/ExcPreview";
import Play from "../components/Play";

const userName: string = "Betty";
export default function AssessmentDetail() {
  return (
    <Box safeAreaTop flex={1}>
      <Box flex={6} p='2' m='2'>
        <ExcPreview />
      </Box>

      <Box bgColor='red.100' flex={1}>
        <Play />
      </Box>
    </Box>
  );
}
