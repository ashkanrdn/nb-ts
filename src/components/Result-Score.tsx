import React from "react";
import { Text, Flex, Box, View, CircleIcon, Pressable } from "native-base";

import { Icon } from "native-base";
const ResultScore = (props: any) => {
  return (
    <Flex my='4' direction='row' alignItems='center' justifyContent='flex-start' alignContent='center'>
      <Box px={4} flex={2}>
        <Text fontSize='xl'>Timed Up and Go!</Text>
      </Box>
      <Box flex={1}>
        <Flex align='center' justify='center' w='5' h='5 ' bg={"cyan.300"} px='4' py='4' rounded='50'>
          <Text bold>Start</Text>
        </Flex>
      </Box>
      <Box flex={1}>
        <Text fontSize='xl'>20 </Text>
      </Box>
    </Flex>
  );
};

export default ResultScore;
