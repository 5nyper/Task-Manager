/* eslint-disable prettier/prettier */
import {createReducer} from '@reduxjs/toolkit';
import {Task} from '../models/interfaces/Task.interface'
import {
  fetchAllTasks
} from './tasks.action';

interface AppState {
  tasks: Task[];
}

const initialState: AppState = {
  tasks: [],
};

export const tasksReducer = createReducer(initialState, builder => {

  builder.addCase(fetchAllTasks.rejected, state => ({
    ...state,
    tasks: [],
  }));

  builder.addCase(fetchAllTasks.fulfilled, (state, action) => ({
    ...state,
    tasks: action.payload,
  }));

});
