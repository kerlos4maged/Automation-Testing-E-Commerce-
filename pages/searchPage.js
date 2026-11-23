class SearchPage {
    constructor(page) {
        this.page = page;

        // Header
        this.productsButton = page.getByRole('link', { name: 'Products' });

        // Products / search
        this.allProductsHeading = page.getByRole('heading', { name: 'All Products' });
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
        this.resultCards = page.locator('.features_items .product-image-wrapper');
        this.resultNames = page.locator('.features_items .productinfo p');
    }

    async clickOnProductsButton() {
        await this.productsButton.click();
    }

    async searchProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    // Names of all products shown in the search results
    async getResultNames() {
        // first text node only: some cards inject an ad link inside the <p>
        return this.resultNames.evaluateAll((els) =>
            els.map((el) => (el.childNodes[0]?.textContent ?? '').trim()));
    }
}

export { SearchPage };