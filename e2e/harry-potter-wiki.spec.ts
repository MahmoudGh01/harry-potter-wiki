import { test, expect } from '@playwright/test';

test.describe('Harry Potter Wiki - Essential E2E Tests', () => {
  test('should load homepage and display characters', async ({ page }) => {
    await page.goto('/');

    // Wait for the main content to load
    await expect(page.locator('#page_characters')).toBeVisible({
      timeout: 15000,
    });

    // Wait for character cards to load
    const characterCards = page.locator('[data-testid^="character-card-"]');
    await expect(characterCards.first()).toBeVisible({ timeout: 30000 });

    // Verify we have multiple characters
    const count = await characterCards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(12);
  });

  test('should search for characters', async ({ page }) => {
    await page.goto('/');

    // Wait for characters to load
    await expect(
      page.locator('[data-testid^="character-card-"]').first()
    ).toBeVisible({ timeout: 30000 });

    // Search for "Harry"
    const searchInput = page.getByPlaceholder(/search characters/i);
    await searchInput.fill('Harry');
    await page.waitForTimeout(1000);

    // Verify results are shown
    const resultsText = page.locator('text=/Found.*character/i');
    await expect(resultsText).toBeVisible();

    // Verify we still have some characters
    const characterCards = page.locator('[data-testid^="character-card-"]');
    const count = await characterCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show no results for invalid search', async ({ page }) => {
    await page.goto('/');

    // Wait for characters to load
    await expect(
      page.locator('[data-testid^="character-card-"]').first()
    ).toBeVisible({ timeout: 30000 });

    // Search for non-existent character
    const searchInput = page.getByPlaceholder(/search characters/i);
    await searchInput.fill('XYZNONEXISTENT123');
    await page.waitForTimeout(1000);

    // Verify no results message
    await expect(page.locator('text=/No Characters Found/i')).toBeVisible();
  });

  test('should filter characters by house', async ({ page }) => {
    await page.goto('/');

    // Wait for characters to load
    await expect(
      page.locator('[data-testid^="character-card-"]').first()
    ).toBeVisible({ timeout: 30000 });

    // Select a house filter (use lowercase value to match the option value)
    const houseSelect = page.locator('select').first();
    await houseSelect.selectOption('gryffindor');
    await page.waitForTimeout(1000);

    // Verify results are still shown
    const resultsText = page.locator('text=/Found.*character/i');
    await expect(resultsText).toBeVisible();
  });

  test('should navigate to character detail page', async ({ page }) => {
    await page.goto('/');

    // Wait for characters to load
    const firstCard = page.locator('[data-testid^="character-card-"]').first();
    await expect(firstCard).toBeVisible({ timeout: 30000 });

    // Get the character ID
    const testId = await firstCard.getAttribute('data-testid');
    testId?.split('-').pop();
    // Click the card
    await firstCard.click();
    await page.waitForTimeout(2000);

    // Verify navigation occurred (URL should change, or we should see detail content)
    const currentUrl = page.url();
    const hasNavigated =
      currentUrl.includes('/characters/') ||
      (await page.locator('text=/back to characters/i').isVisible());

    expect(hasNavigated).toBeTruthy();
  });

  test('should handle 404 for non-existent character', async ({ page }) => {
    await page.goto('/characters/99999');

    // Should show 404 or not found page - look for "Character Not Found" text
    const hasNotFound =
      (await page.locator('text=/Character Not Found/i').isVisible()) ||
      (await page.locator('text=/not found/i').isVisible());

    expect(hasNotFound).toBeTruthy();
  });

  test('should display pagination when available', async ({ page }) => {
    await page.goto('/');

    // Wait for characters to load
    await expect(
      page.locator('[data-testid^="character-card-"]').first()
    ).toBeVisible({ timeout: 30000 });

    // Check if pagination buttons exist (they may not if there aren't many characters)
    const nextButton = page.getByRole('button', { name: /next/i });
    const hasPagination = await nextButton.isVisible().catch(() => false);

    if (hasPagination) {
      // If pagination exists, verify we can click it
      await nextButton.click();
      await page.waitForTimeout(1000);

      // Verify characters are still visible after page change
      await expect(
        page.locator('[data-testid^="character-card-"]').first()
      ).toBeVisible();
    }
  });

  test('should display result count', async ({ page }) => {
    await page.goto('/');

    // Wait for characters to load
    await expect(
      page.locator('[data-testid^="character-card-"]').first()
    ).toBeVisible({ timeout: 30000 });

    // Verify result count is shown
    const resultsText = page.locator('text=/Found.*character/i');
    await expect(resultsText).toBeVisible();

    // Verify it contains a number
    const text = await resultsText.textContent();
    expect(text).toMatch(/\d+/);
  });
});
