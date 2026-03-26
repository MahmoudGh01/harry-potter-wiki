import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import Pagination from '@/components/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      description: 'Current active page number',
      control: { type: 'number', min: 1 },
    },
    totalPages: {
      description: 'Total number of pages',
      control: { type: 'number', min: 1 },
    },
    resultsPerPage: {
      description: 'Number of results per page',
      control: { type: 'number', min: 1 },
    },
    totalResults: {
      description: 'Total number of results',
      control: { type: 'number', min: 0 },
    },
    onPageChange: {
      description: 'Callback fired when page changes',
      action: 'page changed',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    resultsPerPage: 12,
    totalResults: 60,
    onPageChange: () => {},
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    resultsPerPage: 12,
    totalResults: 120,
    onPageChange: () => {},
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    resultsPerPage: 12,
    totalResults: 120,
    onPageChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    resultsPerPage: 12,
    totalResults: 120,
    onPageChange: () => {},
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    resultsPerPage: 12,
    totalResults: 8,
    onPageChange: () => {},
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 30,
    resultsPerPage: 12,
    totalResults: 360,
    onPageChange: () => {},
  },
};

export const Interactive: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    resultsPerPage: 12,
    totalResults: 120,
    onPageChange: () => {},
  },
  render: args => {
    const [currentPage, setCurrentPage] = React.useState(args.currentPage);
    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
};
