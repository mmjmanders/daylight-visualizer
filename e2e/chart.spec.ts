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

  test('should switch chart type and css class, but not on mobile', async ({ page }) => {
    await page.locator('button[type=button]').click();
    await page.locator('button[type=submit]').click();
    await page.locator('div.highcharts-container').waitFor();
    await expect(page.locator('div.chart-container.polar')).toBeVisible();
    const innerWidth = await page.evaluate(() => window.innerWidth);
    if (innerWidth < 992) {
      await expect(page.locator('#chartType')).toBeDisabled();
    } else {
      await page.locator('#chartType').selectOption('line');
      await expect(page.locator('div.chart-container.line')).toBeVisible();
    }
  });
});
