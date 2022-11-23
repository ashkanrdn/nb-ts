import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  InputRightAddon,
  ScrollView,
} from "native-base";

import Excpre from "../components/ExcPreview";
import Footer from "../components/Footer";
import Play from "../components/Play";
import Skip from "../components/Skip";

const userName: string = "Betty";
export default function AssessmentDetail() {
  return (
    <Box safeAreaTop flex={1} flexGrow={1}>
      <Box flex={1} flexGrow={6} p='2' m='2'>
        <Excpre />
      </Box>

      <Box flex={1} flexGrow={1}>
        <Play />
        <Skip />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}
