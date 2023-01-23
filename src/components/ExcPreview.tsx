import React from "react";
import { Box, Heading, VStack, Flex, Pressable, Button } from "native-base";
import { Video } from "expo-av";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSnapshot } from "valtio";
import { AssessmentExercises, currentExercise } from "../constants/states";
import { currentResident } from "../constants/states";
import { Users } from "../constants/states";
var _ = require("lodash");
import { stores } from "../../App";

export default function ExcPreview() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const Excs = useSnapshot(AssessmentExercises);
  const excCounter = useSnapshot(currentExercise);

  const navigation = useNavigation();

  const currentResidentSnap = useSnapshot(currentResident);
  const allResidentSnap = useSnapshot(Users);

  const snaps = useSnapshot(stores);
  var current_resident_id = currentResidentSnap["currentUser_id"];
  var current_user_info = snaps["0"][current_resident_id];

  const pressHandler: any = () => {
    navigation.navigate("Instructions");
  };

  return (
    <Box safeAreaTop flex={1}>
      <Box justifyContent='center' alignItems='center'>
        <VStack justifyContent='center' alignItems='center' space='1'>
          <Button onPress={navigation.goBack}></Button>
          <Heading>
            {current_user_info.first_name} {current_user_info.last_name}
          </Heading>
          <Heading size='xs'> Assessment # {Excs[excCounter.currentExerciseNum].Exc_id}</Heading>
          <Heading pt='2' size='lg'>
            {Excs[excCounter.currentExerciseNum].Exc_name}
            {}
          </Heading>
          <Heading size='xs'> {Excs[excCounter.currentExerciseNum].Exc_overview} </Heading>
          <Box style={styles.container} w='full'>
            <Video
              ref={video}
              style={styles.video}
              // source={require("../assets/Assessment1.mov")}
              source={{ uri: Excs[excCounter.currentExerciseNum].Exc_Video }}
              useNativeControls
              resizeMode='cover'
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </Box>

          <Box py='2' display='flex' flexDirection='row'>
            <Pressable display='flex' alignItems='center' flexDirection='row' w='full' onPress={pressHandler}>
              <Ionicons flex={1} name='reader-outline' size={24} color='black' />
              <Heading px='4' flex={4} size='xs'>
                Exercise Detail
              </Heading>
            </Pressable>
          </Box>

          {/* <Image source={require("../assets/test1.png")} alt='Alternative Text'></Image> */}
        </VStack>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    height: "100%",
    width: 420,
    resizeMode: "stretch",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
});
