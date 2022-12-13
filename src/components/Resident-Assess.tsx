import React from "react";
import { Text, Flex, Box } from "native-base";

var _ = require("lodash");

import Assess from "./Assess";
const Resident = (props: any) => {
  const residentInfo = props.user;

  return (
    <Flex my='4' direction='row' alignItems='center' justifyContent='flex-start' alignContent='center'>
      <Box flex={4}>
        <Text fontSize='xl'>
          {residentInfo.User_info.User_FName} {residentInfo.User_info.User_LName}
        </Text>
      </Box>
      <Box flex={1}>
        <Assess resident={residentInfo} />
      </Box>
    </Flex>
  );
};

export default Resident;
