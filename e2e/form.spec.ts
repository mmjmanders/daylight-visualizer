import { expect, test } from '@playwright/test';

test.use({
  permissions: ['geolocation'],
  geolocation: { latitude: 40.71427, longitude: -74.00597 },
});

test('expect location to be in New York', async ({ page }) => {
  await page.goto('/');
  await page.locator('button[type=button]').click();
  await expect(page.locator('#address')).toHaveValue(/.+/);
  expect(await page.locator('#address').inputValue()).toContain('New York');
  await expect(page.locator('button[type=submit]')).toBeEnabled();
});

test('expect startDate to be invalid', async ({ page }) => {
  await page.goto('/');
  await page.locator('#endDate').fill('2025-03-01');
  await page.locator('#startDate').fill('2025-03-02');
  await expect(page.locator('#startDate')).toHaveClass(/is-invalid/);
});

test('expect endDate to be invalid due to too small range', async ({ page }) => {
  await page.goto('/');
  await page.locator('#startDate').fill('2025-03-02');
  await page.locator('#endDate').fill('2025-03-10');
  await expect(page.locator('#endDate')).toHaveClass(/is-invalid/);
});

test('expect endDate to be invalid due to too large range', async ({ page }) => {
  await page.goto('/');
  await page.locator('#startDate').fill('2025-03-02');
  await page.locator('#endDate').fill('2026-03-10');
  await expect(page.locator('#endDate')).toHaveClass(/is-invalid/);
});

test('expect submit button to be disabled on initial load', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('button[type=submit]')).toBeDisabled();
});

test('expect address to be invalid', async ({ page }) => {
  await page.goto('/');
  await page.locator('#address').fill('New York City');
  await page.locator('#address').fill('');
  await expect(page.locator('#address')).toHaveClass(/is-invalid/);
});
