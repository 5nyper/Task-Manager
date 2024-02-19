/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Heading, AddIcon, Fab, FabIcon, FabLabel } from '@gluestack-ui/themed';
import { TaskItem } from '../../components/TaskItem/TaskItem';
import { useAppDispatch } from '../../app/hooks';
import { selectTasks } from '../../reducers/tasks.selectors';
import { useSelector } from 'react-redux';
import { fetchAllTasks } from '../../reducers/tasks.action';
import { theme } from '../../constants/env';
import { useIsFocused } from '@react-navigation/native';
import { Task } from '../../models/interfaces/Task.interface';

const TaskListScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const tasks = useSelector(selectTasks);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchAllTasks());
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  return (
    <View style={styles.container}>
      <Heading size="3xl" fontFamily="$heading" mb="$2" ml="$3" mt="$6" bold>
        Task Manager
      </Heading>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() =>
              navigation.navigate('ModifyTaskScreen', {
                task: item,
                navigation: navigation,
                mode: 'Edit',
              })
            }
            dispatch={dispatch}
          />
        )}
      />

      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={() =>
          navigation.navigate('ModifyTaskScreen', {
            navigation: navigation,
            mode: 'Add',
            task: {} as Task,
          })
        }>
        <FabIcon as={AddIcon} mr="$1" />
        <FabLabel>Add Task</FabLabel>
      </Fab>
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
  taskIcon: {
    marginRight: theme.spacing(2),
    fontSize: 20,
  },
  taskText: {
    fontSize: 18,
    color: theme.colors.text,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: theme.colors.subText,
  },
});

export { TaskListScreen };
