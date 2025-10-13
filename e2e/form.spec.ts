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
      language: 'en',
      message: 'Start date must be before (or equal to) end date',
      startDate: '2025-03',
      endDate: '2025-02',
    },
    {
      selector: '#endDate',
      language: 'en',
      message: 'Maximum range is one year',
      startDate: '2025-03',
      endDate: '2026-03',
    },
    {
      selector: '#startDate',
      language: 'nl',
      message: 'Startdatum moet liggen voor (of gelijk zijn aan) einddatum',
      startDate: '2025-03',
      endDate: '2025-02',
    },
    {
      selector: '#endDate',
      language: 'nl',
      message: 'Maximale periode is 1 jaar',
      startDate: '2025-03',
      endDate: '2026-03',
    },
    {
      selector: '#startDate',
      language: 'fr',
      message: 'Start date must be before (or equal to) end date',
      startDate: '2025-03',
      endDate: '2025-02',
    },
    {
      selector: '#endDate',
      language: 'fr',
      message: 'Maximum range is one year',
      startDate: '2025-03',
      endDate: '2026-03',
    },
  ].forEach(({ selector, language, message, startDate, endDate }) => {
    test(`expect ${selector} to be invalid with message '${message}' for language '${language}' when startDate is ${startDate} and endDate is ${endDate}`, async ({
      page,
    }) => {
      await page.goto(`/?lang=${language}`);
      await page.locator('#startDate').fill(startDate);
      await page.locator('#endDate').fill(endDate);
      await expect(page.locator(selector)).toHaveClass(/is-invalid/);
      await expect(page.locator(`${selector} + span.popover`)).toHaveText(message);
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
