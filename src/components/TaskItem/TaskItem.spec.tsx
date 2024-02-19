/*
 * @jest-environment jsdom
 */
global.setImmediate = jest.useRealTimers as unknown as typeof setImmediate;
global.clearImmediate = jest.useRealTimers as unknown as typeof clearImmediate;
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import * as React from 'react';
import { renderNavigator } from '../../..//test-utils';
import AppNavigator from '../../../AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { TaskItem } from './TaskItem';
import { tasks } from '../../../data/db.json';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';

const mockApiCall = jest.fn();

describe('TaskItem', () => {
  it('should display task data correctly', async () => {
    const component = (
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <TaskItem task={tasks[0]} />
        </Provider>
      </GluestackUIProvider>
    );

    render(component);

    const taskEntry = await screen.getByText(tasks[0].title);
    expect(taskEntry).toBeTruthy();
  });

  it('should navigate to edit screen when pressing edit', async () => {
    const component = (
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <TaskItem task={tasks[0]} />
        </Provider>
      </GluestackUIProvider>
    );

    render(component);

    const taskEntry = await screen.getByText(tasks[0].title);
    expect(taskEntry).toBeTruthy();
  });

  test('deleting a task entry', async () => {
    const component = (
      <GluestackUIProvider config={config}>
        <Provider store={store}>
          <TaskItem task={tasks[0]} dispatch={mockApiCall} />
        </Provider>
      </GluestackUIProvider>
    );

    render(component);

    let taskEntry = await screen.getAllByRole('button')[1];
    await fireEvent(taskEntry, 'press');
    await waitFor(async () => {
      expect(mockApiCall).toHaveBeenCalled();
    });
  });
});
