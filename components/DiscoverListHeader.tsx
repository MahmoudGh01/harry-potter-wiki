'use client';

interface DiscoverListHeaderProps {
  title: string;
  subtitle: string;
  description: string;
  id?: string;
}

export default function DiscoverListHeader({
  title,
  subtitle,
  description,
  id = 'page_characters',
}: DiscoverListHeaderProps) {
  return (
    <div className="relative w-full mb-12 overflow-hidden rounded-lg" id={id}>
      {/* Content */}
      <div
        className="flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-20"
        id={`div_${id.replace('page_', '')}`}
      >
        {/* Top Header */}
        <div className="text-hp-accent/90 text-sm md:text-base lg:text-lg uppercase tracking-widest mb-4 font-semibold">
          {subtitle}
        </div>

        {/* Main Title */}
        <h1
          className="hp-title hp-magical-text text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-hp-parchment mb-6 drop-shadow-2xl"
          id={id.replace('page_', '')}
        >
          <span className="inline-block">
            <span className="text-hp-accent">{title.charAt(0)}</span>
            <span>{title.slice(1)}</span>
          </span>
        </h1>

        {/* Description */}
        <div className="max-w-4xl text-hp-parchment/90 text-base md:text-lg lg:text-xl leading-relaxed backdrop-blur-sm bg-hp-shadow/40 p-6 md:p-8 rounded-lg border border-hp-bronze/30 shadow-2xl">
          {description}
        </div>
      </div>
    </div>
  );
}
