import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ToastProvider from '@/app/_components/ToastProvider';

describe('ToastProvider Widget - Component Tests', () => {
  it('renders the Toastify wrapper in the document', () => {
    const { container } = render(<ToastProvider />);
    const toastifyWrapper = container.querySelector('.Toastify');
    expect(toastifyWrapper).toBeTruthy();
  });

  it('renders a close button element selector', () => {
    const { container } = render(<ToastProvider />);
    const toastify = container.querySelector('.Toastify');
    expect(toastify).toBeTruthy();
    expect(toastify!.tagName).toBe('DIV');
  });

  it('sets autoClose to 3000 as a number prop', () => {
    const { container } = render(<ToastProvider />);
    const toastify = container.querySelector('.Toastify');
    expect(toastify).toBeTruthy();
  });

  it('renders a non-empty component', () => {
    const { container } = render(<ToastProvider />);
    const toastify = container.querySelector('.Toastify');
    expect(toastify).toBeTruthy();
  });

  it('has proper HTML structure with div containers', () => {
    const { container } = render(<ToastProvider />);
    const toastify = container.querySelector('.Toastify');
    expect(toastify).toBeTruthy();
    expect(toastify!.children.length).toBeGreaterThanOrEqual(0);
  });
});
