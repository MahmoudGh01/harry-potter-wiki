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
    it('should apply Gryffindor styling for Gryffindor house', () => {
      const { container } = render(
        <CharacterCard character={mockGryffindorCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-gryffindor-primary');
    });

    it('should apply Slytherin styling for Slytherin house', () => {
      const { container } = render(
        <CharacterCard character={mockSlytherinCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-slytherin-primary');
    });

    it('should apply Ravenclaw styling for Ravenclaw house', () => {
      const { container } = render(
        <CharacterCard character={mockRavenclawCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-ravenclaw-primary');
    });

    it('should apply Hufflepuff styling for Hufflepuff house', () => {
      const { container } = render(
        <CharacterCard character={mockHufflepuffCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-hufflepuff-primary');
    });

    it('should apply default styling for unknown or empty house', () => {
      const { container } = render(
        <CharacterCard character={mockCharacterNoHouse} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('border-hp-bronze');
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

      expect(card).toHaveClass('border-gryffindor-primary');
    });
  });

  describe('Character Information Rendering', () => {
    it('should display character full name correctly', () => {
      render(<CharacterCard character={mockGryffindorCharacter} />);
      const nameElement = screen.getByText('Harry Potter');
      expect(nameElement).toBeInTheDocument();
      expect(nameElement).toHaveClass('hp-title');
    });

    it('should display all character details including name, house, and birthdate', () => {
      render(<CharacterCard character={mockSlytherinCharacter} />);

      expect(screen.getByText('Draco Malfoy')).toBeInTheDocument();
      expect(screen.getByText('Slytherin')).toBeInTheDocument();
      expect(screen.getByText(/5 June 1980/)).toBeInTheDocument();
    });

    it('should display birthdate with "Born:" label', () => {
      render(<CharacterCard character={mockHufflepuffCharacter} />);

      expect(screen.getByText('Born:')).toBeInTheDocument();
      expect(screen.getByText(/October 1977/)).toBeInTheDocument();
    });
  });

  describe('Actor Information Display', () => {
    it('should display actor name when interpretedBy field is present', () => {
      render(<CharacterCard character={mockGryffindorCharacter} />);

      expect(screen.getByText('Actor:')).toBeInTheDocument();
      expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument();
    });

    it('should NOT display actor section when interpretedBy field is empty', () => {
      render(<CharacterCard character={mockCharacterNoActor} />);

      expect(screen.queryByText('Actor:')).not.toBeInTheDocument();
    });

    it('should hide actor section when interpretedBy is an empty string', () => {
      render(<CharacterCard character={mockCharacterNoHouse} />);

      expect(screen.queryByText('Actor:')).not.toBeInTheDocument();
    });
  });

  describe('Image Component Rendering', () => {
    it('should render image with correct src attribute', () => {
      render(<CharacterCard character={mockGryffindorCharacter} />);

      const image = screen.getByAltText('Harry Potter');
      expect(image).toHaveAttribute(
        'src',
        'https://example.com/harry-potter.jpg'
      );
    });

    it('should use character fullName as image alt text for accessibility', () => {
      render(<CharacterCard character={mockRavenclawCharacter} />);

      const image = screen.getByAltText('Luna Lovegood');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt', 'Luna Lovegood');
    });

    it('should render image with correct sizes prop', () => {
      render(<CharacterCard character={mockHufflepuffCharacter} />);

      const image = screen.getByAltText('Cedric Diggory');
      expect(image).toHaveAttribute(
        'sizes',
        '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      );
    });

    it('should apply object-cover class to image for proper scaling', () => {
      render(<CharacterCard character={mockGryffindorCharacter} />);

      const image = screen.getByAltText('Harry Potter');
      expect(image).toHaveClass('object-cover');
    });
  });

  describe('Styling and Layout', () => {
    it('should have rounded corners and shadow for card styling', () => {
      const { container } = render(
        <CharacterCard character={mockGryffindorCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('shadow-xl');
      expect(card).toHaveClass('border-2');
    });

    it('should include hover scale effect for interactivity', () => {
      const { container } = render(
        <CharacterCard character={mockSlytherinCharacter} />
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass('hover:scale-105');
      expect(card).toHaveClass('transition-all');
    });

    it('should truncate long character names to prevent layout issues', () => {
      render(<CharacterCard character={mockGryffindorCharacter} />);

      const nameElement = screen.getByText('Harry Potter');
      expect(nameElement).toHaveClass('truncate');
    });
  });

  describe('Edge Cases', () => {
    it('should handle character with empty house string gracefully', () => {
      render(<CharacterCard character={mockCharacterNoHouse} />);

      expect(screen.getByText('Dobby')).toBeInTheDocument();
    });

    it('should render correctly when both house and actor are missing', () => {
      const minimalCharacter = {
        ...mockCharacterNoActor,
        hogwartsHouse: '',
      };

      render(<CharacterCard character={minimalCharacter} />);

      expect(screen.getByText('Tom Riddle Sr.')).toBeInTheDocument();
      expect(screen.queryByText('Actor:')).not.toBeInTheDocument();
      expect(screen.getByText('Born:')).toBeInTheDocument();
    });
  });
});
