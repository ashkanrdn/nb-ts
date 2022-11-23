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

  var icon = require("../assets/3.png");
  return (
    <Flex direction='row' alignItems='center' alignContent='center'>
      <Box p='2' ml='3'>
        <Image source={require("../assets/3.png")} alt='Alternative Text'></Image>
      </Box>
      <Box p='2'>
        <Text fontSize='4xl' color='trueGray.500'>
          {exerciseInfo.Exc_name}
        </Text>
      </Box>
    </Flex>
  );
};

export default Exercise;
