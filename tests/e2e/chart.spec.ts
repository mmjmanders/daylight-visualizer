import { url } from '@nuxt/test-utils/e2e';
import { expect, test } from '@nuxt/test-utils/playwright';

test.describe.configure({ mode: 'parallel' });

test.describe('Chart', () => {
  test.beforeEach(async ({ goto }) => {
    await goto(url('/'), { waitUntil: 'hydration' });
  });

  test('should have submit button disabled', async ({ page }) => {
    const submitButton = page.locator('button[type=submit]');
    expect(await submitButton.isDisabled()).toBe(true);
  });

  test('should have submit button enabled on valid form', async ({ page }) => {
    await page.locator('#latitude').fill('51.0132');
    await page.locator('#longitude').fill('13.7384');
    await page.locator('#startDate').fill('2025-01-01');
    await page.locator('#endDate').fill('2025-01-27');
    const submitButton = page.locator('button[type=submit]');
    await page.waitForFunction(() =>
      !(document.querySelector('button[type=submit]') as HTMLButtonElement).disabled,
    );
    expect(await submitButton.isEnabled()).toBe(true);
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

  test('should have submit button disabled on invalid form', async ({ page }) => {
    await page.locator('#latitude').fill('51.0132');
    await page.locator('#longitude').fill('13.7384');
    await page.locator('#startDate').fill('2024-01-01');
    await page.locator('#endDate').fill('2025-01-27');
    const submitButton = page.locator('button[type=submit]');
    await page.waitForFunction(() =>
      (document.querySelector('button[type=submit]') as HTMLButtonElement).disabled,
    );
    expect(await submitButton.isDisabled()).toBe(true);
  });
});
