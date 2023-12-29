import React from 'react';
import { action } from '@storybook/addon-actions';
import CommentItem from './CommentItem';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

export default {
  title: 'CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
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

const comment = {
  id: 'comment-1',
  content: 'Ini adalah komentar pertama',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
};

export const Default = () => (
  <Provider store={mockStore}>
    <CommentItem
      comment={ comment }
      onUpVote={action('clicked')}
      onDownVote={action('clicked')}
      onCancelVote={action('clicked')}
    />
  </Provider>
);
