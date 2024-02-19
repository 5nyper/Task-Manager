/* eslint-disable @typescript-eslint/no-unused-vars */
import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Task} from '../models/interfaces/Task.interface';
import {TasksService} from '../services/tasks.service';

export const fetchAllTasks = createAsyncThunk<Task[]>(
  'tasks/fetchAllTasks',
  TasksService.getAllTasks,
);

export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  TasksService.getTask,
);

export const addTask = createAsyncThunk('tasks/addTask', TasksService.addTask);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  TasksService.updateTask,
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  TasksService.deleteTask,
);
