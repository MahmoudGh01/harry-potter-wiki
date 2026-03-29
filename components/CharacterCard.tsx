import Image from 'next/image';
import { Character } from '@/types/character';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  // Get house-specific colors and styling
  const getHouseColors = (house: string) => {
    const houseLower = house.toLowerCase();
    switch (houseLower) {
      case 'gryffindor':
        return {
          border: 'border-gryffindor-primary',
          bg: 'bg-gryffindor-primary/90',
          borderSecondary: 'border-gryffindor-secondary',
          shadow:
            'shadow-gryffindor-primary/40 hover:shadow-gryffindor-primary/60',
          text: 'text-gryffindor-secondary',
          icon: '/assets/icons8-hogwarts-legacy-gryffindor-48.png',
        };
      case 'slytherin':
        return {
          border: 'border-slytherin-primary',
          bg: 'bg-slytherin-primary/90',
          borderSecondary: 'border-slytherin-secondary',
          shadow:
            'shadow-slytherin-primary/40 hover:shadow-slytherin-primary/60',
          text: 'text-slytherin-secondary',
          icon: '/assets/icons8-hogwarts-legacy-slytherin-48.png',
        };
      case 'ravenclaw':
        return {
          border: 'border-ravenclaw-primary',
          bg: 'bg-ravenclaw-primary/90',
          borderSecondary: 'border-ravenclaw-secondary',
          shadow:
            'shadow-ravenclaw-primary/40 hover:shadow-ravenclaw-primary/60',
          text: 'text-ravenclaw-secondary',
          icon: '/assets/icons8-hogwarts-legacy-ravenclaw-48.png',
        };
      case 'hufflepuff':
        return {
          border: 'border-hufflepuff-primary',
          bg: 'bg-hufflepuff-primary/90',
          borderSecondary: 'border-hufflepuff-secondary',
          shadow:
            'shadow-hufflepuff-primary/40 hover:shadow-hufflepuff-primary/60',
          text: 'text-hufflepuff-primary',
          icon: '/assets/icons8-hogwarts-legacy-hufflepuff-48.png',
        };
      default:
        return {
          border: 'border-hp-bronze',
          bg: 'bg-hp-shadow/90',
          borderSecondary: 'border-hp-text',
          shadow: 'shadow-hp-bronze/40 hover:shadow-hp-bronze/60',
          text: 'text-hp-accent',
          icon: null,
        };
    }
  };

  const houseColors = getHouseColors(character.hogwartsHouse);

  return (
    <div
      className={`relative h-80 rounded-lg border-2 ${houseColors.border} ${houseColors.shadow} overflow-hidden transition-all duration-300 hover:scale-105 group`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={character.image}
          alt={character.fullName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      {/* House Badge */}
      {houseColors.icon && (
        <div
          className={`absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-full border-2 ${houseColors.bg} ${houseColors.borderSecondary} backdrop-blur-sm shadow-lg`}
        >
          <Image
            src={houseColors.icon}
            alt={character.hogwartsHouse}
            width={20}
            height={20}
            className="object-contain"
          />
          <span
            className={`text-sm hp-title hp-magical-text font-semibold ${houseColors.text}`}
          >
            {character.hogwartsHouse}
          </span>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        {/* Character Name */}
        <h3
          className={`hp-title text-xl ${houseColors.text} truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
        >
          {character.fullName}
        </h3>

        {/* Actor */}
        {character.interpretedBy && (
          <p className="text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className={`font-semibold ${houseColors.text}`}>Actor:</span>{' '}
            <span className="text-hp-parchment">{character.interpretedBy}</span>
          </p>
        )}

        {/* Birthdate */}
        <p className="text-xs text-hp-text/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <span className={`font-semibold ${houseColors.text}`}>Born:</span>{' '}
          {character.birthdate}
        </p>
      </div>
    </div>
  );
}
