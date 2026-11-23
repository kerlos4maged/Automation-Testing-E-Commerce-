// @ts-check
import { expect, test } from '@playwright/test';
import { Login } from '../pages/loginPage';
import { invalidUser, validUser } from '../test-data/userData';

test.describe('Login Functionality', () => {
  /**
   * @type {Login}
   */
  let login;

  // بيتنفذ قبل كل test: خطوات 2-5 المشتركة
  test.beforeEach(async ({ page }) => {
    login = new Login(page);

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Automation Exercise/);

    await login.goToLoginPage();

    await login.clickSignupLogin();

    await expect(login.loginHeading).toBeVisible();
  });

  test('TC02 - Login with correct email and password', async ({ page }) => {


    await login.login(validUser.email, validUser.password);

    await expect(page.getByText(/Logged in as/)).toBeVisible();

    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });

  test('TC03 - Login with incorrect email and password', async () => {
    await login.login(invalidUser.email, invalidUser.password);

    await expect(login.errorMessage).toBeVisible();
  });
});