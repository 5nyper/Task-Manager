/*
 * @jest-environment node
 */
import * as React from 'react';
import { screen } from '@testing-library/react-native';
import { renderNavigator } from '../test-utils';
import AppNavigator from '../AppNavigator';

test('The app renders', () => {
  renderNavigator(<AppNavigator />);

  expect(screen.getByRole('header', { name: 'Task Manager' })).toBeTruthy();
});
