import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterCard from '@/components/CharacterCard';
import {
  mockGryffindorCharacter,
  mockSlytherinCharacter,
  mockRavenclawCharacter,
  mockHufflepuffCharacter,
  mockCharacterNoHouse,
  mockCharacterNoActor,
} from '../mocks/character-data';

describe('CharacterCard Component', () => {
  describe('House Color Logic', () => {
    it('should apply Gryffindor styling with red theme for Gryffindor house', () => {
      const { container } = render(
        <CharacterCard character={mockGryffindorCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-red-500');
      expect(card).toHaveClass('bg-red-50');
      expect(card).toHaveClass('dark:bg-red-900/20');
    });

    it('should apply Slytherin styling with green theme for Slytherin house', () => {
      const { container } = render(
        <CharacterCard character={mockSlytherinCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-green-500');
      expect(card).toHaveClass('bg-green-50');
      expect(card).toHaveClass('dark:bg-green-900/20');
    });

    it('should apply Ravenclaw styling with blue theme for Ravenclaw house', () => {
      const { container } = render(
        <CharacterCard character={mockRavenclawCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-blue-500');
      expect(card).toHaveClass('bg-blue-50');
      expect(card).toHaveClass('dark:bg-blue-900/20');
    });

    it('should apply Hufflepuff styling with yellow theme for Hufflepuff house', () => {
      const { container } = render(
        <CharacterCard character={mockHufflepuffCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-yellow-500');
      expect(card).toHaveClass('bg-yellow-50');
      expect(card).toHaveClass('dark:bg-yellow-900/20');
    });

    it('should apply default gray styling for unknown or empty house', () => {
      const { container } = render(
        <CharacterCard character={mockCharacterNoHouse} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-gray-300');
      expect(card).toHaveClass('bg-gray-50');
      expect(card).toHaveClass('dark:bg-gray-800');
    });

    it('should handle house names case-insensitively', () => {
      const uppercaseCharacter = {
        ...mockGryffindorCharacter,
        hogwartsHouse: 'GRYFFINDOR',
      };

      const { container } = render(
        <CharacterCard character={uppercaseCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-red-500');
    });
  });

  describe('Character Information Rendering', () => {
    it('should display character full name correctly', () => {
      render(<CharacterCard character={mockGryffindorCharacter} />);

      expect(screen.getByText('Harry Potter')).toBeInTheDocument();
      expect(screen.getByText('Harry Potter')).toHaveClass('font-bold');
    });

    it('should display all character details including name, house, and birthdate', () => {
      render(<CharacterCard character={mockSlytherinCharacter} />);

      expect(screen.getByText('Draco Malfoy')).toBeInTheDocument();
      expect(screen.getByText('Slytherin')).toBeInTheDocument();
      expect(screen.getByText(/5 June 1980/)).toBeInTheDocument();
    });

    it('should display house name in the House field', () => {
      render(<CharacterCard character={mockRavenclawCharacter} />);

      expect(screen.getByText(/House:/)).toBeInTheDocument();
      expect(screen.getByText('Ravenclaw')).toBeInTheDocument();
    });

    it('should display birthdate with "Born:" label', () => {
      render(<CharacterCard character={mockHufflepuffCharacter} />);

      expect(screen.getByText(/Born:/)).toBeInTheDocument();
      expect(screen.getByText(/October 1977/)).toBeInTheDocument();
    });
  });

  describe('Actor Information Display', () => {
    it('should display actor name when interpretedBy field is present', () => {
      render(<CharacterCard character={mockGryffindorCharacter} />);

      expect(screen.getByText(/Actor:/)).toBeInTheDocument();
      expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument();
    });

    it('should display actor information with correct label and value', () => {
      render(<CharacterCard character={mockSlytherinCharacter} />);

      const actorSection = screen.getByText(/Actor:/).parentElement;
      expect(actorSection).toHaveTextContent('Actor: Tom Felton');
    });

    it('should NOT display actor section when interpretedBy field is empty', () => {
      render(<CharacterCard character={mockCharacterNoActor} />);

      expect(screen.queryByText(/Actor:/)).not.toBeInTheDocument();
    });

    it('should hide actor section when interpretedBy is an empty string', () => {
      render(<CharacterCard character={mockCharacterNoHouse} />);

      expect(screen.queryByText(/Actor:/)).not.toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('should have rounded corners and shadow for card styling', () => {
      const { container } = render(
        <CharacterCard character={mockGryffindorCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('shadow-lg');
      expect(card).toHaveClass('border-2');
    });

    it('should include hover scale effect for interactivity', () => {
      const { container } = render(
        <CharacterCard character={mockSlytherinCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('hover:scale-105');
      expect(card).toHaveClass('transition-transform');
    });

    it('should have proper spacing and padding classes', () => {
      const { container } = render(
        <CharacterCard character={mockRavenclawCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('p-4');
    });

    it('should truncate long character names to prevent layout issues', () => {
      render(<CharacterCard character={mockGryffindorCharacter} />);

      const nameElement = screen.getByText('Harry Potter');
      expect(nameElement).toHaveClass('truncate');
    });
  });
});
