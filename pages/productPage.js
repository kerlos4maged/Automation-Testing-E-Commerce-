class ProductsPage {
    constructor(page) {
        this.page = page;

        // Add to cart
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });

        // Header / all products
        this.productsButton = page.getByRole('link', { name: 'Products' });
        this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
        this.viewProductLinks = page.getByRole('link', { name: 'View Product' });

        // Search
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
        this.searchResults = page.locator('.features_items .product-image-wrapper');

        // Product details
        this.productInfo = page.locator('.product-information');
        this.productName = this.productInfo.getByRole('heading', { level: 2 });
        this.productCategory = this.productInfo.getByText('Category:');
        this.productPrice = this.productInfo.getByText(/Rs\. \d+/);
        this.productAvailability = this.productInfo.getByText('Availability:');
        this.productCondition = this.productInfo.getByText('Condition:');
        this.productBrand = this.productInfo.getByText('Brand:');

        // Product details - review section
        this.writeReviewHeading = page.getByRole('link', { name: 'Write Your Review' });
        this.nameInput = page.locator('#name');
        this.emailInput = page.locator('#email');
        this.reviewInput = page.locator('#review');
        this.submitButton = page.locator('#button-review');
        this.successMessage = page.getByText('Thank you for your review.');
    }

    productCard(name) {
        return this.page
            .locator('.product-image-wrapper')
            .filter({ has: this.page.locator('.productinfo p', { hasText: name }) });
    }

    async goToProductsPage() {
        await this.page.goto('/products', { waitUntil: 'domcontentloaded' });
    }

    async addProductToCart(name) {
        const card = this.productCard(name);
        await card.hover();
        await card.locator('.product-overlay .add-to-cart').click();
        await this.continueShoppingButton.click();
    }

    async clickOnProductsButton() {
        await this.productsButton.click();
    }

    // Click 'View Product' for a product in the list (first one by default)
    async clickViewProduct(index = 0) {
        await this.viewProductLinks.nth(index).click();
    }

    async searchOnProducts(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async fillReview({ name, email, review }) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.reviewInput.fill(review);
    }

    async submitReview() {
        await this.submitButton.click();
    }
}

export { ProductsPage };
