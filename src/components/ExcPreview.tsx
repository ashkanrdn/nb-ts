import React from "react";
import {
  Box,
  HStack,
  Icon,
  Text,
  Image,
  Center,
  Heading,
  VStack,
  Divider,
  Flex,
  ScrollView,
  Pressable,
} from "native-base";
import { Video, AVPlaybackStatus } from "expo-av";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ExcPreview = () => {
  const video = React.useRef(null);

  const [status, setStatus] = React.useState({});

  const navigation = useNavigation();

  const pressHandler: any = () => {
    navigation.navigate("Instructions", { names: "jes" });

    console.log("hi");
  };
  return (
    <Flex safeAreaTop direction='column'>
      <VStack justifyContent='center' alignItems='center'>
        <VStack justifyContent='center' alignItems='center' space='1'>
          <Heading size='xs'> {"Assessment #1"}</Heading>
          <Heading pt='2' size='lg'>
            {"Sit to Stand"}
          </Heading>
          <Heading size='xs'> {'~30" '}</Heading>
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
      </VStack>
    </Flex>
  );
};
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
export default ExcPreview;
