import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center bg-hp-shadow/80 backdrop-blur-md border-2 border-hp-bronze/40 rounded-2xl shadow-2xl p-12">
          <div className="text-8xl mb-6">⚡</div>
          <h1 className="hp-title text-4xl text-hp-accent mb-4">
            Character Not Found
          </h1>
          <p className="text-hp-parchment mb-8 text-lg">
            The character you&apos;re looking for doesn&apos;t exist in our
            magical database. Perhaps they&apos;ve been petrified?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-hp-accent text-hp-background rounded-lg hover:bg-hp-accent/90 transition-all duration-200 font-semibold"
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
            Return to All Characters
          </Link>
        </div>
      </div>
    </div>
  );
}
