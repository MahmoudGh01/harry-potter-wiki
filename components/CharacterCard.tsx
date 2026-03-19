import Image from 'next/image';
import { Character } from '@/types/character';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  // Function to get house color for styling
  const getHouseColor = (house: string) => {
    switch (house.toLowerCase()) {
      case 'gryffindor':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'slytherin':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'ravenclaw':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'hufflepuff':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <div
      className={`rounded-lg border-2 p-4 shadow-lg transition-transform hover:scale-105 ${getHouseColor(character.hogwartsHouse)}`}
    >
      {/* Character Image */}
      <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg">
        <Image
          src={character.image}
          alt={character.fullName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Character Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
          {character.fullName}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">House:</span>{' '}
          {character.hogwartsHouse}
        </p>

        {character.interpretedBy && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Actor:</span>{' '}
            {character.interpretedBy}
          </p>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Born: {character.birthdate}
        </p>
      </div>
    </div>
  );
}
