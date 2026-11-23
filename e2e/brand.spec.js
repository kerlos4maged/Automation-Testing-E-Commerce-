// @ts-check
import { expect, test } from '@playwright/test';
import { BrandPage } from '../pages/brandPage';

test.describe('Brand Functionality', () => {
    /** @type {BrandPage} */
    let brand;

    test.beforeEach(async ({ page }) => {
        brand = new BrandPage(page);

        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('TC19 - View & Cart Brand Products', async ({  }) => {

        // Steps 1-2 (launch, navigate) are done in beforeEach

        // 3. Click on 'Products' button
        await brand.clickOnProductsButton();
        await expect(brand.page).toHaveURL(/products/);

        // 4. Verify that Brands are visible on left side bar
        await expect(brand.brandsSidebar).toBeVisible();
        await expect(brand.brandLink('Polo')).toBeVisible();
        await expect(brand.brandLink('Madame')).toBeVisible();

        // 5. Click on any brand name
        await brand.clickBrand('Polo');

        // 6. Verify that user is navigated to brand page and brand products are displayed
        await expect(brand.page).toHaveURL(/brand_products\/Polo/);
        await expect(brand.pageTitle).toHaveText(/Brand - Polo Products/i);
        await expect(brand.brandProducts.first()).toBeVisible();

        // 7. On left side bar, click on any other brand link
        await brand.clickBrand('Madame');

        // 8. Verify that user is navigated to that brand page and can see products
        await expect(brand.page).toHaveURL(/brand_products\/Madame/);
        await expect(brand.pageTitle).toHaveText(/Brand - Madame Products/i);
        await expect(brand.brandProducts.first()).toBeVisible();
    });

});