import React from "react";
import { Box, Center, Flex, Heading, Icon, Pressable, Text } from "native-base";
import { StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";

import ExcPreview from "../components/ExcPreview";
import StartExc from "../components/StartExc";
import { Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";

const userName: string = "Betty";
export default function AssessmentPlay() {
  const video = React.useRef(null);

  const [status, setStatus] = React.useState({});
  const navigation = useNavigation();

  const pressHandlerNext: any = () => {
    navigation.navigate();

    console.log("go to next exercise");
  };

  const videoPressHandler = () => {
    console.log("pressed");
  };

  return (
    <Box safeAreaTop flex={1}>
      <Box flex={6} p='2' m='2'>
        <Center my={2}>
          <Heading size='xs'> {"Assessment #1"}</Heading>
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
      </Box>

      <Box
        bgColor='red.100'
        flex={1}
        flexDirection='row'
        justifyContent='space-around'
        alignContent='center'
        alignItems='center'>
        <Pressable></Pressable>
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
                  <Text bold>Start</Text>
                </Flex>
              );
            }}
          </Pressable>
        </Flex>
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
    width: 400,
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
