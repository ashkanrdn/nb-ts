import React from "react";
import {
  Box,
  Center,
  Text,
  Divider,
  HStack,
  Icon,
  ScrollView,
  Heading,
  VStack,
  View,
  Button,
  Pressable,
} from "native-base";
import { Feather, MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";

import ExcPreview from "../components/ExcPreview";
import Play from "../components/Play";
import { useNavigation } from "@react-navigation/native";
import { useSnapshot } from "valtio";
import { AssessmentExercises, currentExercise } from "../constants/states";

export default function AssessmentInstructions() {
  const navigation = useNavigation();
  const Excs = useSnapshot(AssessmentExercises);
  const excCounter = useSnapshot(currentExercise);
  const pressHandler: any = () => {
    navigation.goBack();
  };

  return (
    <Box safeAreaTop flex={1}>
      <View flex={1}>
        <Box flex={6} p='2' m='2'>
          <Box display='flex' flexDirection='row' justifyContent='space-between'>
            <Pressable onPress={pressHandler}>
              <Icon as={Ionicons} name='chevron-back-sharp' size={8} />
            </Pressable>
          </Box>

          <VStack justifyContent='center' alignItems='center' space='1'>
            <Heading size='xs'> Assessment # {excCounter.currentExerciseNum} </Heading>
            <Heading pt='2' size='lg'>
              {Excs[excCounter.currentExerciseNum].Exc_name}
            </Heading>
          </VStack>

          <Box
            w='90%'
            mx='4'
            py='1'
            my='2'
            borderBottomColor='blueGray.400'
            borderBottomWidth='1'
            borderTopColor='blueGray.400'
            borderTopWidth='1'>
            <HStack space='xl' py='1.5' justifyContent='space-evenly' alignItems='center' alignContent='center'>
              <Box
                borderRightColor='blueGray.400'
                borderRightWidth='1'
                w='50%'
                height='20'
                justifyContent='space-around'
                alignItems='center'
                alignContent='center'>
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
                  <Text> {Excs[excCounter.currentExerciseNum].Exc_equipment.equipment_1?.name}</Text>
                </Center>
              </Box>

              <Box w='50%' height='20' justifyContent='space-around' alignItems='center' alignContent='center'>
                <Center>
                  <Text>Time</Text>
                  <Text> {Excs[excCounter.currentExerciseNum].Exc_overview} </Text>
                </Center>
              </Box>
            </HStack>
          </Box>
          <Box maxH='50%' py='1'>
            <ScrollView>
              <Text>{Excs[excCounter.currentExerciseNum].Exc_Description}</Text>
            </ScrollView>
          </Box>
        </Box>
        <Box bgColor='red.100' flex={1}>
          <Play />
        </Box>
      </View>
    </Box>
  );
}
