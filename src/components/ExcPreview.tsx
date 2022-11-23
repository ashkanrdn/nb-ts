import React from "react";
import { Box, HStack, Icon, Text, Image, Stack, Center, Heading, VStack, Divider, Flex, ScrollView } from "native-base";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg from "react-native-svg";
import { Path, G } from "react-native-svg";
import { Pressable } from "react-native";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Play from "./Play";
import Skip from "./Skip";

const excerName: string = "Hi";

const Excpre = () => {
  return (
    <Flex safeAreaTop direction='column'>
      <VStack justifyContent='center' alignItems='center'>
        <VStack justifyContent='center' alignItems='center' space='4'>
          <Heading size='md'> Assessment 1</Heading>
          <Image source={require("../assets/test1.png")} alt='Alternative Text'></Image>

          <Heading size='sm'> Sit To Stand</Heading>
        </VStack>
        <Box w='80%' py='2'>
          <Divider />
          <HStack space='xl' py='1.5' justifyContent='space-around' alignItems='center' alignContent='center'>
            <Box height='20' justifyContent='space-around' alignItems='center' alignContent='center'>
              <Center>
                <Text textAlign='center'>Equipment</Text>
                <Icon
                  size='2xl'
                  as={MaterialCommunityIcons}
                  name='web'
                  color='coolGray.800'
                  _dark={{
                    color: "warmGray.50",
                  }}
                />
                <Text>Chair</Text>
              </Center>
            </Box>
            <Divider orientation='vertical' />
            <Box height='20' justifyContent='space-around' alignItems='center' alignContent='center'>
              <Center>
                <Text>Time</Text>
                <Text> 5</Text>
                <Text>Minutes</Text>
              </Center>
            </Box>
          </HStack>
          <Divider />
        </Box>

        <Box>
          <Text pt='0.5' fontWeight='bold'>
            Movement
          </Text>
          <Box maxH='50%' py='1'>
            <ScrollView>
              <Text>
                Sit near the front edge of a chair. Arms on the chest, lean forward at your waist as you press down with
                your legs, and rise to a standing position. As you rise to stand, lower your arms by your side. Stand ng
                position. As you rise to stand, lower your arms by your side. Stand you rise to stand, lower your arms
                by your side. Standyou rise to star side. Standyou rise to stand, lower your arms by your side. Standyou
                rise to stand, lower your arms by your side. Standr side. Standyou rise to stand, lower your arms by
                your side. Standyou rise to stand, lower your arms by your side. Standr side. Standyou rise to stand,
                lower your arms by your side. Standyou rise to stand, lower your arms by your side. Standnd, lower your
                arms by your side. Standyou rise to stand, lower your arms by your side. Stand
              </Text>
            </ScrollView>
          </Box>
        </Box>
      </VStack>
    </Flex>
  );
};

export default Excpre;
