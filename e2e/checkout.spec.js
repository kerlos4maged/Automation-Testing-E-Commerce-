// @ts-check
import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { Signup } from '../pages/signupPage';
import { accountInfo, addressInfo, generateUser } from '../test-data/signupData';
import { cardData } from '../test-data/cardData'
import { Login } from '../pages/loginPage';



test.describe('Checkout Functionality', () => {
    /** @type {CartPage} */
    let cart;

    /** @type {CheckoutPage} */
    let checkout;

    /** @type {Signup} */
    let signup;

    /** @type {Login} */
    let login;

    let card = cardData

    test.beforeEach(async ({ page }) => {
        cart = new CartPage(page);
        checkout = new CheckoutPage(page);
        signup = new Signup(page);
        login = new Login(page)

        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/Automation Exercise/);
    });

    test('TC14 - Place Order: Register while Checkout', async ({ }) => {
        const user = generateUser();

        // Steps 1-3 (launch, navigate, verify home page) are done in beforeEach

        // 4. Add products to cart
        await cart.gotToProducts();
        await cart.addProductToCart('Blue Top');

        // 5. Click 'Cart' button
        await cart.clickOnCartButton();

        // 6. Verify that cart page is displayed
        await expect(checkout.page).toHaveURL(/view_cart/);
        await expect(checkout.cartInfo).toBeVisible();

        // 7. Click Proceed To Checkout
        await checkout.clickProceedToCheckout();

        // 8. Click 'Register / Login' button
        await checkout.clickRegisterLogin();
        await expect(signup.newUserHeading).toBeVisible();

        // 9. Fill all details in Signup and create account
        await signup.startSignup(user.name, user.email);
        await expect(signup.accountInfoHeading).toBeVisible();
        await signup.fillAccountInfo({ ...accountInfo, password: user.password });
        await signup.fillAddressInfo(addressInfo);

        // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await expect(signup.accountCreatedHeading).toBeVisible();
        await signup.continueButton.click();

        // 11. Verify 'Logged in as username' at top
        await expect(signup.loggedInAs).toContainText(user.name);

        // 12. Click 'Cart' button
        await cart.clickOnCartButton();

        // 13. Click 'Proceed To Checkout' button
        await checkout.clickProceedToCheckout();

        // 14. Verify Address Details and Review Your Order
        await expect(checkout.page).toHaveURL(/checkout/);
        await expect(checkout.addressDelivery).toContainText(addressInfo.address);
        await expect(checkout.addressInvoice).toContainText(addressInfo.address);
        await expect(checkout.reviewOrder).toBeVisible();

        // 15. Enter description in comment text area and click 'Place Order'
        await checkout.placeOrder('Please deliver between 9 AM and 5 PM');

        // 16. Enter payment details
        await expect(checkout.page).toHaveURL(/payment/);
        await checkout.fillPaymentDetails(card);

        // 17. Click 'Pay and Confirm Order' button
        await checkout.payAndConfirm();

        // 18. Verify success message
        // (the "Your order has been placed successfully!" alert disappears
        // right after submit, so we assert the stable confirmation page)
        await expect(checkout.page).toHaveURL(/payment_done/);
        await expect(checkout.orderPlaced).toBeVisible();
        await expect(checkout.orderConfirmedText).toBeVisible();

        // 19. Click 'Delete Account' button
        await signup.deleteAccountLink.click();

        // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(signup.accountDeletedHeading).toBeVisible();
        await signup.continueButton.click();
    });

    test('TC15 - Place Order: Register before Checkout', async ({ }) => {
        const user = generateUser();

        // Steps 1-3 (launch, navigate, verify home page) are done in beforeEach

        // 4. Click 'Signup / Login' button
        await signup.clickSignupAndLogin();
        await expect(signup.newUserHeading).toBeVisible();

        // 5. Fill all details in Signup and create account
        await signup.startSignup(user.name, user.email);
        await expect(signup.accountInfoHeading).toBeVisible();
        await signup.fillAccountInfo({ ...accountInfo, password: user.password });
        await signup.fillAddressInfo(addressInfo);

        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await expect(signup.accountCreatedHeading).toBeVisible();
        await signup.continueButton.click();

        // 7. Verify 'Logged in as username' at top
        await expect(signup.loggedInAs).toContainText(user.name);

        // 8. Add products to cart
        await cart.gotToProducts();
        await cart.addProductToCart('Blue Top');

        // 9. Click 'Cart' button
        await cart.clickOnCartButton();

        // 10. Verify that cart page is displayed
        await expect(checkout.page).toHaveURL(/view_cart/);
        await expect(checkout.cartInfo).toBeVisible();

        // 11. Click Proceed To Checkout
        await checkout.clickProceedToCheckout();

        // 12. Verify Address Details and Review Your Order
        await expect(checkout.page).toHaveURL(/checkout/);
        await expect(checkout.addressDelivery).toContainText(addressInfo.address);
        await expect(checkout.addressInvoice).toContainText(addressInfo.address);
        await expect(checkout.reviewOrder).toBeVisible();

        // 13. Enter description in comment text area and click 'Place Order'
        await checkout.placeOrder('Please deliver between 9 AM and 5 PM');

        // 14. Enter payment details
        await expect(checkout.page).toHaveURL(/payment/);
        await checkout.fillPaymentDetails(card);

        // 15. Click 'Pay and Confirm Order' button
        await checkout.payAndConfirm();

        // 16. Verify success message
        await expect(checkout.page).toHaveURL(/payment_done/);
        await expect(checkout.orderPlaced).toBeVisible();
        await expect(checkout.orderConfirmedText).toBeVisible();

        // 17. Click 'Delete Account' button
        await signup.deleteAccountLink.click();

        // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(signup.accountDeletedHeading).toBeVisible();
        await signup.continueButton.click();
    });

    test('TC16 - Place Order: Login before Checkout', async ({ }) => {
        const user = generateUser();

        // Precondition (not part of the test steps): create a dedicated account
        // and log out, so deleting it in step 16 doesn't remove the shared validUser.
        await signup.goToSignUpPage();
        await signup.startSignup(user.name, user.email);
        await signup.fillAccountInfo({ ...accountInfo, password: user.password });
        await signup.fillAddressInfo(addressInfo);
        await expect(signup.accountCreatedHeading).toBeVisible();
        await signup.continueButton.click();
        await signup.page.getByRole('link', { name: 'Logout' }).click();
        await signup.page.goto('/', { waitUntil: 'domcontentloaded' });

        // Steps 1-3 (launch, navigate, verify home page) are done in beforeEach

        // 4. Click 'Signup / Login' button
        await login.clickSignupLogin();
        await expect(login.loginHeading).toBeVisible();

        // 5. Fill email, password and click 'Login' button
        await login.login(user.email, user.password);

        // 6. Verify 'Logged in as username' at top
        await expect(signup.loggedInAs).toContainText(user.name);

        // 7. Add products to cart
        await cart.gotToProducts();
        await cart.addProductToCart('Blue Top');

        // 8. Click 'Cart' button
        await cart.clickOnCartButton();

        // 9. Verify that cart page is displayed
        await expect(checkout.page).toHaveURL(/view_cart/);
        await expect(checkout.cartInfo).toBeVisible();

        // 10. Click Proceed To Checkout
        await checkout.clickProceedToCheckout();

        // 11. Verify Address Details and Review Your Order
        await expect(checkout.page).toHaveURL(/checkout/);
        await expect(checkout.addressDelivery).toContainText(addressInfo.address);
        await expect(checkout.addressInvoice).toContainText(addressInfo.address);
        await expect(checkout.reviewOrder).toBeVisible();

        // 12. Enter description in comment text area and click 'Place Order'
        await checkout.placeOrder('Please deliver between 9 AM and 5 PM');

        // 13. Enter payment details
        await expect(checkout.page).toHaveURL(/payment/);
        await checkout.fillPaymentDetails(card);

        // 14. Click 'Pay and Confirm Order' button
        await checkout.payAndConfirm();

        // 15. Verify success message
        await expect(checkout.page).toHaveURL(/payment_done/);
        await expect(checkout.orderPlaced).toBeVisible();
        await expect(checkout.orderConfirmedText).toBeVisible();

        // 16. Click 'Delete Account' button
        await signup.deleteAccountLink.click();

        // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(signup.accountDeletedHeading).toBeVisible();
        await signup.continueButton.click();
    });

    test('TC23 - Verify address details in checkout page', async ({ }) => {
        const user = generateUser();

        // Steps 1-3 (launch, navigate, verify home page) are done in beforeEach

        // 4. Click 'Signup / Login' button
        await signup.clickSignupAndLogin();
        await expect(signup.newUserHeading).toBeVisible();

        // 5. Fill all details in Signup and create account
        await signup.startSignup(user.name, user.email);
        await expect(signup.accountInfoHeading).toBeVisible();
        await signup.fillAccountInfo({ ...accountInfo, password: user.password });
        await signup.fillAddressInfo(addressInfo);

        // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await expect(signup.accountCreatedHeading).toBeVisible();
        await signup.continueButton.click();

        // 7. Verify 'Logged in as username' at top
        await expect(signup.loggedInAs).toContainText(user.name);

        // 8. Add products to cart
        await cart.gotToProducts();
        await cart.addProductToCart('Blue Top');

        // 9. Click 'Cart' button
        await cart.clickOnCartButton();

        // 10. Verify that cart page is displayed
        await expect(cart.page).toHaveURL(/view_cart/);
        await expect(checkout.cartInfo).toBeVisible();

        // 11. Click Proceed To Checkout
        await checkout.clickProceedToCheckout();
        await expect(checkout.page).toHaveURL(/checkout/);

        // 12-13. Verify delivery and billing address are the same as the registration address
        const registeredAddress = [
            `${addressInfo.firstName} ${addressInfo.lastName}`,
            addressInfo.company,
            addressInfo.address,
            addressInfo.address2,
            addressInfo.city,
            addressInfo.state,
            addressInfo.zipcode,
            addressInfo.country,
            addressInfo.mobile,
        ];

        for (const detail of registeredAddress) {
            await expect(checkout.addressDelivery).toContainText(detail);
            await expect(checkout.addressInvoice).toContainText(detail);
        }

        // 14. Click 'Delete Account' button
        await signup.deleteAccountLink.click();

        // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(signup.accountDeletedHeading).toBeVisible();
        await signup.continueButton.click();
    });

    test('TC24 - Download Invoice after purchase order', async ({ }) => {
        const user = generateUser();

        // Steps 1-3 (launch, navigate, verify home page) are done in beforeEach

        // 4. Add products to cart
        await cart.gotToProducts();
        await cart.addProductToCart('Blue Top');

        // 5. Click 'Cart' button
        await cart.clickOnCartButton();

        // 6. Verify that cart page is displayed
        await expect(cart.page).toHaveURL(/view_cart/);
        await expect(checkout.cartInfo).toBeVisible();

        // 7. Click Proceed To Checkout
        await checkout.clickProceedToCheckout();

        // 8. Click 'Register / Login' button
        await checkout.clickRegisterLogin();
        await expect(signup.newUserHeading).toBeVisible();

        // 9. Fill all details in Signup and create account
        await signup.startSignup(user.name, user.email);
        await expect(signup.accountInfoHeading).toBeVisible();
        await signup.fillAccountInfo({ ...accountInfo, password: user.password });
        await signup.fillAddressInfo(addressInfo);

        // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        await expect(signup.accountCreatedHeading).toBeVisible();
        await signup.continueButton.click();

        // 11. Verify 'Logged in as username' at top
        await expect(signup.loggedInAs).toContainText(user.name);

        // 12. Click 'Cart' button
        await cart.clickOnCartButton();

        // 13. Click 'Proceed To Checkout' button
        await checkout.clickProceedToCheckout();

        // 14. Verify Address Details and Review Your Order
        await expect(checkout.page).toHaveURL(/checkout/);
        await expect(checkout.addressDelivery).toContainText(addressInfo.address);
        await expect(checkout.addressInvoice).toContainText(addressInfo.address);
        await expect(checkout.reviewOrder).toBeVisible();

        // 15. Enter description in comment text area and click 'Place Order'
        await checkout.placeOrder('Please deliver between 9 AM and 5 PM');

        // 16. Enter payment details
        await expect(checkout.page).toHaveURL(/payment/);
        await checkout.fillPaymentDetails(card);

        // 17. Click 'Pay and Confirm Order' button
        await checkout.payAndConfirm();

        // 18. Verify success message
        await expect(checkout.page).toHaveURL(/payment_done/);
        await expect(checkout.orderPlaced).toBeVisible();
        await expect(checkout.orderConfirmedText).toBeVisible();

        // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully
        const download = await checkout.downloadInvoice();
        expect(download.suggestedFilename()).toMatch(/invoice/i);
        expect(await download.failure()).toBeNull();

        // 20. Click 'Continue' button
        await signup.continueButton.click();

        // 21. Click 'Delete Account' button
        await signup.deleteAccountLink.click();

        // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
        await expect(signup.accountDeletedHeading).toBeVisible();
        await signup.continueButton.click();
    });
});