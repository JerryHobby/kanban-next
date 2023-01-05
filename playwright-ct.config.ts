import type { PlaywrightTestConfig } from '@playwright/experimental-ct-react';
import { devices } from '@playwright/experimental-ct-react';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    testDir: './',
    /* The base directory, relative to the config file, for snapshot files created with toMatchSnapshot and toHaveScreenshot. */
    snapshotDir: './__snapshots__',
    /* Maximum time one test can run for. */
    timeout: 10 * 1000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: process.env.CI ? 4 : 8,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html', { open: 'never' }], ['list']],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        /* Port to use for Playwright component endpoint. */
        ctPort: 3100,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            testMatch: /.*ct.(test|spec)\.(ts|tsx)/,
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'firefox',
            testMatch: /.*ct.(test|spec)\.(ts|tsx)/,
            use: {
                ...devices['Desktop Firefox'],
            },
        },
        {
            name: 'webkit',
            testMatch: /.*ct.(test|spec)\.(ts|tsx)/,
            use: {
                ...devices['Desktop Safari'],
            },
        },
    ],
};

export default config;