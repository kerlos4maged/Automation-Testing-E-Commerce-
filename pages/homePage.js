// pages/home.js
class Home {

    constructor(page) {
        this.page = page;
        // logout locators
        this.logoutButton = this.page.locator('//*[@id="header"]/div/div/div/div[2]/div/ul/li[4]/a');
        this.userNameAccount = this.page.locator('//*[@id="header"]/div/div/div/div[2]/div/ul/li[10]/a');

        // verify test cases locators
        this.testCasesLink = this.page.locator('//*[@id="header"]/div/div/div/div[2]/div/ul/li[5]')
        this.testCasesExpectation = this.page.locator('//*[@id="form"]/div/div[2]/h5/span')

        // main items in home page
        this.logoImage = this.page.locator('//*[@id="header"]/div/div/div/div[1]/div/a')

        // Subscription Data
        this.subscriptionText = this.page.locator('//*[@id="footer"]/div[1]/div/div/div[2]/div/h2')
        this.subscriptionEmail = this.page.locator('//*[@id="susbscribe_email"]')
        this.subscriptionButton = this.page.locator('//*[@id="subscribe"]')
        this.subscriptionSuccessResult = this.page.getByText('You have been successfully')

    }

    async logout() {
        await this.logoutButton.click()
    }

    async testCasesClick() {

        await this.testCasesLink.click()
    }

    async goToTestCases() {
        await this.page.goto('/test_cases', { waitUntil: 'domcontentloaded' })
    }

    async testSubscriptionField(emailTest) {
        await this.subscriptionEmail.fill(emailTest)
        await this.subscriptionButton.click()
    }
}

module.exports = { Home };