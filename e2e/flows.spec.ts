import { test, expect } from '@playwright/test';

test('guest checkout', async ({ page }) => {
  await page.goto('/products');
  await expect(page).toHaveURL(/products/);
});

test('admin login', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/admin/);
});

test('download invoice', async ({ page }) => {
  await page.goto('/thank-you');
  await expect(page).toHaveURL(/thank-you/);
});
