import Flash from './Flash';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const mockStore = createStore((state = {
  error: {
    isExists: true,
    type: 'ERROR',
    message: 'testing message',
  },
}, action) => {
  return state;
});

export default {
  title: 'Flash',
  component: Flash,
  tags: ['autodocs'],
};

export const Default = () => (
  <Provider store={mockStore}>
    <Flash />
  </Provider>
);
