import { url } from '@nuxt/test-utils/e2e';
import { expect, test } from '@nuxt/test-utils/playwright';

test.describe('App', () => {
  test.use({ locale: 'en' });

  test.beforeEach(async ({ goto }) => {
    await goto(url('/'), { waitUntil: 'hydration' });
  });

  test('should render', async ({ page }) => {
    const text = await page.textContent('h1');
    expect(text).toContain('Daylight visualizer');
  });
});

test.describe('App -> Locale set to nl', () => {
  test.use({ locale: 'nl' });

  test.beforeEach(async ({ goto }) => {
    await goto(url('/'), { waitUntil: 'hydration' });
  });

  test('Should display labels in Dutch', async ({ page }) => {
    expect(await page.textContent('label[for=latitude]')).toBe('Breedtegraad');
  });
});

test.describe('App -> Locale set to non-supported language', () => {
  test.use({ locale: 'fr' });

  test.beforeEach(async ({ goto }) => {
    await goto(url('/'), { waitUntil: 'hydration' });
  });

  test('Should display labels in English', async ({ page }) => {
    expect(await page.textContent('label[for=latitude]')).toBe('Latitude');
  });
});
