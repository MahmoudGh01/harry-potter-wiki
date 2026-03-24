'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  resultsPerPage: number;
  totalResults: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  resultsPerPage,
  totalResults,
}: PaginationProps) {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, current page and surrounding pages
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-8 bg-hp-shadow/80 backdrop-blur-md border border-hp-bronze/40 rounded-lg shadow-xl p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Results Info */}
        <div className="text-sm text-hp-parchment">
          Showing{' '}
          <span className="font-semibold text-hp-accent">{startResult}</span> to{' '}
          <span className="font-semibold text-hp-accent">{endResult}</span> of{' '}
          <span className="font-semibold text-hp-accent">{totalResults}</span>{' '}
          characters
        </div>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 text-hp-parchment rounded-lg hover:bg-hp-accent/20 hover:border-hp-accent hover:text-hp-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-hp-shadow/50 disabled:hover:border-hp-bronze/30 disabled:hover:text-hp-parchment"
            aria-label="Previous page"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-hp-text"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-hp-accent text-hp-background border-hp-accent shadow-lg'
                    : 'bg-hp-shadow/50 border-hp-bronze/30 text-hp-parchment hover:bg-hp-accent/20 hover:border-hp-accent hover:text-hp-accent'
                }`}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-hp-shadow/50 border border-hp-bronze/30 text-hp-parchment rounded-lg hover:bg-hp-accent/20 hover:border-hp-accent hover:text-hp-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-hp-shadow/50 disabled:hover:border-hp-bronze/30 disabled:hover:text-hp-parchment"
            aria-label="Next page"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Items per page (optional, can be added later) */}
        <div className="hidden md:block w-40"></div>
      </div>
    </div>
  );
}
