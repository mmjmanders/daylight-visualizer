import { expect, test } from '@playwright/test';

test.describe('Form', () => {
  test.use({
    permissions: ['geolocation'],
    geolocation: { latitude: 40.71427, longitude: -74.00597 },
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('expect location to be in New York', async ({ page }) => {
    await page.locator('button[type=button]').click();
    await expect(page.locator('#address')).toHaveValue(/.+/);
    expect(await page.locator('#address').inputValue()).toContain('New York');
    await expect(page.locator('button[type=submit]')).toBeEnabled();
  });

  [
    {
      selector: '#startDate',
      message: '',
      startDate: '2025-03-02',
      endDate: '2025-03-01',
    },
    {
      selector: '#endDate',
      message: '',
      startDate: '2025-03-02',
      endDate: '2025-03-10',
    },
    {
      selector: '#endDate',
      message: '',
      startDate: '2025-03-02',
      endDate: '2026-03-10',
    },
  ].forEach(({ selector, message, startDate, endDate }) => {
    test(`expect ${selector} to be invalid with message ${message} when startDate is ${startDate} and endDate is ${endDate}`, async ({
      page,
    }) => {
      await page.locator('#startDate').fill(startDate);
      await page.locator('#endDate').fill(endDate);
      await expect(page.locator(selector)).toHaveClass(/is-invalid/);
    });
  });

  test('expect submit button to be disabled on initial load', async ({ page }) => {
    await expect(page.locator('button[type=submit]')).toBeDisabled();
  });

  test('expect address to be invalid', async ({ page }) => {
    await page.locator('#address').fill('New York City');
    await page.locator('#address').fill('');
    await expect(page.locator('#address')).toHaveClass(/is-invalid/);
  });
});
