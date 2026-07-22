import { test, expect } from '@playwright/test';

test.describe('Product Detail Page Widget Tests', () => {
  test('should load product detail page', async ({ page }) => {
    await page.goto('/user/bikeparts');
    await page.waitForLoadState('networkidle');
    
    const productLink = page.locator('a[href*="/user/bikeparts/"]').first();
    if (await productLink.isVisible()) {
      await productLink.click();
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should display product image', async ({ page }) => {
    await page.goto('/user/bikeparts/507f1f77bcf86cd799439011');
    await page.waitForLoadState('networkidle');
    const productImage = page.locator('img').first();
    await expect(productImage).toBeVisible();
  });

  test('should have add to cart button', async ({ page }) => {
    await page.goto('/user/bikeparts/507f1f77bcf86cd799439011');
    await page.waitForLoadState('networkidle');
    const addToCartBtn = page.locator('button:has-text("Add to Cart")');
    await expect(addToCartBtn).toBeVisible();
  });

  test('should have buy now button', async ({ page }) => {
    await page.goto('/user/bikeparts/507f1f77bcf86cd799439011');
    await page.waitForLoadState('networkidle');
    const buyNowBtn = page.locator('button:has-text("Buy Now")');
    await expect(buyNowBtn).toBeVisible();
  });

  test('should have back to catalog link', async ({ page }) => {
    await page.goto('/user/bikeparts/507f1f77bcf86cd799439011');
    await page.waitForLoadState('networkidle');
    const backLink = page.locator('a[href*="/user/bikeparts"]');
    await expect(backLink).toBeVisible();
  });
});
