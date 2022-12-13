import React from "react";
import { Text, Heading, Box, View, IButtonProps, Button, ScrollView } from "native-base";
import { proxy, useSnapshot } from "valtio";
import Exercise from "../components/Exercise";

import Start from "../components/Start";
import Resident from "../components/Resident-Assess";
import { AssessmentExercises, currentExercise, Users } from "../constants/states";
import { useNavigation } from "@react-navigation/native";

export default function Residents() {
  const Residents: any = useSnapshot(Users);

  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.push("Detail");
  };

  return (
    <Box safeAreaTop flex={1} m='2' p='2'>
      <Box flex={1} alignItems='center' mt='2'>
        <Heading size='xl' color='trueGray.500'>
          Start Assessment!
        </Heading>
      </Box>
      {/* rendering the users */}
      <Box justifyContent='space-around' py='1' flex={8}>
        <ScrollView>
          {Residents.map((item: any) => (
            <Resident key={item.User_id} user={item} />
          ))}
        </ScrollView>
      </Box>
      <Box flex={1}>
        <Button
          onPress={() => {
            navigation.navigate("AddUser");
          }}>
          Add User
        </Button>
      </Box>
    </Box>
  );
}
