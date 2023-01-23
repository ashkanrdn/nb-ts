import React from "react";
import { Text, Flex, Box } from "native-base";

var _ = require("lodash");

import Assess from "./Assess";
import { useSnapshot } from "valtio";

import { stores } from "../constants/states";

const Resident = (props: any) => {
  const snaps = useSnapshot(stores);
  var keys = props.user;

  return (
    <Flex my='4' direction='row' alignItems='center' justifyContent='flex-start' alignContent='center'>
      <Box flex={4}>
        <Text fontSize='xl'>
          {snaps["0"][keys]["first_name"]} {snaps["0"][keys]["last_name"]}
        </Text>
      </Box>
      <Box flex={1}>
        <Assess resident={props} />
      </Box>
    </Flex>
  );
};

export default Resident;
