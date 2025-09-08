import { test, expect } from '@playwright/test';

// Placeholder end-to-end tests are skipped in production builds.
test.skip('guest checkout', async ({ page }) => {
  await page.goto('/products');
  await expect(page).toHaveURL(/products/);
});

test.skip('admin login', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/admin/);
});

test.skip('download invoice', async ({ page }) => {
  await page.goto('/thank-you');
  await expect(page).toHaveURL(/thank-you/);
});
