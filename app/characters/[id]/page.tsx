import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Character } from '@/types/character';

interface CharacterDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getCharacter(id: string): Promise<Character | null> {
  try {
    const response = await fetch(
      'https://potterapi-fedeperin.vercel.app/en/characters',
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      return null;
    }

    const characters: Character[] = await response.json();
    return characters.find(char => char.index === parseInt(id)) || null;
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
}

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps) {
  const { id } = await params;
  const character = await getCharacter(id);

  if (!character) {
    notFound();
  }

  // Get house-specific colors
  const getHouseColors = (house: string) => {
    const houseLower = house.toLowerCase();
    switch (houseLower) {
      case 'gryffindor':
        return {
          border: 'border-gryffindor-primary',
          bg: 'bg-gryffindor-primary/20',
          bgSolid: 'bg-gryffindor-primary',
          text: 'text-gryffindor-secondary',
          accent: 'text-gryffindor-primary',
          icon: '/assets/icons8-hogwarts-legacy-gryffindor-48.png',
        };
      case 'slytherin':
        return {
          border: 'border-slytherin-primary',
          bg: 'bg-slytherin-primary/20',
          bgSolid: 'bg-slytherin-primary',
          text: 'text-slytherin-secondary',
          accent: 'text-slytherin-primary',
          icon: '/assets/icons8-hogwarts-legacy-slytherin-48.png',
        };
      case 'ravenclaw':
        return {
          border: 'border-ravenclaw-primary',
          bg: 'bg-ravenclaw-primary/20',
          bgSolid: 'bg-ravenclaw-primary',
          text: 'text-ravenclaw-secondary',
          accent: 'text-ravenclaw-primary',
          icon: '/assets/icons8-hogwarts-legacy-ravenclaw-48.png',
        };
      case 'hufflepuff':
        return {
          border: 'border-hufflepuff-primary',
          bg: 'bg-hufflepuff-primary/20',
          bgSolid: 'bg-hufflepuff-primary',
          text: 'text-hufflepuff-primary',
          accent: 'text-hufflepuff-secondary',
          icon: '/assets/icons8-hogwarts-legacy-hufflepuff-48.png',
        };
      default:
        return {
          border: 'border-hp-bronze',
          bg: 'bg-hp-shadow/20',
          bgSolid: 'bg-hp-shadow',
          text: 'text-hp-accent',
          accent: 'text-hp-accent',
          icon: null,
        };
    }
  };

  const houseColors = getHouseColors(character.hogwartsHouse);

  return (
    <div className="min-h-screen bg-hp-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-hp-shadow/80 border border-hp-bronze/40 rounded-lg hover:bg-hp-shadow transition-all duration-200 text-hp-accent hover:border-hp-bronze"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Characters
        </Link>
      </div>

      {/* Character Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-hp-shadow/80 backdrop-blur-md border-2 border-hp-bronze/40 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-96 md:h-auto">
                <Image
                  src={character.image}
                  alt={character.fullName}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-hp-background via-hp-background/50 to-transparent" />
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12 space-y-6">
                {/* House Badge */}
                {houseColors.icon && (
                  <div
                    className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border-2 ${houseColors.border} ${houseColors.bg} backdrop-blur-sm`}
                  >
                    <Image
                      src={houseColors.icon}
                      alt={character.hogwartsHouse}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                    <span
                      className={`hp-title text-lg font-semibold ${houseColors.text}`}
                    >
                      {character.hogwartsHouse}
                    </span>
                  </div>
                )}

                {/* Character Name */}
                <div>
                  <h1
                    className={`hp-title text-4xl md:text-5xl ${houseColors.accent} mb-2`}
                  >
                    {character.fullName}
                  </h1>
                  {character.nickname && (
                    <p className="text-xl text-hp-parchment/80 italic">
                      &quot;{character.nickname}&quot;
                    </p>
                  )}
                </div>

                {/* Details Grid */}
                <div className="space-y-4 pt-4">
                  {/* Birthdate */}
                  {character.birthdate && (
                    <div className="flex flex-col gap-1">
                      <dt
                        className={`text-sm font-semibold uppercase tracking-wide ${houseColors.text}`}
                      >
                        Date of Birth
                      </dt>
                      <dd className="text-lg text-hp-parchment">
                        {character.birthdate}
                      </dd>
                    </div>
                  )}

                  {/* Actor */}
                  {character.interpretedBy && (
                    <div className="flex flex-col gap-1">
                      <dt
                        className={`text-sm font-semibold uppercase tracking-wide ${houseColors.text}`}
                      >
                        Portrayed By
                      </dt>
                      <dd className="text-lg text-hp-parchment">
                        {character.interpretedBy}
                      </dd>
                    </div>
                  )}

                  {/* Children */}
                  {character.children && character.children.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <dt
                        className={`text-sm font-semibold uppercase tracking-wide ${houseColors.text}`}
                      >
                        Children
                      </dt>
                      <dd className="text-lg text-hp-parchment">
                        <ul className="list-disc list-inside space-y-1">
                          {character.children.map((child, index) => (
                            <li key={index}>{child}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  )}
                </div>

                {/* Decorative Element */}
                <div className="pt-6 flex justify-center">
                  <div className="text-6xl opacity-30">⚡</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
