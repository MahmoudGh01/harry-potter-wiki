import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import Filters, { FilterOptions } from '@/components/Filters';

const meta = {
  title: 'Components/Filters',
  component: Filters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    onFilterChange: {
      description: 'Callback fired when any filter changes',
      action: 'filters changed',
    },
  },
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFilterChange: () => {},
  },
};

export const Interactive: Story = {
  args: {
    onFilterChange: () => {},
  },
  render: args => {
    const [currentFilters, setCurrentFilters] = React.useState<FilterOptions>({
      house: 'all',
      hasActor: 'all',
      hasChildren: 'all',
    });

    const handleFilterChange = (filters: FilterOptions) => {
      setCurrentFilters(filters);
      args.onFilterChange(filters);
    };

    return (
      <div className="space-y-4">
        <Filters onFilterChange={handleFilterChange} />
        <div className="p-4 bg-hp-shadow/50 rounded-lg border border-hp-bronze/30">
          <h3 className="text-hp-accent font-semibold mb-2">
            Current Filter State:
          </h3>
          <pre className="text-hp-parchment text-sm">
            {JSON.stringify(currentFilters, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};
