/** @type { import('@storybook/react').Preview } */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '../src/index.css';
import '../public/img/indonesia-flag.png';
import { createStore } from 'redux';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

const mockStore = createStore((state = {
  user: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'img/indonesia-flag.png',
  },
}, action) => {
  return state;
});

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
];