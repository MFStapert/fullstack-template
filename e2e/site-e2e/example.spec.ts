// note: if you don't import expect, IDE will use jest
import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4201/');

  await expect(page.getByTestId('hello-world')).toContainText('hello site');
});
