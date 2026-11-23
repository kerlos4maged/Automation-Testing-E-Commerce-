class CartPage {
    constructor(page) {
        this.page = page;

        // Header
        this.cartButton = page.getByRole('link', { name: 'Cart' }).first();
        this.productsButton = page.getByRole('link', { name: 'Products' });

        // Subscription
        this.subscriptionText = page.getByRole('heading', { name: 'Subscription' });
        this.subscriptionField = page.locator('#susbscribe_email');
        this.subscriptionButton = page.locator('#subscribe');
        this.subscriptionSuccess = page.getByText('You have been successfully');

        // Add to cart
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });

        // Product details page
        this.viewProductLinks = page.getByRole('link', { name: 'View Product' });
        this.productInformation = page.locator('.product-information');
        this.quantityInput = page.locator('#quantity');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });

        // Cart page
        this.cartInfo = page.locator('#cart_info');
        this.emptyCartMessage = page.locator('#empty_cart');

        // Recommended items (bottom of home page)
        this.recommendedItemsHeading = page.getByRole('heading', { name: 'recommended items' });
        this.recommendedActiveCards = page.locator('#recommended-item-carousel .item.active .product-image-wrapper');

        // Product details page
        this.viewProductLinks = page.getByRole('link', { name: 'View Product' });
        this.productInformation = page.locator('.product-information');
        this.quantityInput = page.locator('#quantity');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    }

    productCard(name) {
        return this.page
            .locator('.product-image-wrapper')
            .filter({ has: this.page.locator('.productinfo p', { hasText: name }) });
    }

    cartRow(productId) {
        return this.page.locator(`#product-${productId}`);
    }

    cartQuantity(productId) {
        return this.cartRow(productId).locator('.cart_quantity');
    }

    cartPrice(productId) {
        return this.cartRow(productId).locator('.cart_price');
    }

    cartTotalPrice(productId) {
        return this.cartRow(productId).locator('.cart_total');
    }

    async clickOnCartButton() {
        await this.cartButton.click();
    }

    async gotToCart() {
        await this.page.goto('/view_cart', { waitUntil: 'domcontentloaded' });
    }

    async clickOnProductButton() {
        await this.productsButton.click();
    }

    async gotToProducts() {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
    }

    async testSubscriptionField(emailData) {
        await this.subscriptionField.fill(emailData);
        await this.subscriptionButton.click();
    }

    async addProductToCart(productName) {
        const card = this.productCard(productName);
        await card.hover();
        await card.locator('.product-overlay .add-to-cart').click();
        await this.continueShoppingButton.click();
    }

    // Click 'View Product' for a product on the page (first one by default)
    async clickViewProduct(index = 0) {
        await this.viewProductLinks.nth(index).click();
    }

    // Product id taken from the product details URL (/product_details/<id>)
    getProductIdFromUrl() {
        const match = this.page.url().match(/product_details\/(\d+)/);
        return match ? match[1] : null;
    }

    async setQuantity(quantity) {
        await this.quantityInput.fill(String(quantity));
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async clickViewCart() {
        await this.viewCartLink.click();
    }

    cartDeleteButton(productId) {
        return this.cartRow(productId).locator('.cart_quantity_delete');
    }

    async removeProductFromCart(productId) {
        await this.cartDeleteButton(productId).click();
    }

    // Product name link inside the cart table
    cartProductName(productName) {
        return this.cartInfo.getByRole('link', { name: productName, exact: true });
    }


    // Adds the first visible recommended product to the cart and returns its name
    async addRecommendedProductToCart() {
        const card = this.recommendedActiveCards.first();
        const name = ((await card.locator('.productinfo p').textContent()) ?? '').trim();
        await card.locator('.add-to-cart').click();
        return name;
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
}

export { CartPage };
