'use client';

import { useState, useEffect, useMemo } from 'react';
import CharacterCard from './CharacterCard';
import Filters from './Filters';
import Pagination from './Pagination';
import Navigation from './Navigation';
import { Character } from '@/types/character';

const ITEMS_PER_PAGE = 12;

export default function CharacterGrid() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch characters
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://potterapi-fedeperin.vercel.app/en/characters'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }

        const data: Character[] = await response.json();
        setCharacters(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Get unique houses and species for filters
  const { availableHouses, availableSpecies } = useMemo(() => {
    const houses = new Set<string>();
    const species = new Set<string>();

    characters.forEach(char => {
      if (char.hogwartsHouse) houses.add(char.hogwartsHouse);
      // Note: The API doesn't have species field, so we'll need to adapt
      // For now, we'll keep it for future enhancement
    });

    return {
      availableHouses: Array.from(houses).sort(),
      availableSpecies: Array.from(species).sort(),
    };
  }, [characters]);

  // Filter and search characters
  const filteredCharacters = useMemo(() => {
    return characters.filter(char => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        char.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (char.interpretedBy &&
          char.interpretedBy.toLowerCase().includes(searchQuery.toLowerCase()));

      // House filter
      const matchesHouse =
        selectedHouse === '' || char.hogwartsHouse === selectedHouse;

      // Species filter (placeholder for future)
      const matchesSpecies = selectedSpecies === '';

      return matchesSearch && matchesHouse && matchesSpecies;
    });
  }, [characters, searchQuery, selectedHouse, selectedSpecies]);

  // Paginate characters
  const paginatedCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCharacters.slice(startIndex, endIndex);
  }, [filteredCharacters, currentPage]);

  const totalPages = Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedHouse, selectedSpecies]);

  const handleClearFilters = () => {
    setSelectedHouse('');
    setSelectedSpecies('');
  };

  if (loading) {
    return (
      <>
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="min-h-screen pt-4">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="h-80 bg-hp-shadow/50 border-2 border-hp-bronze/30 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="min-h-screen pt-4">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center max-w-md mx-auto bg-hp-shadow/80 backdrop-blur-md border border-hp-bronze/40 rounded-lg shadow-xl p-8">
              <div className="text-6xl mb-4">⚡</div>
              <h2 className="hp-title text-2xl text-hp-accent mb-4">
                Error Loading Characters
              </h2>
              <p className="text-hp-parchment mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-hp-accent text-hp-background rounded-lg hover:bg-hp-accent/90 transition-colors duration-200 font-semibold"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="min-h-screen pt-4">
        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <Filters
            selectedHouse={selectedHouse}
            selectedSpecies={selectedSpecies}
            onHouseChange={setSelectedHouse}
            onSpeciesChange={setSelectedSpecies}
            onClear={handleClearFilters}
            availableHouses={availableHouses}
            availableSpecies={availableSpecies}
          />

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-hp-parchment text-lg">
              Found{' '}
              <span className="font-semibold text-hp-accent">
                {filteredCharacters.length}
              </span>{' '}
              {filteredCharacters.length === 1 ? 'character' : 'characters'}
            </p>
          </div>

          {/* Character Grid */}
          {paginatedCharacters.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedCharacters.map(character => (
                  <CharacterCard key={character.index} character={character} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  resultsPerPage={ITEMS_PER_PAGE}
                  totalResults={filteredCharacters.length}
                />
              )}
            </>
          ) : (
            <div className="text-center max-w-md mx-auto bg-hp-shadow/80 backdrop-blur-md border border-hp-bronze/40 rounded-lg shadow-xl p-8">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="hp-title text-2xl text-hp-accent mb-4">
                No Characters Found
              </h2>
              <p className="text-hp-parchment mb-6">
                No characters match your current filters. Try adjusting your
                search or clearing filters.
              </p>
              {(selectedHouse || selectedSpecies || searchQuery) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleClearFilters();
                  }}
                  className="px-6 py-3 bg-hp-accent/20 border border-hp-accent text-hp-accent rounded-lg hover:bg-hp-accent hover:text-hp-background transition-all duration-200 font-semibold"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
