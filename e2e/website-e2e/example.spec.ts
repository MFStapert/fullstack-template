// note: if you don't import expect, IDE will use jest
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  await expect(page.getByTestId('hello-world')).toContainText("Hello world");
});

