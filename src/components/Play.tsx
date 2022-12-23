import React from "react";
import { Box, Text, Center, Pressable, Flex } from "native-base";

import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const excerName: string = "Hi";

function Play() {
  const navigation = useNavigation();
  const pressHandler: any = () => {
    navigation.navigate("Play");
  };
  return (
    <Flex align='center' justify='center' py='1'>
      <Pressable display='flex' alignItems='center' onPress={pressHandler} w='full'>
        {({ isPressed }) => {
          return (
            <Flex
              align='center'
              justify='center'
              w='20'
              h='20'
              bg={isPressed ? "cyan.200" : "cyan.300"}
              style={{ transform: [{ scale: isPressed ? 0.98 : 1 }] }}
              px='4'
              py='4'
              rounded='50'
              shadow={1}>
              <Text bold>START</Text>
            </Flex>
          );
        }}
      </Pressable>
    </Flex>
  );
}

export default Play;
