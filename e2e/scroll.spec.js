// @ts-check
import { expect, test } from '@playwright/test';
import { ScrollPage } from '../pages/scrollPage';

test.describe('Scroll Functionality', () => {
    /** @type {ScrollPage} */
    let scroll;

    // Steps 1-3: launch, navigate, verify home page is visible
    test.beforeEach(async ({ page }) => {
        scroll = new ScrollPage(page);

        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test("TC25 - Verify Scroll Up using 'Arrow' button and Scroll Down functionality", async () => {
        // 4. Scroll down page to bottom
        await scroll.scrollToBottom();

        // 5. Verify 'SUBSCRIPTION' is visible
        await expect(scroll.subscriptionHeading).toBeInViewport();

        // 6. Click on arrow at bottom right side to move upward
        await expect(scroll.scrollUpArrow).toBeVisible();
        await scroll.clickScrollUpArrow();

        // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
        await expect(scroll.heroText).toBeInViewport();
    });

    test("TC26 - Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async () => {
        // 4. Scroll down page to bottom
        await scroll.scrollToBottom();

        // 5. Verify 'SUBSCRIPTION' is visible
        await expect(scroll.subscriptionHeading).toBeInViewport();

        // 6. Scroll up page to top
        await scroll.scrollToTop();

        // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
        await expect(scroll.heroText).toBeInViewport();
    });

});