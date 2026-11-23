class Login {
    constructor(page) {
        this.page = page;
        this.userNameLocator = page.locator('//*[@id="form"]/div/div/div[1]/div/form/input[2]');
        this.passwordLocator = page.locator('//*[@id="form"]/div/div/div[1]/div/form/input[3]');
        this.loginButton = page.locator('//*[@id="form"]/div/div/div[1]/div/form/button');
        this.errorMessage = page.getByText('Your email or password is incorrect!');
        this.loginHeading = page.locator('//*[@id="form"]/div/div/div[2]/h2');

    }

    async clickSignupLogin() {
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    }

    async goToLoginPage() {
        await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
    }

    async verifyLoginPage() {
        await expect(this.page.locator('//*[@id="form"]/div/div/div[2]/h2')).toBeVisible();

    }

    async login(userName, Password) {
        await this.userNameLocator.fill(userName)
        await this.passwordLocator.fill(Password)
        await this.loginButton.click()
    }

}

module.exports = { Login }
