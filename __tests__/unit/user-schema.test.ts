import { describe, it, expect } from 'vitest';
import { updateUserSchema } from '@/app/user/schema';

describe('User Schema - Unit Tests', () => {
  it('should validate a correct profile update without a file', () => {
    const result = updateUserSchema.safeParse({
      firstName: 'Ram',
      lastName: 'Doe',
      email: 'ram@example.com',
      username: 'ram',
    });
    expect(result.success).toBe(true);
  });

  it('should reject profile with short first name', () => {
    const result = updateUserSchema.safeParse({
      firstName: 'J',
      lastName: 'Doe',
      email: 'ram@example.com',
      username: 'ram',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const firstNameError = result.error.issues.find((i) => i.path[0] === 'firstName');
      expect(firstNameError?.message).toBe('Minimum 2 characters');
    }
  });

  it('should reject profile with short last name', () => {
    const result = updateUserSchema.safeParse({
      firstName: 'Ram',
      lastName: 'D',
      email: 'ram@example.com',
      username: 'ram',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const lastNameError = result.error.issues.find((i) => i.path[0] === 'lastName');
      expect(lastNameError?.message).toBe('Minimum 2 characters');
    }
  });

  it('should reject profile with short username', () => {
    const result = updateUserSchema.safeParse({
      firstName: 'Shyam',
      lastName: 'Doe',
      email: 'shyam@example.com',
      username: 'jo',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const usernameError = result.error.issues.find((i) => i.path[0] === 'username');
      expect(usernameError?.message).toBe('Minimum 3 characters');
    }
  });

  it('should validate when profilePicture is undefined', () => {
    const result = updateUserSchema.safeParse({
      firstName: 'Robot',
      lastName: 'Doe',
      email: 'robot@example.com',
      username: 'robot',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.profilePicture).toBeUndefined();
    }
  });
});
