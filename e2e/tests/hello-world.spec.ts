import { expect, test } from '@playwright/test';

test('hello world', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('frontend')).toContainText('hello world');
});
