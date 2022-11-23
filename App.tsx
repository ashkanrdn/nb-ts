import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  InputRightAddon,
  ScrollView,
} from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { proxy, useSnapshot } from "valtio";
import Assessment from "./src/screens/Assessment-home";
import AssessmentDetail from "./src/screens/Assessment-detail";
import AssessmentCam from "./src/screens/Assessment-cam";
import Flexi from "./src/screens/Flexi";

import AppContainer from "./src/Routes/homeStack";

const RootStack = createNativeStackNavigator();

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

const Stack = createNativeStackNavigator();

const userName: string = "Betty";
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppContainer />

        {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={Assessment} />
          <Stack.Screen name='Detail' component={AssessmentDetail} />
        </Stack.Navigator> */}
      </NavigationContainer>
      {/* <Flexi /> */}
      {/* <AssessmentDetail /> */}
      {/* <AssessmentCam /> */}
      {/* <Assessment userName={"Betty"} /> */}
    </NativeBaseProvider>
  );
}
