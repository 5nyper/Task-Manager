/* eslint-disable prettier/prettier */
import { API_URL } from '../constants/env';
import { Task } from '../models/interfaces/Task.interface';

const getAllTasks = async (): Promise<Task[]> =>
  await fetch(`${API_URL}/tasks`).then(response => response.json());

const getTask = async (id: string): Promise<Task> =>
  await fetch(`${API_URL}/tasks/${id}`).then(response => response.json());

const addTask = async (task: Task): Promise<Task> =>
  await fetch(`${API_URL}/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then(response => response.json());

const updateTask = async (task: Task): Promise<Task> =>
  await fetch(`${API_URL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then(response => response.json());

const deleteTask = async (id: string): Promise<void> =>
  await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());

export const TasksService = {
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
  addTask
};
