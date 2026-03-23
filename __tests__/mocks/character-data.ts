import { Character } from '@/types/character';

export const mockGryffindorCharacter: Character = {
  fullName: 'Harry Potter',
  nickname: 'The Boy Who Lived',
  hogwartsHouse: 'Gryffindor',
  interpretedBy: 'Daniel Radcliffe',
  children: ['James Sirius Potter', 'Albus Severus Potter', 'Lily Luna Potter'],
  image: 'https://example.com/harry-potter.jpg',
  birthdate: '31 July 1980',
  index: 1,
};

export const mockSlytherinCharacter: Character = {
  fullName: 'Draco Malfoy',
  nickname: 'The Slytherin Prince',
  hogwartsHouse: 'Slytherin',
  interpretedBy: 'Tom Felton',
  children: ['Scorpius Malfoy'],
  image: 'https://example.com/draco-malfoy.jpg',
  birthdate: '5 June 1980',
  index: 2,
};

export const mockRavenclawCharacter: Character = {
  fullName: 'Luna Lovegood',
  nickname: 'Loony',
  hogwartsHouse: 'Ravenclaw',
  interpretedBy: 'Evanna Lynch',
  children: ['Lorcan Scamander', 'Lysander Scamander'],
  image: 'https://example.com/luna-lovegood.jpg',
  birthdate: '13 February 1981',
  index: 3,
};

export const mockHufflepuffCharacter: Character = {
  fullName: 'Cedric Diggory',
  nickname: 'Ced',
  hogwartsHouse: 'Hufflepuff',
  interpretedBy: 'Robert Pattinson',
  children: [],
  image: 'https://example.com/cedric-diggory.jpg',
  birthdate: 'October 1977',
  index: 4,
};

export const mockCharacterNoHouse: Character = {
  fullName: 'Dobby',
  nickname: 'The Free Elf',
  hogwartsHouse: '',
  interpretedBy: '',
  children: [],
  image: 'https://example.com/dobby.jpg',
  birthdate: 'Unknown',
  index: 5,
};

export const mockCharacterNoActor: Character = {
  fullName: 'Tom Riddle Sr.',
  nickname: 'Tom',
  hogwartsHouse: '',
  interpretedBy: '',
  children: ['Tom Marvolo Riddle'],
  image: 'https://example.com/tom-riddle-sr.jpg',
  birthdate: '1905',
  index: 6,
};

export const mockCharacters: Character[] = [
  mockGryffindorCharacter,
  mockSlytherinCharacter,
  mockRavenclawCharacter,
  mockHufflepuffCharacter,
  mockCharacterNoHouse,
  mockCharacterNoActor,
];

// Create 12 characters for full grid testing
export const mockTwelveCharacters: Character[] = Array.from(
  { length: 12 },
  (_, index) => ({
    fullName: `Character ${index + 1}`,
    nickname: `Nickname ${index + 1}`,
    hogwartsHouse: ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'][
      index % 4
    ],
    interpretedBy: `Actor ${index + 1}`,
    children: [],
    image: `https://example.com/character-${index + 1}.jpg`,
    birthdate: `${index + 1} January 1980`,
    index: index + 1,
  })
);

// Create 20 characters to test the slice logic (should only show 12)
export const mockTwentyCharacters: Character[] = Array.from(
  { length: 20 },
  (_, index) => ({
    fullName: `Character ${index + 1}`,
    nickname: `Nickname ${index + 1}`,
    hogwartsHouse: 'Gryffindor',
    interpretedBy: `Actor ${index + 1}`,
    children: [],
    image: `https://example.com/character-${index + 1}.jpg`,
    birthdate: `${index + 1} January 1980`,
    index: index + 1,
  })
);
