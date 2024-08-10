import { expect, test } from '@playwright/test';

test('posts overview', async ({ page }) => {
  await page.goto('/posts');

  await expect(page.getByTestId('posts')).toContainText('Post');
  await expect(page.getByTestId('posts')).toContainText('Paper');
  await expect(page.getByTestId('posts')).toContainText('Blog');
});

test('posts detail', async ({ page }) => {
  await page.goto('/posts');

  await page.getByTestId('post-1').getByText('1').click();
  await expect(page.getByTestId('post-title')).toContainText('Post');
  await expect(page.getByTestId('post-content')).toContainText('lorem ipsum');
});

test('posts create', async ({ page }) => {
  await page.goto('/posts');

  await page.getByTestId('post-create').click();
  await page.getByTestId('post-title').fill('new-title');
  await page.getByTestId('post-content').fill('new-content');
  await page.getByTestId('post-create-submit').click();

  await expect(page.getByTestId('posts')).toContainText('new-title');
});

test('posts update', async ({ page }) => {
  await page.goto('/posts');

  await page.getByTestId('post-2').getByTestId('post-update').click();
  await page.getByTestId('post-title').fill('updated-title');
  await page.getByTestId('post-content').fill('updated-content');
  await page.getByTestId('post-update-submit').click();

  await expect(page.getByTestId('post-title')).toContainText('updated-title');
  await expect(page.getByTestId('post-content')).toContainText('updated-content');
});

test('posts delete', async ({ page }) => {
  await page.goto('/posts');

  await page.getByTestId('post-3').getByTestId('post-delete').click();
  await expect(page.getByTestId('posts')).not.toContainText('Blog');
});
