class ScrollPage {
    constructor(page) {
        this.page = page;

        this.subscriptionHeading = page.getByRole('heading', { name: 'Subscription' });

        // Scroll up arrow (bottom right)
        this.scrollUpArrow = page.locator('#scrollUp');

        // Hero text at the top of the home page (active slide of the carousel)
        this.heroText = page
            .locator('#slider-carousel .item.active')
            .getByText('Full-Fledged practice website for Automation Engineers');
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }

    async clickScrollUpArrow() {
        await this.scrollUpArrow.click();
    }
}

export { ScrollPage };