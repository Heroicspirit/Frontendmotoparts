import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '@/app/(public)/_components/Hero';

describe('Hero Widget - Component Tests', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Find the Right Parts/i);
  });

  it('renders the description text', () => {
    render(<Hero />);
    expect(screen.getByText(/Precision engineered components/i)).toBeInTheDocument();
  });

  it('renders the shop parts button', () => {
    render(<Hero />);
    const button = screen.getByRole('button', { name: /Shop Parts/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the motorcycle image', () => {
    render(<Hero />);
    const img = screen.getByRole('img', { name: /Superbike Profile/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src');
  });

  it('has a visible section with correct styling classes', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section?.className).toContain('bg-gradient');
  });
});
