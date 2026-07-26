import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '@/app/_components/ThemeToggle';

describe('ThemeToggle Widget - Component Tests', () => {
  it('renders the theme toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('has aria-label for accessibility', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
  });

  it('renders an SVG icon', () => {
    const { container } = render(<ThemeToggle />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('starts with system theme by default', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Theme: System');
  });

  it('updates data-theme on click', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    await user.click(button);
    const html = document.documentElement;
    expect(html.getAttribute('data-theme')).toBe('dark');
  });
});
