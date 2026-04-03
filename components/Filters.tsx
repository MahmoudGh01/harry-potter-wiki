'use client';

import { useState } from 'react';

export interface FilterOptions {
  house: string;
  hasActor: string; // 'all', 'with-actor', 'without-actor'
  hasChildren: string; // 'all', 'with-children', 'without-children'
}

interface FiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    house: 'all',
    hasActor: 'all',
    hasChildren: 'all',
  });

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      house: 'all',
      hasActor: 'all',
      hasChildren: 'all',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-hp-shadow/80 border border-hp-bronze/40 rounded-lg backdrop-blur-md shadow-xl">
      {/* Filter Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-hp-accent hover:text-hp-secondary transition-colors"
      >
        <div className="flex items-center space-x-2">
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
            />
          </svg>
          <span className="font-semibold hp-title">Filters</span>
        </div>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
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
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-hp-bronze/20">
          {/* Horizontal Filter Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* House Filter */}
            <div className="space-y-2">
              <label
                htmlFor="house-filter"
                className="block text-sm font-semibold text-hp-accent"
              >
                Hogwarts House
              </label>
              <select
                id="house-filter"
                value={filters.house}
                onChange={e => handleFilterChange('house', e.target.value)}
                className="w-full px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 rounded
                           text-hp-parchment focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 focus:outline-none
                           transition-all duration-200"
              >
                <option value="all">All Houses</option>
                <option value="gryffindor">🦁 Gryffindor</option>
                <option value="slytherin">🐍 Slytherin</option>
                <option value="ravenclaw">🦅 Ravenclaw</option>
                <option value="hufflepuff">🦡 Hufflepuff</option>
                <option value="unknown">❓ Unknown</option>
              </select>
            </div>

            {/* Actor Filter */}
            <div className="space-y-2">
              <label
                htmlFor="actor-filter"
                className="block text-sm font-semibold text-hp-accent"
              >
                Movie Appearance
              </label>
              <select
                id="actor-filter"
                value={filters.hasActor}
                onChange={e => handleFilterChange('hasActor', e.target.value)}
                className="w-full px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 rounded
                           text-hp-parchment focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 focus:outline-none
                           transition-all duration-200"
              >
                <option value="all">All Characters</option>
                <option value="with-actor">🎬 Appeared in Movies</option>
                <option value="without-actor">📚 Books Only</option>
              </select>
            </div>

            {/* Children Filter */}
            <div className="space-y-2">
              <label
                htmlFor="children-filter"
                className="block text-sm font-semibold text-hp-accent"
              >
                Family Status
              </label>
              <select
                id="children-filter"
                value={filters.hasChildren}
                onChange={e =>
                  handleFilterChange('hasChildren', e.target.value)
                }
                className="w-full px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 rounded
                           text-hp-parchment focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 focus:outline-none
                           transition-all duration-200"
              >
                <option value="all">All Characters</option>
                <option value="with-children">👨‍👩‍👧‍👦 Has Children</option>
                <option value="without-children">🧙‍♀️ No Children</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-transparent">
                Actions
              </div>
              {/* Spacer for alignment */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-hp-accent/20 border border-hp-accent text-hp-accent rounded
                           hover:bg-hp-accent hover:text-hp-background transition-all duration-200 font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
