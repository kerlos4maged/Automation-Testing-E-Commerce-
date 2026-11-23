const { test, expect } = require('../fixture');
import { Signup } from '../pages/signupPage';
import { accountInfo, addressInfo, generateUser } from '../test-data/signupData';
import { validUser } from '../test-data/userData';


test.describe('Signup Functionality', () => {


  /**
   * @type {Signup}
   */
  let signup;

  test.beforeEach(async ({ page }) => {
    signup = new Signup(page);

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveTitle(/Automation Exercise/);

    await signup.goToSignUpPage()

    await signup.clickSignupAndLogin()

    await expect(signup.newUserHeading).toBeVisible();

  })

  test('TC01 - Register User', async ({ }) => {
    const user = generateUser();

    await signup.startSignup(user.name, user.email);
    await expect(signup.accountInfoHeading).toBeVisible();

    await signup.fillAccountInfo({ ...accountInfo, password: user.password });
    await signup.fillAddressInfo(addressInfo);

    await expect(signup.accountCreatedHeading).toBeVisible();
    await signup.continueButton.click();

    await expect(signup.loggedInAs).toContainText(user.name);

    await signup.deleteAccountLink.click();

    await expect(signup.accountDeletedHeading).toBeVisible();

    await signup.continueButton.click();
  });

  test('TC05 - Register With existe email', async ({ }) => {
   
    await expect(signup.emailAlreadySignup).toBeHidden();

    await signup.startSignup(validUser.email, validUser.email);

    await expect(signup.emailAlreadySignup).toBeVisible();
  })
});