import { test, expect } from '@playwright/test';

test.describe('Login Page Widget Tests', () => {
  test('should load login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have email input field', async ({ page }) => {
    await page.goto('/login');
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('should have password input field', async ({ page }) => {
    await page.goto('/login');
    const passwordInput = page.locator('input[type="password"], input[name="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('should have login button', async ({ page }) => {
    await page.goto('/login');
    const loginButton = page.locator('button[type="submit"], button:has-text("Login")');
    await expect(loginButton).toBeVisible();
  });

  test('should have register link', async ({ page }) => {
    await page.goto('/login');
    const registerLink = page.locator('a[href*="register"]');
    await expect(registerLink).toBeVisible();
  });
});
