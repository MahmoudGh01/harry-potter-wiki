import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import Navigation from '@/components/Navigation';

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    searchQuery: {
      description: 'Current search query value',
      control: 'text',
    },
    onSearchChange: {
      description: 'Callback fired when search input changes',
      action: 'search changed',
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchQuery: '',
    onSearchChange: () => {},
  },
};

export const WithSearchQuery: Story = {
  args: {
    searchQuery: 'Harry Potter',
    onSearchChange: () => {},
  },
};

export const Interactive: Story = {
  args: {
    searchQuery: '',
    onSearchChange: () => {},
  },
  render: () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
    );
  },
};
