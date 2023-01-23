const dynamodb = new AWS.DynamoDB.DocumentClient();

// get-all-data
dynamodb
  .scan({
    TableName: "Smart_Health_Table",
  })
  .promise()
  .then((data) => console.log(data.Items))
  .catch(console.error);

// Get_userdata_API_for

var params = {
  TableName: "Smart_Health_Table",
  KeyConditionExpression: "user_id = :user_id ",
  ExpressionAttributeValues: {
    ":user_id": "981",
  },
};

dynamodb.query(params, function (err, data) {
  if (err) console.log(err);
  else {
    console.log(data);
    console.log(data.Items);
    // console.log(data.Items[1]);
  }
});

// Get_userdata_API_for_perticular_excersiseid

var params = {
  TableName: "Smart_Health_Table",
  KeyConditionExpression: "user_id = :user_id AND exercise_id = :exercise_id",
  ExpressionAttributeValues: {
    ":user_id": "981",
    ":exercise_id": "322",
  },
};

dynamodb.query(params, function (err, data) {
  if (err) console.log(err);
  else {
    console.log(data);
    // console.log(data.Items[0]);
    // console.log(data.Items[1]);
  }
});

// Add data

var params = {
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

dynamodb.put(params, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});

//Delete-API
var params1 = {
  TableName: "Smart_Health_Table",
  Key: {
    user_id: "123",
    exercise_id: "456",
  },
};

dynamodb.delete(params1, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});

//Update-API
var params = {
  TableName: "Smart_Health_Table",
  Key: { user_id: "123", exercise_id: "789" },
  UpdateExpression: "set #Na.exercise_name = :name",
  ExpressionAttributeValues: {
    ":name": "situps_updated",
  },
  ExpressionAttributeNames: {
    "#Na": "exercise_data",
  },
};

dynamodb.update(params, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});

import { ConfigurationOptions } from "aws-sdk";
import * as AWS from "aws-sdk";

const configuration: ConfigurationOptions = {
  region: "us-east-1",
  secretAccessKey: "Vay5NEOudAuqXtQwvb7ZBJXtPgmSds5QSXcoPovL",
  accessKeyId: "AKIAWRW334WTYKPNJLQC",
};

AWS.config.update(configuration);
