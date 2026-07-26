import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FlashSale from '@/app/(public)/_components/FlashSale';

describe('FlashSale Widget - Component Tests', () => {
  it('renders the flash sale heading', () => {
    render(<FlashSale />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/40% Off/i);
  });

  it('renders the description text', () => {
    render(<FlashSale />);
    expect(screen.getByText(/Grab the best deals/i)).toBeInTheDocument();
  });

  it('renders the flash sale badge', () => {
    render(<FlashSale />);
    expect(screen.getByText(/Flash Sale Ending Soon/i)).toBeInTheDocument();
  });

  it('renders the shop the sale button', () => {
    render(<FlashSale />);
    const button = screen.getByRole('button', { name: /Shop the Sale/i });
    expect(button).toBeInTheDocument();
  });

  it('renders countdown timer values', () => {
    render(<FlashSale />);
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Mins')).toBeInTheDocument();
    expect(screen.getByText('Secs')).toBeInTheDocument();
  });
});
