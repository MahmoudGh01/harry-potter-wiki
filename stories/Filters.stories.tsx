import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import Filters from '@/components/Filters';

const meta = {
  title: 'Components/Filters',
  component: Filters,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedHouse: {
      description: 'Currently selected house filter',
      control: 'text',
    },
    selectedSpecies: {
      description: 'Currently selected species filter',
      control: 'text',
    },
    availableHouses: {
      description: 'List of available houses for filtering',
    },
    availableSpecies: {
      description: 'List of available species for filtering',
    },
    onHouseChange: {
      description: 'Callback fired when house filter changes',
      action: 'house changed',
    },
    onSpeciesChange: {
      description: 'Callback fired when species filter changes',
      action: 'species changed',
    },
    onClear: {
      description: 'Callback fired when clear filters button is clicked',
      action: 'filters cleared',
    },
  },
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

const availableHouses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const availableSpecies = ['Human', 'Giant', 'Goblin', 'House-elf', 'Werewolf'];

export const Default: Story = {
  args: {
    selectedHouse: '',
    selectedSpecies: '',
    availableHouses,
    availableSpecies,
    onHouseChange: () => {},
    onSpeciesChange: () => {},
    onClear: () => {},
  },
};

export const WithHouseSelected: Story = {
  args: {
    selectedHouse: 'Gryffindor',
    selectedSpecies: '',
    availableHouses,
    availableSpecies,
    onHouseChange: () => {},
    onSpeciesChange: () => {},
    onClear: () => {},
  },
};

export const WithSpeciesSelected: Story = {
  args: {
    selectedHouse: '',
    selectedSpecies: 'Human',
    availableHouses,
    availableSpecies,
    onHouseChange: () => {},
    onSpeciesChange: () => {},
    onClear: () => {},
  },
};

export const WithBothFilters: Story = {
  args: {
    selectedHouse: 'Slytherin',
    selectedSpecies: 'Human',
    availableHouses,
    availableSpecies,
    onHouseChange: () => {},
    onSpeciesChange: () => {},
    onClear: () => {},
  },
};

export const NoAvailableOptions: Story = {
  args: {
    selectedHouse: '',
    selectedSpecies: '',
    availableHouses: [],
    availableSpecies: [],
    onHouseChange: () => {},
    onSpeciesChange: () => {},
    onClear: () => {},
  },
};

export const Interactive: Story = {
  args: {
    selectedHouse: '',
    selectedSpecies: '',
    availableHouses,
    availableSpecies,
    onHouseChange: () => {},
    onSpeciesChange: () => {},
    onClear: () => {},
  },
  render: args => {
    const [selectedHouse, setSelectedHouse] = React.useState(
      args.selectedHouse
    );
    const [selectedSpecies, setSelectedSpecies] = React.useState(
      args.selectedSpecies
    );

    const handleClear = () => {
      setSelectedHouse('');
      setSelectedSpecies('');
    };

    return (
      <Filters
        {...args}
        selectedHouse={selectedHouse}
        selectedSpecies={selectedSpecies}
        onHouseChange={setSelectedHouse}
        onSpeciesChange={setSelectedSpecies}
        onClear={handleClear}
      />
    );
  },
};
