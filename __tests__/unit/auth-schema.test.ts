import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
} from '@/app/(auth)/schema';

describe('Auth Schemas - Unit Tests', () => {
  it('should validate a correct login payload', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '123456',
    });
    expect(result.success).toBe(true);
  });

  it('should reject login with invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: '123456',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Enter a valid email');
    }
  });

  it('should reject login with short password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Minimum 6 characters');
    }
  });

  it('should validate a correct register payload', () => {
    const result = registerSchema.safeParse({
      name: 'Ram',
      email: 'ram@example.com',
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.success).toBe(true);
  });

  it('should reject register with short name', () => {
    const result = registerSchema.safeParse({
      name: 'A',
      email: 'ram@example.com',
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const nameError = result.error.issues.find((i) => i.path[0] === 'name');
      expect(nameError?.message).toBe('Enter your name');
    }
  });
});
