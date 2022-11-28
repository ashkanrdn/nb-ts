import React from "react";
import { Box, HStack, Icon, Text, Image, Stack, Checkbox, Flex } from "native-base";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg from "react-native-svg";
import { Path, G } from "react-native-svg";
import { proxy, useSnapshot } from "valtio";
var _ = require("lodash");

const Exercise = (props: any) => {
  var exerciseInfo = _.toPlainObject(props.exercise);
  var tep = exerciseInfo.Exc_Icon;
  // var pathtemp = require(tep);
  return (
    <Flex direction='row' alignItems='center' alignContent='center'>
      <Box p='2' ml='3'>
        <Image
          resizeMode='contain'
          w='16'
          h='20'
          source={{
            uri: exerciseInfo.Exc_Icon,
          }}
          alt='Alternative Text'></Image>
      </Box>
      <Box p='1'>
        <Text fontSize='2xl' color='trueGray.500'>
          {exerciseInfo.Exc_name}
        </Text>
      </Box>
    </Flex>
  );
};

export default Exercise;
