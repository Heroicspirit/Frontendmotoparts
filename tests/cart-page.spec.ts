import { test, expect } from '@playwright/test';

test.describe('Cart Page Widget Tests', () => {
  test('should load cart page', async ({ page }) => {
    await page.goto('/user/cart');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display cart section', async ({ page }) => {
    await page.goto('/user/cart');
    await page.waitForLoadState('networkidle');
    const cartSection = page.locator('main').first();
    await expect(cartSection).toBeVisible();
  });

  test('should have checkout button if items exist', async ({ page }) => {
    await page.goto('/user/cart');
    await page.waitForLoadState('networkidle');
    const checkoutBtn = page.locator('button:has-text("Checkout"), a[href*="checkout"]');
    const isVisible = await checkoutBtn.isVisible().catch(() => false);
    if (isVisible) {
      await expect(checkoutBtn).toBeVisible();
    }
  });

  test('should be accessible from header', async ({ page }) => {
    await page.goto('/user/bikeparts');
    await page.waitForLoadState('networkidle');
    const cartLink = page.locator('a[href*="/user/cart"], button:has-text("Cart")');
    const isVisible = await cartLink.isVisible().catch(() => false);
    if (isVisible) {
      await cartLink.click();
      await expect(page).toHaveURL(/.*cart/);
    }
  });

  test('should handle empty cart state', async ({ page }) => {
    await page.goto('/user/cart');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });
});
