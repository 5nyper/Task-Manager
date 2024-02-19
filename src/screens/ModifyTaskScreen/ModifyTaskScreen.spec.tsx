import React from 'react';
import { ModifyTaskScreen } from './ModifyTaskScreen';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContext } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';

const mockNavigate = jest.fn();
const mockRoute = {
  params: {
    mode: 'Add',
    task: { title: '', description: '', isSetReminder: false },
  },
};

const component = (
  <GluestackUIProvider config={config}>
    <Provider store={store}>
      <NavigationContext.Provider value={{ navigate: mockNavigate }}>
        <ModifyTaskScreen
          route={mockRoute}
          navigation={{ navigate: mockNavigate }}
        />
      </NavigationContext.Provider>
    </Provider>
  </GluestackUIProvider>
);

describe('ModifyTaskScreen', () => {
  it('renders correctly with initial route params', () => {
    const { getByText } = render(component);
    expect(getByText('Add Task')).toBeTruthy();
  });

  it('validates form fields correctly', async () => {
    const { getByText, getByPlaceholderText } = render(component);

    fireEvent.changeText(getByPlaceholderText('Title'), 'A');
    fireEvent.press(getByText('Save'));

    await waitFor(() => {
      expect(getByText('Title is too short')).toBeTruthy();
    });
  });

  it('submits the form correctly', async () => {
    const { getByPlaceholderText, getAllByRole } = render(component);

    fireEvent.changeText(getByPlaceholderText('Title'), 'New Task');
    fireEvent.changeText(
      getByPlaceholderText('Description'),
      'New Task Description',
    );
    fireEvent(getAllByRole('button')[0], 'press');

    await waitFor(() => {
      // Check if the navigate function has been called after form submission
      expect(mockNavigate).toHaveBeenCalledWith('TaskList');
    });
  });
});
