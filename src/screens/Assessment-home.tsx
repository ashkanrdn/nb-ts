import React from "react";
import { Text, Heading, Box, View, IButtonProps, Button } from "native-base";
import { proxy, useSnapshot } from "valtio";
import Exercise from "../components/Exercise";
import Footer from "../components/Footer";
import Start from "../components/Start";

import { AssessmentExercises, User } from "../constants/states";

export default function Assessment({ navigation }) {
  const Excs = useSnapshot(AssessmentExercises);
  const U: any = useSnapshot(User);
  const pressHandler = () => {
    navigation.navigate("Detail");
  };

  return (
    <Box safeAreaTop flex={1}>
      <Box flex={1} p='1' m='1'>
        <Box flex={1}>
          <Box alignItems='center' flexGrow={1}>
            <Heading>Good Morning {U.User_FName} !</Heading>
            <Text color='teal.500'>Let’s start with some simple assessments</Text>
            <Box display='flex' flexDirection='row-reverse'></Box>
          </Box>
          <Box borderBottomWidth='1' justifyContent='space-between' borderColor='teal.100' py='1' flexGrow={4}>
            {Excs.map((item) => (
              <Exercise key={item.Exc_id} exercise={item} />
            ))}
          </Box>
          <Box flexGrow={1}>
            <Start />
          </Box>
        </Box>
      </Box>
      <Box p='0' m='0'>
        <Footer />
      </Box>
    </Box>
  );
}
