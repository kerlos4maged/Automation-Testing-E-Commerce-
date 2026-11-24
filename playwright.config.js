// @ts-check
import { defineConfig, devices } from '@playwright/test';
const os = require('os');
require("dotenv").config();


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  timeout: 60000,
  expect: { timeout: 10000 },

  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright', {
      resultsDirectory: 'allure-results',
      detail: true,
      suppressReportDataWarnings: true,
      environmentInfo: {
        OS: os.platform(),
        Node: process.version,
        BaseURL: process.env.Base_URL,
      },
    }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */


  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.Base_URL || 'http://localhost:3000',
   

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    // reporting
    video: 'retain-on-failure',
    navigationTimeout: 60000,
    actionTimeout: 15000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: process.env.CI ? [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
    : [
      { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
      { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
      { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

