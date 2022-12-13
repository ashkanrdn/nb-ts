import React from "react";
import { Text, Flex } from "native-base";

var _ = require("lodash");

import Assess from "./Assess";
const Resident = (props: any) => {
  const residentInfo = props.user;

  return (
    <Flex my='4' direction='row' alignItems='center' justifyContent='space-around' alignContent='center'>
      <Text fontSize='xl'>
        {residentInfo.User_info.User_FName} {residentInfo.User_info.User_LName}
      </Text>
      <Assess resident={residentInfo} />
    </Flex>
  );
};

export default Resident;
