import { describe, it, expect } from 'vitest';
import { API } from '@/lib/api/endpoints';

describe('API Endpoints - Unit Tests', () => {
  it('should build auth endpoint URLs correctly', () => {
    expect(API.AUTH.REGISTER).toBe('/api/auth/register');
    expect(API.AUTH.LOGIN).toBe('/api/auth/login');
    expect(API.AUTH.WHOAMI).toBe('/api/auth/whoami');
    expect(API.AUTH.REQUEST_PASSWORD_RESET).toBe('/api/auth/request-password-reset');
  });

  it('should build reset password URL with token', () => {
    const token = 'abc123token';
    const url = API.AUTH.RESET_PASSWORD(token);
    expect(url).toBe(`/api/auth/reset-password/${token}`);
  });

  it('should build product endpoint URLs correctly', () => {
    expect(API.PRODUCTS.GET_ALL).toBe('/api/products');
    expect(API.PRODUCTS.GET_FEATURED).toBe('/api/products/featured');
    expect(API.PRODUCTS.SEARCH).toBe('/api/products/search');
    expect(API.PRODUCTS.CREATE).toBe('/api/products');
  });

  it('should build product URLs with IDs and categories', () => {
    expect(API.PRODUCTS.GET_BY_ID('123')).toBe('/api/products/123');
    expect(API.PRODUCTS.UPDATE('456')).toBe('/api/products/456');
    expect(API.PRODUCTS.DELETE('789')).toBe('/api/products/789');
    expect(API.PRODUCTS.GET_BY_CATEGORY('engine')).toBe('/api/products/category/engine');
  });

  it('should build order and cart endpoint URLs correctly', () => {
    expect(API.ORDERS.CREATE).toBe('/api/orders');
    expect(API.ORDERS.GET_MY_ORDERS).toBe('/api/orders/my-orders');
    expect(API.ORDERS.GET_BY_ID('order1')).toBe('/api/orders/order1');
    expect(API.ORDERS.GET_BY_ORDER_NUMBER('ORD-001')).toBe('/api/orders/order-number/ORD-001');
    expect(API.ORDERS.UPDATE_STATUS('order1')).toBe('/api/orders/order1/status');
    expect(API.CART.GET).toBe('/api/cart');
    expect(API.CART.ADD).toBe('/api/cart/add');
    expect(API.CART.CLEAR).toBe('/api/cart/clear');
    expect(API.CART.UPDATE_ITEM('prod1')).toBe('/api/cart/item/prod1');
    expect(API.CART.REMOVE_ITEM('prod1')).toBe('/api/cart/item/prod1');
  });
});
