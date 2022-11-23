import React from "react";
import {
  Box,
  HStack,
  Icon,
  Text,
  Image,
  Stack,
  Center,
  Button,
  Pressable,
  IButtonProps,
  Badge,
  Spacer,
  Flex,
} from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg from "react-native-svg";
import { Path, G } from "react-native-svg";

import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const excerName: string = "Hi";

let show = function () {
  console.log("Anonymous function");
};

function Play() {
  const navigation = useNavigation();
  const pressHandler: any = () => {
    // navigation.navigate("Detail");
  };
  return (
    <Center mt='1'>
      <Box w='80%'>
        <Box alignItems='center'>
          <Pressable w='full'>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box
                  bg={isPressed ? "cyan.200" : "cyan.300"}
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  px='4'
                  py='4'
                  rounded='8'
                  shadow={1}>
                  <Center>
                    <Text bold color='coolGray.800' fontSize='xl'>
                      START
                    </Text>
                  </Center>
                </Box>
              );
            }}
          </Pressable>
        </Box>
      </Box>
    </Center>
  );
}

export default Play;
