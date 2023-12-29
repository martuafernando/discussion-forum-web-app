import {action} from '@storybook/addon-actions';

import CategoryItem from './CategoryItem';

export default {
  title: 'CategoryItem',
  component: CategoryItem,
  tags: ['autodocs'],
};

export const Active = () => (
  <CategoryItem
    display='ActiveCategoryItem'
    className='Active'
    onClick={action('clicked')}
  />
);

export const NonActive = () => (
  <CategoryItem
    display='NonActiveCategoryItem'
    onClick={action('clicked')}
  />
);
