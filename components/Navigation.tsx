'use client';

interface NavigationProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navigation({
  searchQuery,
  onSearchChange,
}: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-hp-background/98 backdrop-blur-lg border-b-2 border-hp-bronze/50 shadow-2xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Search Bar - Left */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-hp-accent"
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
              placeholder="Search characters..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-hp-shadow/50 border-2 border-hp-bronze/30 rounded-lg text-hp-parchment placeholder:text-hp-text/60 focus:outline-none focus:border-hp-accent focus:ring-2 focus:ring-hp-accent/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Logo - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="hp-title text-4xl text-hp-accent hp-magical-text whitespace-nowrap drop-shadow-lg">
            Harry Potter
          </h1>
        </div>

        {/* GitHub Link - Right */}
        <div className="flex-1 flex justify-end">
          <a
            href="https://github.com/MahmoudGh01/harry-potter-wiki"
            target="_blank"
            rel="noopener noreferrer"
            className="text-hp-text hover:text-hp-accent transition-colors duration-200"
            aria-label="GitHub Repository"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
