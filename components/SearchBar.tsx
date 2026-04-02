'use client';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
}: SearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative max-w-2xl mx-auto">
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-hp-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search characters by name or actor..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-hp-shadow/50 border-2 border-hp-bronze/30 rounded-lg text-hp-parchment placeholder:text-hp-text/60 focus:outline-none focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 transition-all duration-200 text-lg"
        />
      </div>
    </div>
  );
}
