import React from "react";
import { Box, HStack, Icon, Text, Image, Stack, Center } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg from "react-native-svg";
import { Path, G } from "react-native-svg";
import { Pressable } from "react-native";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
const excerName: string = "Hi";

const Footer = () => {
  return (
    <Box alignContent='center' mt='2'>
      <HStack
        display='flex'
        flexDirection='row'
        bg='muted.100'
        alignItems='center'
        justifyContent='space-around'
        safeAreaBottom>
        <Pressable cursor='pointer'>
          <Center>
            <Icon size='2xl' mt='0.5' as={<MaterialCommunityIcons name='home' />} />
            <Text>Home</Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default Footer;
