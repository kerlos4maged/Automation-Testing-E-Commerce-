const { test, expect } = require('../fixture');
import { CartPage } from '../pages/cartPage';
import { SearchPage } from '../pages/searchPage';
import { Login } from '../pages/loginPage'
import { invalidUser, validUser } from '../test-data/userData'

test.describe('Cart Functionality', () => {
    /** @type {CartPage} */
    let cart;

    /** @type {SearchPage} */
    let search;

    /** @type {Login} */
    let login;


    test.beforeEach(async ({ page }) => {
        cart = new CartPage(page);
        search = new SearchPage(page);
        login = new Login(page)

        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('TC11 - Verify Subscription in Cart page', async () => {
        // got to cart page first
        await cart.clickOnCartButton()
        await cart.gotToCart()

        await expect(cart.subscriptionText).toBeVisible()
        await expect(cart.subscriptionSuccess).toBeHidden()
        await cart.testSubscriptionField(invalidUser.email)
        await expect(cart.subscriptionSuccess).toBeVisible()
    })

    test('TC12 - Add Products in Cart', async ({ }) => {

        await cart.gotToProducts();

        await cart.addProductToCart('Blue Top');
        await cart.addProductToCart('Men Tshirt');

        await cart.clickOnCartButton();

        await expect(cart.cartRow(1)).toBeVisible();
        await expect(cart.cartRow(2)).toBeVisible();

        await expect(cart.cartPrice(1)).toHaveText('Rs. 500');
        await expect(cart.cartQuantity(1)).toHaveText('1');
        await expect(cart.cartTotalPrice(1)).toHaveText('Rs. 500');
    });

    test('TC13 - Verify Product quantity in cart', async ({ page }) => {
        const quantity = 4;

        // Steps 1-3 (launch, navigate, verify home page) are done in beforeEach

        // 4. Click 'View Product' for any product on home page
        await cart.clickViewProduct();

        // 5. Verify product detail is opened
        await expect(page).toHaveURL(/product_details\/\d+/);
        await expect(cart.productInformation).toBeVisible();
        const productId = cart.getProductIdFromUrl();

        // 6. Increase quantity to 4
        await cart.setQuantity(quantity);
        await expect(cart.quantityInput).toHaveValue(String(quantity));

        // 7. Click 'Add to cart' button
        await cart.addToCart();

        // 8. Click 'View Cart' button
        await cart.clickViewCart();

        // 9. Verify that product is displayed in cart page with exact quantity
        await expect(page).toHaveURL(/view_cart/);
        await expect(cart.cartRow(productId)).toBeVisible();
        await expect(cart.cartQuantity(productId)).toHaveText(String(quantity));
    });

    test('TC17 - Remove Products From Cart', async ({ }) => {

        // Steps 1-3 (launch, navigate, verify home page) are done in beforeEach

        // 4. Add products to cart
        await cart.gotToProducts();
        await cart.addProductToCart('Blue Top');
        await cart.addProductToCart('Men Tshirt');

        // 5. Click 'Cart' button
        await cart.clickOnCartButton();

        // 6. Verify that cart page is displayed
        await expect(cart.page).toHaveURL(/view_cart/);
        await expect(cart.cartInfo).toBeVisible();
        await expect(cart.cartRow(1)).toBeVisible();
        await expect(cart.cartRow(2)).toBeVisible();

        // 7. Click 'X' button corresponding to particular product
        await cart.removeProductFromCart(1);

        // 8. Verify that product is removed from the cart
        await expect(cart.cartRow(1)).toHaveCount(0);
        await expect(cart.cartRow(2)).toBeVisible();
    });

    test('TC20 - Search Products and Verify Cart After Login', async ({ }) => {
        const searchTerm = 'Top';

        // Steps 1-2 (launch, navigate) are done in beforeEach

        // 3. Click on 'Products' button
        await search.clickOnProductsButton();

        // 4. Verify user is navigated to ALL PRODUCTS page successfully
        await expect(search.page).toHaveURL(/products/);
        await expect(search.allProductsHeading).toBeVisible();

        // 5. Enter product name in search input and click search button
        await search.searchProduct(searchTerm);

        // 6. Verify 'SEARCHED PRODUCTS' is visible
        await expect(search.searchedProductsHeading).toBeVisible();

        // 7. Verify all the products related to search are visible
        await expect(search.resultCards.first()).toBeVisible();

        const productNames = await search.getResultNames();

        expect(productNames.length).toBeGreaterThan(0);

        // for (const name of productNames) {
        //     expect(name.toLowerCase()).toContain(searchTerm.toLowerCase());
        // }

        // 8. Add those products to cart
        for (const name of productNames) {
            await cart.addProductToCart(name);
        }

        // 9. Click 'Cart' button and verify that products are visible in cart
        await cart.clickOnCartButton();
        await expect(search.page).toHaveURL(/view_cart/);
        for (const name of productNames) {
            await expect(cart.cartProductName(name)).toBeVisible();
        }

        // 10. Click 'Signup / Login' button and submit login details
        await login.clickSignupLogin();
        await expect(login.loginHeading).toBeVisible();
        await login.login(validUser.email, validUser.password);
        await expect(search.page.getByText(/Logged in as/)).toBeVisible();

        // 11. Again, go to Cart page
        await cart.clickOnCartButton();
        await expect(search.page).toHaveURL(/view_cart/);

        // 12. Verify that those products are visible in cart after login as well
        for (const name of productNames) {
            await expect(cart.cartProductName(name)).toBeVisible();
        }
    });

    test('TC22 - Add to cart from Recommended items', async ({ }) => {

        // Steps 1-2 (launch, navigate) are done in beforeEach

        // 3. Scroll to bottom of page
        await cart.scrollToBottom();

        // 4. Verify 'RECOMMENDED ITEMS' are visible
        await expect(cart.recommendedItemsHeading).toBeVisible();
        await expect(cart.recommendedActiveCards.first()).toBeVisible();

        // 5. Click on 'Add To Cart' on Recommended product
        const productName = await cart.addRecommendedProductToCart();

        // 6. Click on 'View Cart' button
        await cart.clickViewCart();

        // 7. Verify that product is displayed in cart page
        await expect(cart.page).toHaveURL(/view_cart/);
        await expect(cart.cartProductName(productName)).toBeVisible();
    });

});