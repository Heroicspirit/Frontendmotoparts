import { test, expect } from '@playwright/test';

test.describe('Home Page Widget Tests', () => {
  test('should load home page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/MotoParts/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    const heroSection = page.locator('main').first();
    await expect(heroSection).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    const navLinks = page.locator('a[href]');
    const count = await navLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors.length).toBe(0);
  });
});
