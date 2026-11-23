// @ts-check
import { expect, test } from '@playwright/test';
import { CategoryPage } from '../pages/categoryPage';

test.describe('Category Functionality', () => {
    /** @type {CategoryPage} */
    let category;

    test.beforeEach(async ({ page }) => {
        category = new CategoryPage(page);

        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('TC18 - View Category Products', async ({ }) => {

        // Steps 1-2 (launch, navigate) are done in beforeEach

        // 3. Verify that categories are visible on left side bar
        await expect(category.categoriesSidebar).toBeVisible();
        await expect(category.categoryLink('Women')).toBeVisible();
        await expect(category.categoryLink('Men')).toBeVisible();

        // 4. Click on 'Women' category
        await category.clickCategory('Women');

        // 5. Click on any category link under 'Women' category
        // ('Tops' is used so it matches the expected title in step 6)
        await category.clickSubCategory('Women', 'Tops');

        // 6. Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
        await expect(category.page).toHaveURL(/category_products\/\d+/);
        await expect(category.pageTitle).toHaveText(/Women - Tops Products/i);

        // 7. On left side bar, click on any sub-category link of 'Men' category
        await category.clickCategory('Men');
        await category.clickSubCategory('Men', 'Tshirts');

        // 8. Verify that user is navigated to that category page
        await expect(category.page).toHaveURL(/category_products\/\d+/);
        await expect(category.pageTitle).toHaveText(/Men - Tshirts Products/i);
    });

});