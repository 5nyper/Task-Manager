/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../constants/env';
import {
  VStack,
  Heading,
  FormControl,
  Button,
  FormControlLabel,
  Switch,
  Text,
  FormControlLabelText,
  Input,
  InputField,
  HStack,
  ButtonText,
  TextareaInput,
  Textarea,
  FormControlErrorText,
} from '@gluestack-ui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../app/hooks';
import { addTask, updateTask } from '../../reducers/tasks.action';
import { Task } from '../../models/interfaces/Task.interface';

const AddTaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short')
    .max(40, 'Title is too long')
    .required('Required'),
  description: Yup.string(),
});

export const ModifyTaskScreen = ({ route, navigation }) => {
  const dispatch = useAppDispatch();
  const { mode, task } = route.params;
  const [date, setDate] = useState(new Date(task.date || new Date()));
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    setDate(currentDate);
  };

  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <Formik
      initialValues={task}
      validationSchema={AddTaskSchema}
      onSubmit={(values) => {
        let payload = { ...values };
        payload.date = date;
        payload.dateCreated = new Date();
        console.log(payload);
        if (mode == 'Add') dispatch(addTask(payload as Task));
        else dispatch(updateTask(payload as Task));
        navigation.navigate('TaskList');
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <Heading
            size="3xl"
            fontFamily="$heading"
            mb="$3"
            ml="$1"
            mt="$4"
            bold>
            {mode} Task
          </Heading>
          <Text size="sm">Make modifications to the settings with ease.</Text>
          <VStack py="$2" space="xl">
            <FormControl isRequired={true}>
              <FormControlLabel>
                <FormControlLabelText>Title</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  value={values.title}
                  placeholder="Title"
                />
              </Input>
              {errors.title && touched.title ? (
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <FormControlErrorText>{errors.title}</FormControlErrorText>
                </View>
              ) : null}
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Description</FormControlLabelText>
              </FormControlLabel>
              <Textarea>
                <TextareaInput
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  placeholder="Description"
                />
              </Textarea>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Date</FormControlLabelText>
              </FormControlLabel>
              <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  onChange={onChange}
                />
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'time'}
                  is24Hour={true}
                  onChange={onChange}
                />
              </View>
            </FormControl>
            <FormControl>
              <HStack space="sm">
                <Switch
                  size="sm"
                  value={values.isSetReminder}
                  onValueChange={(value) =>
                    setFieldValue('isSetReminder', value)
                  }
                  onBlur={handleBlur('isSetReminder')}
                />
                <FormControlLabelText>Set Reminder</FormControlLabelText>
              </HStack>
            </FormControl>
          </VStack>
          <Button mt="$4" onPress={() => handleSubmit()}>
            <ButtonText>Save</ButtonText>
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing(1),
    backgroundColor: theme.colors.background,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.subText,
    backgroundColor: theme.colors.cardBackground,
    padding: theme.spacing(2),
    borderRadius: 10,
    marginBottom: theme.spacing(2),
  },
});
