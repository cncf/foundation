// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * E2E tests for CNCF License Exceptions - Package Exceptions page
 */

// Helper to wait for data to load
async function waitForDataLoad(page) {
  // Wait for the results count to show actual data (not "Loading...")
  // Use a regex that matches either "X exceptions" or "X of Y exceptions"
  await expect(page.locator('#results-count')).toHaveText(/\d+ (of \d+ )?exceptions/, { timeout: 15000 });
}

test.describe('Package Exceptions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/site/index.html');
  });

  test('page loads successfully with title', async ({ page }) => {
    await expect(page).toHaveTitle('CNCF License Exceptions');
    await expect(page.locator('h1')).toHaveText('CNCF License Exceptions');
  });

  test('data loads and displays in table', async ({ page }) => {
    await waitForDataLoad(page);
    
    // Check that we have rows in the table
    const rows = page.locator('#exceptions-tbody tr');
    await expect(rows).not.toHaveCount(0);
    
    // Verify results count shows a number
    const resultsText = await page.locator('#results-count').textContent();
    expect(resultsText).toMatch(/\d+ exceptions/);
  });

  test('page has subtitle text', async ({ page }) => {
    // The page should have subtitle text about license exceptions
    await expect(page.locator('.subtitle')).toBeVisible();
    await expect(page.locator('.subtitle')).toContainText('Approved license exceptions');
  });

  test('blanket exceptions are shown in main table', async ({ page }) => {
    await waitForDataLoad(page);
    // Search for blanket exceptions (project = "All CNCF Projects")
    await page.selectOption('#project-filter', 'All CNCF Projects');
    await page.waitForTimeout(100);
    
    // Should find at least one blanket exception
    const rows = page.locator('#exceptions-tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/site/index.html');
    await waitForDataLoad(page);
  });

  test('search filters results', async ({ page }) => {
    // Type a search term
    await page.fill('#search', 'MIT');
    
    // Wait for debounce and filtering
    await page.waitForTimeout(400);
    
    // Check that results are filtered
    const filteredText = await page.locator('#results-count').textContent();
    expect(filteredText).toMatch(/\d+ of \d+ exceptions|\d+ exceptions/);
  });

  test('search with no results shows message', async ({ page }) => {
    await page.fill('#search', 'xyznonexistent123456789');
    await page.waitForTimeout(400);
    
    await expect(page.locator('#no-results')).toBeVisible();
    await expect(page.locator('#results-count')).toHaveText(/0 of \d+ exceptions/);
  });

  test('clear filters button resets search', async ({ page }) => {
    await page.fill('#search', 'MIT');
    await page.waitForTimeout(400);
    
    await page.click('#clear-filters');
    
    await expect(page.locator('#search')).toHaveValue('');
    const resultsText = await page.locator('#results-count').textContent();
    expect(resultsText).not.toMatch(/of/); // Should show total, not "X of Y"
  });
});

test.describe('Filter Dropdowns', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/site/index.html');
    await waitForDataLoad(page);
  });

  test('license filter has options populated', async ({ page }) => {
    const options = page.locator('#license-filter option');
    // Should have more than just "All Licenses"
    const count = await options.count();
    expect(count).toBeGreaterThan(1);
  });

  test('status filter works', async ({ page }) => {
    await page.selectOption('#status-filter', 'approved');
    
    // All visible rows should have "approved" status
    const statusBadges = page.locator('#exceptions-tbody .status-badge');
    const count = await statusBadges.count();
    
    if (count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) {
        await expect(statusBadges.nth(i)).toHaveText('approved');
      }
    }
  });

  test('year filter has options populated', async ({ page }) => {
    const options = page.locator('#year-filter option');
    const count = await options.count();
    expect(count).toBeGreaterThan(1);
  });

  test('multiple filters can be combined', async ({ page }) => {
    await page.selectOption('#status-filter', 'approved');
    await page.waitForTimeout(100);
    
    await page.fill('#search', 'MIT');
    await page.waitForTimeout(400);
    
    const afterBothText = await page.locator('#results-count').textContent();
    
    // Results should be filtered (might be same or different depending on data)
    expect(afterBothText).toMatch(/\d+/);
  });
});

test.describe('Column Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/site/index.html');
    await waitForDataLoad(page);
  });

  test('clicking package column header sorts by package', async ({ page }) => {
    const packageHeader = page.locator('th[data-sort="package"]');
    
    // Click to sort ascending
    await packageHeader.click();
    
    // Check sort indicator appears
    const indicator = packageHeader.locator('.sort-indicator');
    await expect(indicator).toHaveText(/[▲▼]/);
    
    // Header should have sorted class
    await expect(packageHeader).toHaveClass(/sorted/);
  });

  test('clicking same column toggles sort direction', async ({ page }) => {
    const packageHeader = page.locator('th[data-sort="package"]');
    
    // Click once for ascending
    await packageHeader.click();
    const firstIndicator = await packageHeader.locator('.sort-indicator').textContent();
    
    // Click again for descending
    await packageHeader.click();
    const secondIndicator = await packageHeader.locator('.sort-indicator').textContent();
    
    // Direction should change
    expect(firstIndicator).not.toEqual(secondIndicator);
  });

  test('sort dropdown stays in sync with column clicks', async ({ page }) => {
    const packageHeader = page.locator('th[data-sort="package"]');
    
    await packageHeader.click();
    
    // Dropdown should reflect the sort
    const sortValue = await page.locator('#sort-by').inputValue();
    expect(sortValue).toMatch(/package/);
  });

  test('date column is sorted descending by default', async ({ page }) => {
    const dateHeader = page.locator('th[data-sort="date"]');
    const indicator = dateHeader.locator('.sort-indicator');
    
    // Should show descending indicator (▼)
    await expect(indicator).toHaveText(/▼/);
  });
});

test.describe('Download Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/site/index.html');
    await waitForDataLoad(page);
  });

  test('CSV download button exists', async ({ page }) => {
    await expect(page.locator('#download-csv')).toBeVisible();
    await expect(page.locator('#download-csv')).toHaveText('Download CSV');
  });

  test('JSON download link exists', async ({ page }) => {
    const jsonLink = page.locator('a[download="cncf-license-exceptions.json"]');
    await expect(jsonLink).toBeVisible();
  });

  test('CSV download triggers file download', async ({ page }) => {
    // Listen for download event
    const downloadPromise = page.waitForEvent('download');
    
    await page.click('#download-csv');
    
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('cncf-license-exceptions.csv');
  });
});

test.describe('Footer Metadata', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/site/index.html');
    await waitForDataLoad(page);
  });

  test('displays data version', async ({ page }) => {
    const version = await page.locator('#data-version').textContent();
    expect(version).not.toBe('-');
    expect(version?.length).toBeGreaterThan(0);
  });

  test('displays last updated date', async ({ page }) => {
    const lastUpdated = await page.locator('#last-updated').textContent();
    expect(lastUpdated).not.toBe('-');
    expect(lastUpdated).toMatch(/\d{4}-\d{2}-\d{2}/); // YYYY-MM-DD format
  });

  test('GitHub link is present', async ({ page }) => {
    // Use footer-specific selector to avoid matching multiple GitHub links
    const githubLink = page.locator('.footer a[href*="github.com/cncf/foundation"]');
    await expect(githubLink).toBeVisible();
  });
});
