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

import * as React from 'react';
import { renderNavigator } from '../../..//test-utils';
import AppNavigator from '../../../AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

describe('TaskList', () => {
  it('should render', async () => {
    //await taskListFactory();
    renderNavigator(<AppNavigator />);

    expect(screen);
  });

  test('clicking on Add Task should go to Add TaskScreen', async () => {
    const component = (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    render(component);
    const toClick = await screen.findByText('Add Task');

    await act(async () => {
      fireEvent.press(toClick);
      const newHeader = await screen.findByText('Add Task');
      const newBody = await screen.findByText('Description');

      expect(newHeader).toBeTruthy();
      expect(newBody).toBeTruthy();
    });
  });
});
