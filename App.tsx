import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { proxy, useSnapshot } from "valtio";
import Assessment from "./src/screens/Assessment-home";
import AssessmentDetail from "./src/screens/Assessment-detail";
import AssessmentInstructions from "./src/screens/Assessment-instructions";
import AssessmentPlay from "./src/screens/Assessment-Play";
import AppContainer from "./src/Routes/homeStack";
import Residents from "./src/screens/Residents";

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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Residents' component={Residents} />
          <Stack.Screen name='Home' component={Assessment} />
          <Stack.Screen name='Play' component={AssessmentPlay} />
          <Stack.Screen name='Detail' component={AssessmentDetail} />
          <Stack.Screen name='Instructions' component={AssessmentInstructions} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
{
  /* <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Home' component={Assessment} />
          <Stack.Screen name='Detail' component={AssessmentDetail} />
        </Stack.Navigator> */
}
