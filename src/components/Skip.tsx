import React from "react";
import { Box, HStack, Icon, Text, Image, Stack, Center, Button } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg from "react-native-svg";
import { Path, G } from "react-native-svg";
import { Pressable } from "react-native";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
const excerName: string = "Hi";

const Skip = () => {
  return (
    <Center mt='1'>
      <Box w='60%'>
        <Stack
          direction={{
            base: "column",
            md: "row",
          }}
          space={6}>
          <Button bg='blueGray.500' leftIcon={<Icon as={Ionicons} name='play' size='md' />}>
            Skip to next Assessment
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Skip;
