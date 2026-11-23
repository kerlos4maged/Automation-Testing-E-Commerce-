// @ts-check
import { expect, test } from '@playwright/test';
import { Home } from '../pages/homePage';
import { ProductsPage } from '../pages/productPage';
import { generateUser } from '../test-data/signupData';

test.describe('All Products Functionality', () => {
    /**
     * @type {ProductsPage}
     */
    let productPageInit;

    // Steps 1-3: launch, navigate, verify home page is visible
    test.beforeEach(async ({ page }) => {
        const home = new Home(page);
        productPageInit = new ProductsPage(page);

        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(home.logoImage).toBeVisible();
    });

    test('TC08 - Verify All products and Product details page', async ({ page }) => {
        // 4. Click on 'Products' button
        await productPageInit.clickOnProductsButton();

        // 5. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(page).toHaveURL(/products/);
        await expect(productPageInit.allProductsHeading).toBeVisible();

        // 6. Click on 'View Product' of the first product
        await productPageInit.clickViewProduct();

        // 7. Verify that detail page is opened and product details are visible
        await expect(page).toHaveURL(/product_details\/\d+/);
        await expect(productPageInit.productName).toBeVisible();
        await expect(productPageInit.productCategory).toBeVisible();
        await expect(productPageInit.productPrice).toBeVisible();
        await expect(productPageInit.productAvailability).toBeVisible();
        await expect(productPageInit.productCondition).toBeVisible();
        await expect(productPageInit.productBrand).toBeVisible();
    });

    test('TC09 - Search Product', async ({ page }) => {
        // 4. Click on 'Products' button
        await productPageInit.clickOnProductsButton();

        // 5. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(productPageInit.allProductsHeading).toBeVisible();

        // 6. Enter product name in search input and click search button
        await productPageInit.searchOnProducts('Men Tshirt');
        await expect(page).toHaveURL(/products\?search=Men(\+|%20)Tshirt/);

        // 7. Verify 'SEARCHED PRODUCTS' is visible and related products are displayed
        await expect(productPageInit.searchedProductsHeading).toBeVisible();
        await expect(productPageInit.searchResults.first()).toBeVisible();
    });

    test('TC21 - Add review on product', async ({ page }) => {
        const user = generateUser();

        // Steps 1-2 (launch, navigate) are done in beforeEach

        // 3. Click on 'Products' button
        await productPageInit.clickOnProductsButton();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(page).toHaveURL(/products/);
        await expect(productPageInit.allProductsHeading).toBeVisible();

        // 5. Click on 'View Product' button
        await productPageInit.clickViewProduct();
        await expect(page).toHaveURL(/product_details\/\d+/);

        // 6. Verify 'Write Your Review' is visible
        await expect(productPageInit.writeReviewHeading).toBeVisible();

        // 7. Enter name, email and review
        await productPageInit.fillReview({
            name: user.name,
            email: user.email,
            review: 'Great product, good quality and fast delivery.',
        });

        // 8. Click 'Submit' button
        await productPageInit.submitReview();

        // 9. Verify success message 'Thank you for your review.'
        await expect(productPageInit.successMessage).toBeVisible();
    });
});