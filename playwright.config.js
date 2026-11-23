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
  timeout: 10 * 90 * 100,
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,
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

  expect: { timeout: 10_000 },


  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.Base_URL || 'http://localhost:3000',
    navigationTimeout: 45_000,
    actionTimeout: 15_000,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    // reporting
    screenshot: 'only-on-failure',          // attached automatically to failed tests
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
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

