// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for CNCF License Exceptions - Blanket Exceptions page
 */

test.describe('Blanket Exceptions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/site/blanket-exceptions.html');
  });

  test('page loads successfully with title', async ({ page }) => {
    await expect(page).toHaveTitle('Blanket Exceptions - CNCF License Exceptions');
    await expect(page.locator('h1')).toHaveText('CNCF License Exceptions');
    await expect(page.locator('h2')).toHaveText('Blanket Exceptions');
  });

  test('page has description text', async ({ page }) => {
    await expect(page.locator('.page-description')).toContainText('pre-approved license exceptions');
  });

  test('navigation links are present and correct', async ({ page }) => {
    const navLinks = page.locator('.nav-links a');
    await expect(navLinks).toHaveCount(2);
    
    await expect(navLinks.nth(0)).toHaveText('Package Exceptions');
    await expect(navLinks.nth(1)).toHaveText('Blanket Exceptions');
    await expect(navLinks.nth(1)).toHaveClass(/active/);
  });

  test('can navigate to package exceptions page', async ({ page }) => {
    await page.click('a:has-text("Package Exceptions")');
    // Check for index.html or just /site/ path
    await expect(page).toHaveURL(/index\.html|\/site\/?$/);
  });

  test('blanket exception cards load', async ({ page }) => {
    // Wait a moment for JS to populate
    await page.waitForTimeout(1000);
    
    // Either cards are shown or no-results message
    const cards = page.locator('#blanket-cards .blanket-card');
    const noResults = page.locator('#no-results');
    
    const cardsCount = await cards.count();
    const noResultsVisible = await noResults.isVisible();
    
    // One or the other should be true
    expect(cardsCount > 0 || noResultsVisible).toBe(true);
  });

  test('footer displays metadata', async ({ page }) => {
    // Wait for data to load
    await page.waitForTimeout(1000);
    
    await expect(page.locator('#data-version')).not.toHaveText('-');
    await expect(page.locator('#last-updated')).not.toHaveText('-');
  });

  test('GitHub link is present in footer', async ({ page }) => {
    // Use footer-specific selector
    const githubLink = page.locator('.footer a[href*="github.com/cncf/foundation"]');
    await expect(githubLink).toBeVisible();
  });

  test('JSON download link is present', async ({ page }) => {
    const jsonLink = page.locator('a[download="cncf-license-exceptions.json"]');
    await expect(jsonLink).toBeVisible();
  });
});

test.describe('Navigation Between Pages', () => {
  test('can navigate from blanket page to main page', async ({ page }) => {
    // Start at blanket exceptions page (has nav)
    await page.goto('/site/blanket-exceptions.html');
    await expect(page.locator('.nav-links a.active')).toHaveText('Blanket Exceptions');
    
    // Navigate to package exceptions (main page)
    await page.click('a:has-text("Package Exceptions")');
    await expect(page).toHaveURL(/index\.html|\/site\/?$/);
    
    // Main page doesn't have nav since blanket exceptions are now in the main table
    await expect(page.locator('h1')).toHaveText('CNCF License Exceptions');
  });
});
