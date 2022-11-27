import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Test from "../screens/Test";
import Home from "../screens/Home";
// you can also import from @react-navigation/native

const screens = {
  Home: {
    screen: Home,
  },
  Test: {
    screen: Test,
  },
};
const AppNavigator = createStackNavigator(screens);

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
