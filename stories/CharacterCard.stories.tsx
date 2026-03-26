import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CharacterCard from '@/components/CharacterCard';
import { Character } from '@/types/character';

const meta = {
  title: 'Components/CharacterCard',
  component: CharacterCard,
  parameters: {
    layout: 'centered',
  },
  render: args => (
    <div style={{ width: 320 }}>
      <CharacterCard {...args} />
    </div>
  ),
  tags: ['autodocs'],
  argTypes: {
    character: {
      description: 'Character data object',
    },
  },
} satisfies Meta<typeof CharacterCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const harryPotter: Character = {
  fullName: 'Harry James Potter',
  nickname: 'Harry',
  hogwartsHouse: 'Gryffindor',
  interpretedBy: 'Daniel Radcliffe',
  children: ['James Sirius Potter', 'Albus Severus Potter', 'Lily Luna Potter'],
  image:
    'https://potterapi-fedeperin.vercel.app/images/characters/harry_potter.png',
  birthdate: '31 July 1980',
  index: 1,
};
const dracoMalfoy: Character = {
  fullName: 'Draco Lucius Malfoy',
  nickname: 'Draco',
  hogwartsHouse: 'Slytherin',
  interpretedBy: 'Tom Felton',
  children: ['Scorpius Hyperion Malfoy'],
  image:
    'https://potterapi-fedeperin.vercel.app/images/characters/draco_malfoy.png',
  birthdate: '5 June 1980',
  index: 3,
};
const lunaLovegood: Character = {
  fullName: 'Luna Lovegood',
  nickname: 'Luna',
  hogwartsHouse: 'Ravenclaw',
  interpretedBy: 'Evanna Lynch',
  children: ['Lorcan Scamander', 'Lysander Scamander'],
  image:
    'https://potterapi-fedeperin.vercel.app/images/characters/luna_lovegood.png',
  birthdate: '13 February 1981',
  index: 4,
};
const cedricDiggory: Character = {
  fullName: 'Cedric Diggory',
  nickname: 'Cedric',
  hogwartsHouse: 'Hufflepuff',
  interpretedBy: 'Robert Pattinson',
  children: [],
  image:
    'https://potterapi-fedeperin.vercel.app/images/characters/cedric_diggory.png',
  birthdate: 'September/October 1977',
  index: 5,
};
export const Gryffindor: Story = {
  args: {
    character: harryPotter,
  },
};

export const Slytherin: Story = {
  args: {
    character: dracoMalfoy,
  },
};

export const Ravenclaw: Story = {
  args: {
    character: lunaLovegood,
  },
};

export const Hufflepuff: Story = {
  args: {
    character: cedricDiggory,
  },
};
