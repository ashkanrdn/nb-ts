import React from "react";
import { Text, Heading, Box, View, IButtonProps, Button } from "native-base";
import { proxy, useSnapshot } from "valtio";
import Exercise from "../components/Exercise";

import Start from "../components/Start";

import { AssessmentExercises, currentExercise, Users } from "../constants/states";
import { useNavigation } from "@react-navigation/native";

export default function Assessment() {
  const Excs = useSnapshot(AssessmentExercises);
  const U: any = useSnapshot(Users);

  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.push("Residents");
  };

  return (
    <Box safeAreaTop flex={1} m='2' p='2'>
      <Box alignItems='center' flexGrow={1} mt='10'>
        <Heading size='xl' color='trueGray.500'>
          Good Morning!
        </Heading>
        <Heading size='md' color='muted.500' pt='4'>
          Let’s start with some assessments
        </Heading>
      </Box>
      {/* rendering the exercises */}
      {/* <Box justifyContent='space-around' py='1' flexGrow={4}>
        {Excs.map((item) => (
          <Exercise key={item.Exc_id} exercise={item} />
        ))}
      </Box> */}
      <Box flexGrow={1}>
        <Start pageName='Residents' />
      </Box>
    </Box>
  );
}
