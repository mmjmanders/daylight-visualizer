import { expect, test } from '@playwright/test';

const buildSha = process.env.CI ? 'e2e' : 'dev';

test('header should contain "Daylight Visualizer"', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Daylight Visualizer');
});

test(`version should be "${buildSha}"`, async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1 > span')).toContainText(`- ${buildSha}`);
});

[
  {
    lang: 'nl',
    submitText: 'Verzenden',
  },
  {
    lang: 'en',
    submitText: 'Submit',
  },
  {
    lang: 'fr',
    submitText: 'Submit',
  },
].forEach(({ lang, submitText }) => {
  test(`language ${lang} should have ${submitText} as button text`, async ({ page }) => {
    await page.goto(`/?lang=${lang}`);
    await expect(page.locator('button[type=submit]')).toHaveText(submitText);
  });
});
