/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Task } from '../../models/interfaces/Task.interface';
import {
  Card,
  VStack,
  Heading,
  Box,
  ButtonText,
  Button,
  CheckIcon,
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@gluestack-ui/themed';
import {
  deleteTask,
  fetchAllTasks,
  updateTask,
} from '../../reducers/tasks.action';
import { useAppDispatch } from '../../app/hooks';
import { AppDispatch } from '../../app/store';

const theme = {
  colors: {
    primary: '#007AFF', // iOS system blue
    background: '#F9F9FB',
    cardBackground: '#FFFFFF',
    text: '#1C1C1E',
    subText: '#AEAEB2',
  },
  spacing: (factor: number) => 8 * factor,
};

type TaskItemProps = {
  task: Task;
  onPress?: any;
  dispatch: AppDispatch;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onPress, dispatch }) => {
  return (
    <View style={styles.taskItem}>
      <Card p="$5" borderRadius="$lg" width="$full">
        <Checkbox
          size="md"
          value={task.completed}
          onChange={() => {
            dispatch(updateTask({ ...task, completed: !task.completed }));
            dispatch(fetchAllTasks());
          }}
          isInvalid={false}
          isDisabled={false}
          aria-label="Status"
          mb="$2">
          <CheckboxIndicator mr="$2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>
            {' '}
            {task.completed ? 'Completed' : 'Not Completed'}
          </CheckboxLabel>
        </Checkbox>
        <VStack mb="$6">
          <Heading
            size="md"
            fontFamily="$heading"
            mb="$4"
            style={[styles.taskText, task.completed && styles.taskCompleted]}>
            {task.title}
          </Heading>
          <Text
            size="sm"
            fontFamily="$heading"
            style={[styles.taskText, task.completed && styles.taskCompleted]}>
            {task.description}
          </Text>
        </VStack>
        <Box
          flexDirection="row"
          sx={{
            '@sm': {
              flexDirection: 'row',
            },
          }}>
          <Button
            px="$4"
            py="$2"
            fontFamily="$heading"
            mr="$0"
            mb="$3"
            sx={{
              '@sm': {
                mr: '$3',
                mb: '$0',
                flex: 1,
              },
              width: '50%',
            }}
            onPress={onPress}>
            <ButtonText size="sm">Edit</ButtonText>
          </Button>
          <Button
            px="$4"
            py="$2"
            variant="outline"
            fontFamily="$heading"
            borderColor="$borderLight300"
            $dark-borderColor="$backgroundDark600"
            sx={{
              '@sm': {
                flex: 1,
              },
              width: '50%',
            }}
            ml={10}
            onPress={() => {
              dispatch(deleteTask(task.id));
              dispatch(fetchAllTasks());
            }}>
            <ButtonText
              size="sm"
              color="$textLight600"
              $dark-color="$textDark400">
              Delete
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  taskItem: {
    flexDirection: 'row',
    padding: theme.spacing(1),
    borderBottomColor: theme.colors.subText,
    alignItems: 'center',
    backgroundColor: theme.colors.cardBackground,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.subText,
  },
});

export { TaskItem };
