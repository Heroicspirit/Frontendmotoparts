import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeaturedCategories from '@/app/(public)/_components/FeaturedCategories';

describe('FeaturedCategories Widget - Component Tests', () => {
  it('renders the featured categories heading', () => {
    render(<FeaturedCategories />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Featured Categories/i);
  });

  it('renders the Bike Parts category', () => {
    render(<FeaturedCategories />);
    expect(screen.getByText('Bike Parts')).toBeInTheDocument();
  });

  it('renders the Riding Gear category', () => {
    render(<FeaturedCategories />);
    expect(screen.getByText('Riding Gear')).toBeInTheDocument();
  });

  it('renders the Tires category', () => {
    render(<FeaturedCategories />);
    expect(screen.getByText('Tires')).toBeInTheDocument();
  });

  it('renders all three category images', () => {
    render(<FeaturedCategories />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('alt', 'Bike Engine Parts');
    expect(images[1]).toHaveAttribute('alt', 'Riding Gear');
    expect(images[2]).toHaveAttribute('alt', 'Motorcycle Tires');
  });
});
