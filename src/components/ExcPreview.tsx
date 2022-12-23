import React from "react";
import { Box, Heading, VStack, Flex, Pressable, Button, View } from "native-base";
import { Video } from "expo-av";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSnapshot } from "valtio";
import { useCameraDevices, Camera } from 'react-native-vision-camera';
import {useSharedValue} from 'react-native-reanimated'
import {useState, useEffect} from 'react'

import { AssessmentExercises, currentExercise } from "../constants/states";
import { currentResident } from "../constants/states";
import { Users } from "../constants/states";

import Graphs from "./Graph";

import {IFSC_Data, IBoundingBox} from '../utilities/interfaces'
import { initFSC_Data, initBox} from '../utilities/interfaces'
import {useFSC_FrameProcessor} from '../utilities/libraries'
import {__FSC_CONSTANT__, ESystem_AI_Mode} from '../utilities/Const'



var _ = require("lodash");

export default function ExcPreview() {


  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices()
  const device = devices.front
  const currentFSC_data = useSharedValue<IFSC_Data>(initFSC_Data);
  const currentSystemMode = useSharedValue<ESystem_AI_Mode>(__FSC_CONSTANT__.mode);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const Excs = useSnapshot(AssessmentExercises);
  const excCounter = useSnapshot(currentExercise);

  const navigation = useNavigation();

  const currentResidentSnap = useSnapshot(currentResident);
  const allResidentSnap = useSnapshot(Users);

  var residentInfo = _.toPlainObject(allResidentSnap[currentResidentSnap.currentUser_id]);

  const pressHandler: any = () => {
    navigation.navigate("Instructions");
  };


  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission()
      setHasPermission(status === 'authorized')
    })()
  }, [])

  const frameProcessor = useFSC_FrameProcessor(currentFSC_data, currentSystemMode)

  console.log(`Re-rendering Navigator. Camera: ${device}`);
  if (hasPermission == null) {
    // still loading
    return null;
  }

  if (device == null) {
    return <ActivityIndicator size={20} color={'red'} />;
  }



  return (
    <Box safeAreaTop flex={1}>
      <Box justifyContent='center' alignItems='center'>
        <VStack justifyContent='center' alignItems='center' space='1'>
          <Button onPress={navigation.goBack}></Button>
          <Heading>
            {residentInfo.User_info.User_FName} {residentInfo.User_info.User_LName}
          </Heading>
          <Heading size='xs'> Assessment # {Excs[excCounter.currentExerciseNum].Exc_id}</Heading>
          <Heading pt='2' size='lg'>
            {Excs[excCounter.currentExerciseNum].Exc_name}
          </Heading>
          <Heading size='xs'> {Excs[excCounter.currentExerciseNum].Exc_overview} </Heading>
          <Box style={styles.container} w='full'>
              <Camera
              style={[StyleSheet.absoluteFill, styles.camera]}
              device={device}
              isActive={true}
              enableZoomGesture={false}
              photo={false}
              video={false}
              frameProcessor={frameProcessor}
              orientation="portrait"
              frameProcessorFps={__FSC_CONSTANT__.fps}
              preset={__FSC_CONSTANT__.camera_preset}
              //onFrameProcessorPerformanceSuggestionAvailable={onFrameProcessorSuggestionAvailable}
            />
            <View style={styles.graph}>	
              <Graphs currentFSC_data={currentFSC_data} />
            </View>

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
  graph:{
    position: 'absolute',
    marginLeft: 0,
    marginTop: 400,
    width: 400,
    height: 400,
    opacity:0.5,
    zIndex:1
  },
  camera:{
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
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
