import React from "react";
import { Box, Text, Center, Pressable } from "native-base";

import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const excerName: string = "Hi";

let show = function () {
  console.log("Anonymous function");
};

function Start() {
  const navigation = useNavigation();
  const pressHandler: any = () => {
    navigation.navigate("Detail", { names: "jes" });

    console.log("yo");
  };
  return (
    <Center mt='1'>
      <Box w='80%'>
        <Box alignItems='center'>
          <Pressable onPress={pressHandler} w='full'>
            {({ isPressed }) => {
              return (
                <Box
                  bg={isPressed ? "cyan.200" : "cyan.300"}
                  style={{ transform: [{ scale: isPressed ? 0.98 : 1 }] }}
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

export default Start;
