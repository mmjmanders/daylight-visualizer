import { url } from '@nuxt/test-utils/e2e';
import { expect, test } from '@nuxt/test-utils/playwright';

test.describe('Chart', () => {
  test.beforeEach(async ({ goto }) => {
    await goto(url('/'), { waitUntil: 'hydration' });
  });

  test('should have submit button disabled', async ({ page }) => {
    const submitButton = page.locator('button[type=submit]');
    expect(await submitButton.isDisabled()).toBe(true);
  });

  [{
    latitude: '51.0132',
    longitude: '13.7384',
    startDate: '2025-01-01',
    endDate: '2025-01-27',
    submitEnabled: true,
  }, {
    latitude: '51.0132',
    longitude: '13.7384',
    startDate: '2024-01-01',
    endDate: '2025-01-27',
    submitEnabled: false,
  }].forEach(({ latitude, longitude, startDate, endDate, submitEnabled }) => {
    test(`should have submit button ${submitEnabled ? 'en' : 'dis'}abled for input values latitude: ${latitude}, longitude: ${longitude}, startDate: ${startDate}, endDate: ${endDate} `, async ({ page }) => {
      await page.locator('#latitude').fill(latitude);
      await page.locator('#longitude').fill(longitude);
      await page.locator('#startDate').fill(startDate);
      await page.locator('#endDate').fill(endDate);
      const submitButton = page.locator('button[type=submit]');
      await page.waitForFunction(
        (expectedState: boolean) =>
          (document.querySelector('button[type=submit]') as HTMLButtonElement).disabled === expectedState, !submitEnabled,
      );
      expect(await submitButton.isEnabled()).toBe(submitEnabled);
    });
  });

  test('should show chart on valid data', async ({ page }) => {
    await page.locator('#latitude').fill('51.0132');
    await page.locator('#longitude').fill('13.7384');
    await page.locator('#startDate').fill('2025-01-01');
    await page.locator('#endDate').fill('2025-01-27');
    const submitButton = page.locator('button[type=submit]');
    await page.waitForFunction(() =>
      !(document.querySelector('button[type=submit]') as HTMLButtonElement).disabled,
    );
    await submitButton.click();
    await page.waitForFunction(() =>
      document.querySelectorAll('.highcharts-series').length === 4,
    );
    expect(page.locator('div.highcharts-light')).toBeDefined();
  });

  test('should fill data with geolocation api', async ({ page }) => {
    await page.locator('button[type=button]').click();
    await page.waitForFunction(() =>
      !(document.querySelector('button[type=submit]') as HTMLButtonElement).disabled,
    );
    expect(await page.locator('#latitude').inputValue()).toBe('41.889938');
    expect(await page.locator('#longitude').inputValue()).toBe('12.492507');
  });
});
