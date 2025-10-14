import { test, expect } from '@playwright/test';

test.describe('Chart', () => {
  test.use({
    permissions: ['geolocation'],
    geolocation: { latitude: 40.71427, longitude: -74.00597 },
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('show chart on valid data', async ({ page }) => {
    await page.locator('button[type=button]').click();
    await page.locator('button[type=submit]').click();
    await page.locator('div.highcharts-container').waitFor();
    await expect(page.locator('div.highcharts-container')).toBeVisible();
  });

  // [
  //   {
  //     colorScheme: 'light',
  //     chartColor: 'rgb(254, 246, 60)',
  //     backgroundColor: 'rgb(255, 255, 255)',
  //   },
  //   {
  //     colorScheme: 'dark',
  //     chartColor: 'rgb(124, 117, 0)',
  //     backgroundColor: 'rgb(33, 37, 41)',
  //   },
  // ].forEach(({ colorScheme, chartColor, backgroundColor }) => {
  //   test(`should have correct colors for colorScheme ${colorScheme}`, async ({ page }) => {
  //     await page.emulateMedia({ colorScheme: colorScheme as 'light' | 'dark' });
  //     await page.locator('button[type=button]').click();
  //     await page.locator('button[type=submit]').click();
  //     await page.locator('.highcharts-series.highcharts-series-0').waitFor();
  //     await expect(page.locator('body')).toHaveCSS('background-color', backgroundColor);
  //     await expect(page.locator('.highcharts-series.highcharts-series-0')).toHaveCSS(
  //       'fill',
  //       chartColor,
  //     );
  //   });
  // });
});
