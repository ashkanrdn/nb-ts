import React from "react";
import { useSnapshot } from "valtio";

import { Heading, Box, Button, ScrollView } from "native-base";

import _ from "lodash";
import Resident from "../components/Resident-Assess";
import { useNavigation } from "@react-navigation/native";

import { stores } from "../constants/states";
//------------------------

import { ConfigurationOptions } from "aws-sdk";
import * as AWS from "aws-sdk";

const configuration: ConfigurationOptions = {
  region: "us-east-1",
  secretAccessKey: "2XjyeIzDuXpoR6v+3KEY9KjoT7ROEk8gTxzxdLcM",
  accessKeyId: "AKIAWRW334WT6CAQXIHD",
  dynamoDbCrc32: false,
};
AWS.config.update(configuration);

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getAllUserNames() {
  const arr = [];
  var dic = {};
  let res = await dynamodb
    .scan({
      TableName: "Smart_Health_Table",
    })
    .promise();

  for (let i = 0; i < res.Items.length; i++) {
    if (res.Items[i].exercise_id == 0) {
      dic[res.Items[i].user_id] = res.Items[i].user_data;
      // console.log(res.Items[i].user_data);
    }
  }
  return dic;
}

(async () => {
  let x = await getAllUserNames();
  // @ts-ignore
  console.log(x);
  stores.push(x);
  console.log(stores);
})();

//------------------------

export default function Residents() {
  const snaps = useSnapshot(stores);

  var keys = [];
  for (const key in snaps["0"]) {
    keys.push(key);
  }

  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.push("Detail");
  };

  return (
    <Box safeAreaTop flex={1} m='2' p='2'>
      <Box flex={1} alignItems='center' mt='2'>
        <Heading size='xl' color='trueGray.500'>
          Start Assessment!
        </Heading>
      </Box>
      {/* rendering the users */}
      <Box justifyContent='space-around' py='1' flex={8}>
        <ScrollView>
          {keys.map((item: any) => (
            <Resident key={item} user={item} />
          ))}
        </ScrollView>
      </Box>
      <Box flex={1}>
        <Button
          onPress={() => {
            navigation.navigate("AddUser");
          }}>
          Add User
        </Button>
      </Box>
    </Box>
  );
}
