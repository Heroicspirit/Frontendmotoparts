import { describe, it, expect } from 'vitest';
import {
  registerSchema,
  resetPasswordSchema,
  forgetPasswordSchema,
} from '@/app/(auth)/schema';

describe('Auth Password Match - Unit Tests', () => {
  it('should reject register when passwords do not match', () => {
    const result = registerSchema.safeParse({
      name: 'Shyam',
      email: 'shyam@example.com',
      password: '123456',
      confirmPassword: '654321',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const mismatch = result.error.issues.find(
        (i) => i.path[0] === 'confirmPassword' && i.message === 'Passwords do not match'
      );
      expect(mismatch).toBeTruthy();
    }
  });

  it('should validate a correct reset password payload', () => {
    const result = resetPasswordSchema.safeParse({
      newPassword: '123456',
      confirmNewPassword: '123456',
    });
    expect(result.success).toBe(true);
  });

  it('should reject reset password when passwords do not match', () => {
    const result = resetPasswordSchema.safeParse({
      newPassword: '123456',
      confirmNewPassword: 'abcdef',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const mismatch = result.error.issues.find(
        (i) => i.path[0] === 'confirmNewPassword' && i.message === 'Passwords do not match'
      );
      expect(mismatch).toBeTruthy();
    }
  });

  it('should reject register when both passwords are short but matching', () => {
    const result = registerSchema.safeParse({
      name: 'Shyam',
      email: 'shyam@example.com',
      password: '123',
      confirmPassword: '123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.issues;
      expect(errors.some((e) => e.path[0] === 'password')).toBe(true);
    }
  });

  it('should validate a correct forget password email', () => {
    const result = forgetPasswordSchema.safeParse({
      email: 'user@example.com',
    });
    expect(result.success).toBe(true);
  });
});
