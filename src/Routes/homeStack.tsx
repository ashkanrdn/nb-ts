import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AssessmentDetail from "../screens/Assessment-detail";
import Assessment from "../screens/Assessment-home";
// you can also import from @react-navigation/native

const screens = {
  Home: {
    screen: Assessment,
  },
  Detail: {
    screen: AssessmentDetail,
  },
};
const AppNavigator = createStackNavigator(screens);

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;
