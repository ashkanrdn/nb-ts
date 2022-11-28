import React from "react";
import { Box, Button, Center, Flex, Heading, Icon, Pressable, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";

import ExcPreview from "../components/ExcPreview";
import StartExc from "../components/StartExc";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { useSnapshot } from "valtio";
import { AssessmentExercises, currentExercise } from "../constants/states";

export default function AssessmentPlay() {
  const video = React.useRef(null);

  const [status, setStatus] = React.useState({});
  const [position, setPosition] = React.useState({});

  const navigation = useNavigation();

  const pressHandlerNext: any = () => {
    navigation.push("Detail");
    ++currentExercise.currentExerciseNum;
    console.log(currentExercise.currentExerciseNum);
  };
  const Excs = useSnapshot(AssessmentExercises);
  const excCounter = useSnapshot(currentExercise);

  function millisToMinutesAndSeconds(millis: number): string {
    var minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  return (
    <Box safeAreaTop flex={1}>
      <Box flex={6} pt='2' mt='2'>
        <Center my={2}>
          <Heading size='xs'> Assessment # {Excs[excCounter.currentExerciseNum].Exc_id}</Heading>
        </Center>

        <Box style={styles.container} w='full'>
          <Video
            ref={video}
            style={styles.video}
            source={require("../assets/Assessment1.mov")}
            useNativeControls
            resizeMode='cover'
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </Box>
        {status.isPlaying && (
          <Center w='full' bgColor='blueGray.300'>
            <Text fontSize='md' bold>
              {millisToMinutesAndSeconds(status.positionMillis)}
            </Text>
          </Center>
        )}
      </Box>
      <Box
        bgColor='red.100'
        flex={1}
        flexDirection='row'
        justifyContent='space-around'
        alignContent='center'
        alignItems='center'>
        <Box></Box>

        <Flex align='center' justify='center' py='1'>
          <Pressable
            display='flex'
            alignItems='center'
            onPress={() => (status.isPlaying ? video.current.pauseAsync() : video.current.playAsync())}
            w='full'>
            {({ isPressed }) => {
              return (
                <Flex
                  align='center'
                  justify='center'
                  w='20'
                  h='20'
                  bg={isPressed ? "cyan.200" : "cyan.300"}
                  style={{ transform: [{ scale: isPressed ? 0.98 : 1 }] }}
                  px='4'
                  py='4'
                  rounded='50'
                  shadow={1}>
                  <Text bold>{status.isPlaying ? "PAUSE" : "PLAY"}</Text>
                </Flex>
              );
            }}
          </Pressable>
        </Flex>
        {/* Next */}
        <Pressable onPress={pressHandlerNext}>
          <Icon as={Ionicons} name='chevron-forward-sharp' size={8} />
        </Pressable>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    height: "100%",
    width: "100%",
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
