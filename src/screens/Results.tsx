import React from "react";
import { Box, Button, Flex, Heading, HStack, ScrollView, Text, VStack } from "native-base";

import { useNavigation } from "@react-navigation/native";
import ResultScore from "../components/Result-Score";
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
          <ResultScore />
        </ScrollView>
      </Box>
      <Box flex={1}>
        <Button
          onPress={() => {
            navigation.navigate("AddUser");
          }}>
          All Results
        </Button>
      </Box>
    </Box>
  );
}
