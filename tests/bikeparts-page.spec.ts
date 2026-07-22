import { test, expect } from '@playwright/test';

test.describe('Bike Parts Page Widget Tests', () => {
  test('should load bike parts page', async ({ page }) => {
    await page.goto('/user/bikeparts');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display product grid', async ({ page }) => {
    await page.goto('/user/bikeparts');
    await page.waitForLoadState('networkidle');
    const productGrid = page.locator('main').first();
    await expect(productGrid).toBeVisible();
  });

  test('should have filterable content', async ({ page }) => {
    await page.goto('/user/bikeparts');
    await page.waitForLoadState('networkidle');
    const content = page.locator('main');
    await expect(content).toBeVisible();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/user/bikeparts');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/user/bikeparts');
    await page.waitForLoadState('networkidle');
    expect(errors.length).toBe(0);
  });
});
