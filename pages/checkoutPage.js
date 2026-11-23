class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Cart page -> checkout entry
        this.cartInfo = page.locator('#cart_info');
        this.proceedToCheckoutButton = page.locator('.check_out');
        this.registerLoginLink = page.locator('.modal-body').getByRole('link', { name: 'Register / Login' });

        // Checkout
        this.addressDelivery = page.locator('#address_delivery');
        this.addressInvoice = page.locator('#address_invoice');
        this.reviewOrder = page.locator('#cart_info');
        this.commentBox = page.locator('textarea[name="message"]');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });

        // Payment
        this.nameOnCard = page.locator('[data-qa="name-on-card"]');
        this.cardNumber = page.locator('[data-qa="card-number"]');
        this.cvc = page.locator('[data-qa="cvc"]');
        this.expiryMonth = page.locator('[data-qa="expiry-month"]');
        this.expiryYear = page.locator('[data-qa="expiry-year"]');
        this.payButton = page.locator('[data-qa="pay-button"]');

        // Order confirmation
        this.orderPlaced = page.locator('[data-qa="order-placed"]');
        this.orderConfirmedText = page.getByText('Congratulations! Your order has been confirmed!');
        this.downloadInvoiceButton = page.getByRole('link', { name: 'Download Invoice' });
    }

    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    // Modal shown when checking out as a guest
    async clickRegisterLogin() {
        await this.registerLoginLink.click();
    }

    async placeOrder(comment) {
        await this.commentBox.fill(comment);
        await this.placeOrderButton.click();
    }

    async fillPaymentDetails(card) {
        await this.nameOnCard.fill(card.name);
        await this.cardNumber.fill(card.number);
        await this.cvc.fill(card.cvc);
        await this.expiryMonth.fill(card.expiryMonth);
        await this.expiryYear.fill(card.expiryYear);
    }

    async payAndConfirm() {
        await this.payButton.click();
    }

    // Clicks 'Download Invoice' and returns the Playwright Download object
    async downloadInvoice() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadInvoiceButton.click();
        return downloadPromise;
    }
}

export { CheckoutPage };