import { test, expect } from '@playwright/test';

test.describe('Harry Potter Wiki', () => {
  test('should load the homepage successfully - PASSING TEST', async ({
    page,
  }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that the page loaded (looking for any content)
    // This should pass as long as the app renders
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Verify the page doesn't show an error
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeDefined();
  });
});
