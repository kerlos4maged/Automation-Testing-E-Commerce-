
const { test, expect } = require('../fixture');
import { Home } from '../pages/homePage';
import { Login } from '../pages/loginPage';
import { invalidUser, validUser } from '../test-data/userData';

test.describe('Home functionality', () => {

    /**
     * @type {Login}
     */
    let login;

    /**
   * @type {Home}
   */
    let homepage;

    test.beforeEach(async ({ page }) => {
        login = new Login(page);
        homepage = new Home(page)
        await page.goto('/', { waitUntil: "domcontentloaded" })
        await expect(homepage.logoImage).toBeVisible()
    })

    test('TC04 - Logout', async () => {
        await login.clickSignupLogin()

        await login.goToLoginPage();

        await login.login(validUser.email, validUser.password);

        await expect(homepage.userNameAccount).toBeVisible();
        await homepage.logout()

        await expect(homepage.page).toHaveURL(/login/);
        await expect(login.loginHeading).toBeVisible();
    });


    test('TC07 - Verify Test Cases Page', async () => {
        await homepage.testCasesClick()

        await homepage.goToTestCases()

        await expect(homepage.testCasesExpectation).toBeVisible()
        await expect(homepage.page).toHaveURL('/test_cases')
    })

    test('TC10 - Verify Subscription in home page', async () => {
        // handle scroll to end page
        await homepage.page.evaluate(
            () => window.scrollTo(0, document.body.scrollHeight)
        );
        await expect(homepage.subscriptionText).toBeVisible()
        await expect(homepage.subscriptionSuccessResult).toBeHidden()
        await homepage.testSubscriptionField(invalidUser.email)
        await expect(homepage.subscriptionSuccessResult).toBeVisible()
    })
});