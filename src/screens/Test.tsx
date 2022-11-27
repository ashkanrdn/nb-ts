import { Box, Text } from "native-base";
import React from "react";

export default function Test() {
  return (
    <Box safeAreaTop flex={1} flexGrow={1}>
      <Box flex={1} flexGrow={6} p='2' m='2'>
        <Text> Test</Text>
      </Box>
    </Box>
  );
}
