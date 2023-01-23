import React from "react";
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  Select,
  Stack,
  VStack,
  WarningOutlineIcon,
} from "native-base";

import ExcPreview from "../components/ExcPreview";
import Play from "../components/Play";
import { useNavigation } from "@react-navigation/native";

import "react-native-get-random-values";
const { v4: uuid } = require("uuid");

import { ConfigurationOptions } from "aws-sdk";
import * as AWS from "aws-sdk";

const configuration: ConfigurationOptions = {
  region: "us-east-1",
  secretAccessKey: "2XjyeIzDuXpoR6v+3KEY9KjoT7ROEk8gTxzxdLcM",
  accessKeyId: "AKIAWRW334WT6CAQXIHD",
};
AWS.config.update(configuration);

const dynamodb = new AWS.DynamoDB.DocumentClient();

const userName: string = "Betty";
export default function AddUser() {
  const navigation = useNavigation();
  const [wasSuccess, setwasSuccess] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [fName, setFname] = React.useState(null);
  const [lName, setLname] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [height, setHeight] = React.useState(null);
  const [weight, setWeight] = React.useState(null);

  // make an object and have the api work on the add user

  var userParams = {
    first_name: fName,
    last_name: lName,
    age: age,
    gender: gender,
    height: height,
    weight: weight,
  };

  function addUser(userParamsArg: any) {
    const user_uuid = uuid();
    var userParams = {
      TableName: "Smart_Health_Table",
      Item: {
        user_id: user_uuid,
        exercise_id: "0",
        user_data: userParamsArg,
      },
    };

    dynamodb.put(userParams, function (err, data) {
      if (err) console.log(err);
      else console.log("User " + user_uuid + " Added Successfully!!");
    });
  }

  return (
    <Box alignItems='center' safeAreaTop flex={1}>
      <Box my='4' w='80%' maxWidth='400px'>
        <FormControl isRequired>
          <Stack mx='4'>
            <FormControl.Label>First Name</FormControl.Label>
            <Input defaultValue='Betty' placeholder='first name' onChangeText={(text) => setFname(text)} />
          </Stack>

          <Stack mx='4'>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input defaultValue='doe' placeholder='last name' onChangeText={(text) => setLname(text)} />
          </Stack>

          <Stack mx='4'>
            <FormControl.Label>Date of Birth</FormControl.Label>
            <Input defaultValue='01/08/1980' placeholder='01/08/1980' onChangeText={(text) => setAge(text)} />
          </Stack>

          <Stack mx='4'>
            <FormControl.Label>Weight (lbs) </FormControl.Label>
            <Input defaultValue='200' placeholder='200' onChangeText={(text) => setWeight(text)} />
          </Stack>

          <Stack mx='4'>
            <FormControl.Label>Height </FormControl.Label>
            <Input defaultValue="6'" placeholder="6'" onChangeText={(text) => setHeight(text)} />
          </Stack>

          <Stack mx='4'>
            <FormControl.Label>Gender </FormControl.Label>

            <Select
              selectedValue={gender}
              minWidth='200'
              accessibilityLabel='Choose gender'
              placeholder='Choose gender'
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size='5' />,
              }}
              mt={1}
              onValueChange={(itemValue) => setGender(itemValue)}>
              <Select.Item label='Male' value='Male' />
              <Select.Item label='Female' value='Female' />
              <Select.Item label='prefer not to say' value='prefer not to say' />
            </Select>
          </Stack>
        </FormControl>
      </Box>
      <VStack space='3'>
        <Button
          onPress={() => {
            addUser(userParams);
          }}>
          Add User
        </Button>
        <Button onPress={navigation.goBack}>Back</Button>
      </VStack>
    </Box>
  );
}
