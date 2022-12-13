import React, { useState } from "react";
import { Box, Text, Center, Pressable } from "native-base";

import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSnapshot, proxy } from "valtio";

import { currentResident } from "../constants/states";

export default function Assess(props: any) {
  const navigation = useNavigation();

  const pressHandler: any = () => {
    navigation.navigate("Detail");

    currentResident.currentUser_id = props.resident.User_id;
  };

  return (
    <Pressable onPress={pressHandler}>
      {({ isPressed }) => {
        return (
          <Box
            borderWidth='2'
            // borderColor={isPressed ? "cyan.`200`" : "cyan.300"}
            borderColor={"cyan.200"}
            style={{ transform: [{ scale: isPressed ? 0.98 : 1 }] }}
            px='2'
            py='2'
            rounded='8'>
            <Center>
              <Text bold color='cyan.400' fontSize='md'>
                Assess
              </Text>
            </Center>
          </Box>
        );
      }}
    </Pressable>
  );
}
