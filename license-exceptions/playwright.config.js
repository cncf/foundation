// @ts-check
const { defineConfig } = require('@playwright/test');

/**
 * Playwright configuration for CNCF License Exceptions E2E tests
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  // Run tests in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI for stability
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: process.env.CI ? 'github' : 'list',
  
  // Shared settings for all projects
  use: {
    // Base URL for the static site
    baseURL: 'http://localhost:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Take screenshot on failure
    screenshot: 'only-on-failure',
  },

  // Configure projects for Chromium only (lightweight for CI)
  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
      },
    },
  ],

  // Run local dev server before starting tests
  // Use python http.server which doesn't rewrite URLs
  webServer: {
    command: 'python3 -m http.server 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
