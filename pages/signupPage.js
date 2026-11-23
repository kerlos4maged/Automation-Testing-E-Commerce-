class Signup {
    constructor(page) {
        this.page = page;

        this.newUserHeading = page.getByRole('heading', { name: 'New User Signup!' });
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.emailInput = page.locator('//*[@id="form"]/div/div/div[3]/div/form/input[3]');
        this.signupButton = page.locator('//*[@id="form"]/div/div/div[3]/div/form/button')

        this.accountInfoHeading = page.locator('b:has-text("ENTER ACCOUNT INFORMATION")');
        this.titleMr = page.getByLabel('Mr.');
        this.titleMrs = page.getByLabel('Mrs.');
        this.passwordInput = page.getByLabel('Password *');
        this.daySelect = page.locator('#days');
        this.monthSelect = page.locator('#months');
        this.yearSelect = page.locator('#years');
        this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.offersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from our partners!' });

        this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
        this.companyInput = page.getByLabel('Company', { exact: true });
        this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.O. Box, Company name, etc.)' });
        this.address2Input = page.getByRole('textbox', { name: 'Address 2' })
        this.countrySelect = page.getByRole('combobox', { name: 'Country *' })
        this.stateInput = page.getByRole('textbox', { name: 'State *' });
        this.cityInput = page.getByRole('textbox', { name: 'City *' });
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });

        // Step 14-18
        this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');
        this.loggedInAs = page.getByText(/Logged in as/);
        this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
        this.accountDeletedHeading = page.locator('[data-qa="account-deleted"]');

        this.emailAlreadySignup = page.getByText('Email Address already exist!');
    }

    async clickSignupAndLogin() {
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    }

    async goToSignUpPage() {
        await this.page.goto('/signup', { waitUntil: 'domcontentloaded' });
    }

    // Step 6-7
    async startSignup(name, email) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }

    // Step 9-11
    async fillAccountInfo({ title = 'Mr', password, day, month, year }) {
        if (title === 'Mr') {
            await this.titleMr.check();
        } else {
            await this.titleMrs.check();
        }
        await this.passwordInput.fill(password);
        await this.daySelect.selectOption(day);
        await this.monthSelect.selectOption(month);
        await this.yearSelect.selectOption(year);
        await this.newsletterCheckbox.check();
        await this.offersCheckbox.check();
    }

    // Step 12-13
    async fillAddressInfo(data) {
        await this.firstNameInput.fill(data.firstName);
        await this.lastNameInput.fill(data.lastName);
        await this.companyInput.fill(data.company);
        await this.addressInput.fill(data.address);
        await this.address2Input.fill(data.address2);
        await this.countrySelect.selectOption(data.country);
        await this.stateInput.fill(data.state);
        await this.cityInput.fill(data.city);
        await this.zipcodeInput.fill(data.zipcode);
        await this.mobileInput.fill(data.mobile);
        await this.createAccountButton.click();
    }
}

module.exports = { Signup };