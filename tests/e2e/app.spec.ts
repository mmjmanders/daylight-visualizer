import { url } from '@nuxt/test-utils/e2e';
import { expect, test } from '@nuxt/test-utils/playwright';

test.describe.configure({ mode: 'parallel' });

test.describe('App', () => {
  test.beforeEach(async ({ goto }) => {
    await goto(url('/'), { waitUntil: 'hydration' });
  });

  test('should render', async ({ page }) => {
    const text = await page.textContent('h1');
    expect(text).toContain('Daylight visualizer');
  });
});
