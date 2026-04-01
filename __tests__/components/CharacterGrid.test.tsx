import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterGrid from '@/components/CharacterGrid';
import {
  mockTwelveCharacters,
  mockTwentyCharacters,
} from '../mocks/character-data';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.location.reload
const mockReload = vi.fn();
Object.defineProperty(window, 'location', {
  value: { reload: mockReload },
  writable: true,
});

describe('CharacterGrid Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Loading State', () => {
    it('should display loading skeleton loaders initially', () => {
      mockFetch.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<CharacterGrid />);

      // Should show 12 skeleton loaders
      const skeletons = document.querySelectorAll('.animate-pulse');
      expect(skeletons).toHaveLength(12);
    });

    it('should show skeleton loaders with correct styling during loading', () => {
      mockFetch.mockImplementation(() => new Promise(() => {}));

      const { container } = render(<CharacterGrid />);

      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);

      skeletons.forEach(skeleton => {
        expect(skeleton).toHaveClass('bg-hp-shadow/50');
        expect(skeleton).toHaveClass('border-hp-bronze/30');
      });
    });

    it('should display loading state before data is fetched', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise(resolve => {
        resolvePromise = resolve;
      });

      mockFetch.mockReturnValue(promise);

      render(<CharacterGrid />);

      expect(document.querySelectorAll('.animate-pulse')).toHaveLength(12);

      resolvePromise!({
        ok: true,
        json: async () => mockTwelveCharacters,
      });

      await waitFor(() => {
        expect(document.querySelectorAll('.animate-pulse')).toHaveLength(0);
      });
    });
  });

  describe('Data Fetching and API Integration', () => {
    it('should fetch characters from the correct API endpoint', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTwelveCharacters,
      });

      render(<CharacterGrid />);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://potterapi-fedeperin.vercel.app/en/characters'
      );
    });

    it('should successfully render characters after fetching data', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTwelveCharacters,
      });

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(screen.getByText('Character 1')).toBeInTheDocument();
      });

      expect(screen.getByText('Character 2')).toBeInTheDocument();
    });

    it('should only display first 12 characters when API returns more (Pagination)', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTwentyCharacters,
      });

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(screen.getByText('Character 1')).toBeInTheDocument();
      });

      expect(screen.getByText('Character 12')).toBeInTheDocument();
      expect(screen.queryByText('Character 13')).not.toBeInTheDocument();
    });

    it('should call fetch only once on component mount', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTwelveCharacters,
      });

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(screen.getByText('Character 1')).toBeInTheDocument();
      });

      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Handling', () => {
    it('should display error message when API fetch fails', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(
          screen.getByText('Error Loading Characters')
        ).toBeInTheDocument();
      });

      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    it('should show retry button in error state and handle click', async () => {
      const user = userEvent.setup();
      mockFetch.mockRejectedValue(new Error('API Error'));

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(screen.getByText('Try Again')).toBeInTheDocument();
      });

      const retryButton = screen.getByText('Try Again');
      await user.click(retryButton);

      expect(mockReload).toHaveBeenCalled();
    });

    it('should handle generic errors without Error instance', async () => {
      mockFetch.mockRejectedValue('String error');

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(
          screen.getByText('Error Loading Characters')
        ).toBeInTheDocument();
      });

      expect(screen.getByText('An error occurred')).toBeInTheDocument();
    });
  });

  describe('Search and Filters', () => {
    it('should filter characters by search query', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTwelveCharacters,
      });

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(screen.getByText('Character 1')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        'Search characters by name or actor...'
      );
      await user.type(searchInput, 'Character 1');

      // Should show Character 1, 10, 11, 12 (since '1' matches them)
      expect(screen.getByText('Character 1')).toBeInTheDocument();
      // Should NOT show Character 2
      expect(screen.queryByText('Character 2')).not.toBeInTheDocument();
    });

    it('should show empty state when no characters match filters', async () => {
      const user = userEvent.setup();
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTwelveCharacters,
      });

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(screen.getByText('Character 1')).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        'Search characters by name or actor...'
      );
      await user.type(searchInput, 'NonExistentXYZ');

      await waitFor(() => {
        expect(screen.getByText('No Characters Found')).toBeInTheDocument();
      });
    });

    it('should show results count correctly', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockTwelveCharacters,
      });

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(screen.getByText('Character 1')).toBeInTheDocument();
      });

      // Found 12 characters
      const resultsText = screen.getByText(/Found/i);
      expect(resultsText.parentElement?.textContent).toContain(
        'Found 12 characters'
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty array response from API', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => [],
      });

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(screen.getByText('No Characters Found')).toBeInTheDocument();
      });

      expect(screen.queryByText('Character 1')).not.toBeInTheDocument();
    });

    it('should handle API response with fewer characters than ITEMS_PER_PAGE', async () => {
      const fiveCharacters = mockTwelveCharacters.slice(0, 5);
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => fiveCharacters,
      });

      render(<CharacterGrid />);

      await waitFor(() => {
        expect(screen.getByText('Character 1')).toBeInTheDocument();
      });

      expect(screen.getByText('Character 5')).toBeInTheDocument();
      expect(screen.queryByText('Character 6')).not.toBeInTheDocument();
      // Should not render pagination for < 12 items
      expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
    });
  });
});
