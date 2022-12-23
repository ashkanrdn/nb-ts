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

const userName: string = "Betty";
export default function AddUser() {
  const navigation = useNavigation();

  const [gender, setGender] = React.useState(null);
  const [fName, setFname] = React.useState(null);
  const [lName, setLname] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [height, setHeight] = React.useState(null);
  const [weight, setWeight] = React.useState(null);

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
            <FormControl.Label>Age</FormControl.Label>
            <Input defaultValue='55' placeholder='55' onChangeText={(text) => setAge(text)} />
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
        <Button>Add User</Button>
        <Button onPress={navigation.goBack}>Back</Button>
      </VStack>
    </Box>
  );
}
