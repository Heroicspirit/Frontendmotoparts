import { describe, it, expect } from 'vitest';

interface CartItem {
  price: number;
  originalPrice?: number;
  quantity: number;
}

describe('Cart Calculations - Unit Tests', () => {
  function calculateCartTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function calculateOriginalTotal(items: CartItem[]): number {
    return items.reduce((sum, item) => {
      const originalPrice = item.originalPrice || item.price;
      return sum + originalPrice * item.quantity;
    }, 0);
  }

  function calculateDiscount(items: CartItem[]): number {
    return calculateOriginalTotal(items) - calculateCartTotal(items);
  }

  it('should return 0 total for an empty cart', () => {
    const items: CartItem[] = [];
    expect(calculateCartTotal(items)).toBe(0);
    expect(calculateOriginalTotal(items)).toBe(0);
    expect(calculateDiscount(items)).toBe(0);
  });

  it('should calculate total for a single item', () => {
    const items: CartItem[] = [{ price: 100, quantity: 2 }];
    expect(calculateCartTotal(items)).toBe(200);
  });

  it('should calculate total for multiple items', () => {
    const items: CartItem[] = [
      { price: 50, quantity: 2 },
      { price: 30, quantity: 3 },
    ];
    expect(calculateCartTotal(items)).toBe(190);
    expect(calculateCartTotal(items)).toBe(50 * 2 + 30 * 3);
  });

  it('should calculate discount when originalPrice is set', () => {
    const items: CartItem[] = [
      { price: 80, originalPrice: 100, quantity: 1 },
      { price: 45, originalPrice: 50, quantity: 2 },
    ];
    expect(calculateOriginalTotal(items)).toBe(100 * 1 + 50 * 2);
    expect(calculateCartTotal(items)).toBe(80 * 1 + 45 * 2);
    expect(calculateDiscount(items)).toBe((100 + 100) - (80 + 90));
    expect(calculateDiscount(items)).toBe(30);
  });

  it('should show no discount when items have no originalPrice', () => {
    const items: CartItem[] = [
      { price: 100, quantity: 1 },
      { price: 200, quantity: 2 },
    ];
    expect(calculateOriginalTotal(items)).toBe(calculateCartTotal(items));
    expect(calculateDiscount(items)).toBe(0);
  });
});
