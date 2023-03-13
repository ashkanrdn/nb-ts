import React from "react";
import { Box, Button, Flex, Heading, HStack, ScrollView, Text, VStack } from "native-base";

import { useNavigation } from "@react-navigation/native";
import ResultScore from "../components/Result-Score";

import { View, Dimensions } from "react-native";

import { LineChart } from "react-native-chart-kit";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";

var data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 29],
    },
  ],
};

// update params with states
// make state for exc info
// populate states
// update the params
// write results to db
// make a function to fetch historical data
// draw the chart
var params_to_db = {
  TableName: "Smart_Health_Table",

  Item: {
    user_id: "100456",
    exercise_id: "10023",
    exercise_data: {
      date_time: "12/10/23",
      exercise_name: "Situps",
      range_of_motions: "new",
    },
    user_data: {
      dob: "09/27/23",
      email: "jhon@uncc.edu",
      first_name: "Jhon",
      last_name: "Ray",
    },
  },
};

const user: string = "Betty";

export default function Results() {
  const navigation = useNavigation();

  return (
    <Box safeAreaTop flex={1} m='2' p='2'>
      <Box flex={1} alignItems='center' mt='2'>
        <Heading size='xl' color='trueGray.500'>
          Great! {user} have finished two exercises!
        </Heading>
      </Box>
      {/* rendering the users */}
      <Box justifyContent='space-around' py='1' flex={8}>
        <ScrollView>
          <ResultScore score={2} />

          <View>
            <LineChart
              data={data}
              width={Dimensions.get("window").width * 0.95}
              height={200}
              chartConfig={{
                color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
          </View>
        </ScrollView>
      </Box>
    </Box>
  );
}
