'use client';

import { useState } from 'react';

interface FiltersProps {
  selectedHouse: string;
  selectedSpecies: string;
  onHouseChange: (house: string) => void;
  onSpeciesChange: (species: string) => void;
  onClear: () => void;
  availableHouses: string[];
  availableSpecies: string[];
}

export default function Filters({
  selectedHouse,
  selectedSpecies,
  onHouseChange,
  onSpeciesChange,
  onClear,
  availableHouses,
  availableSpecies,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6 bg-hp-shadow/80 backdrop-blur-md border border-hp-bronze/40 rounded-lg shadow-xl">
      {/* Filter Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-hp-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-hp-parchment">Filters</h2>
        </div>
        <svg
          className={`w-5 h-5 text-hp-accent transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* House Filter */}
            <div>
              <label
                htmlFor="house-filter"
                className="block text-sm font-medium text-hp-parchment mb-2"
              >
                Hogwarts House
              </label>
              <select
                id="house-filter"
                value={selectedHouse}
                onChange={e => onHouseChange(e.target.value)}
                className="w-full px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 rounded-lg text-hp-parchment focus:outline-none focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 transition-all duration-200"
                style={{ colorScheme: 'dark' }}
              >
                <option value="">All Houses</option>
                {availableHouses.map(house => (
                  <option key={house} value={house}>
                    {house}
                  </option>
                ))}
              </select>
            </div>

            {/* Species Filter */}
            <div>
              <label
                htmlFor="species-filter"
                className="block text-sm font-medium text-hp-parchment mb-2"
              >
                Species
              </label>
              <select
                id="species-filter"
                value={selectedSpecies}
                onChange={e => onSpeciesChange(e.target.value)}
                className="w-full px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 rounded-lg text-hp-parchment focus:outline-none focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 transition-all duration-200"
                style={{ colorScheme: 'dark' }}
              >
                <option value="">All Species</option>
                {availableSpecies.map(species => (
                  <option key={species} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(selectedHouse || selectedSpecies) && (
            <div className="flex justify-end">
              <button
                onClick={onClear}
                className="px-4 py-2 bg-hp-accent/20 border border-hp-accent text-hp-accent rounded-lg hover:bg-hp-accent hover:text-hp-background transition-all duration-200 text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
