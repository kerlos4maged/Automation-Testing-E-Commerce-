class BrandPage {
    constructor(page) {
        this.page = page;

        // Header
        this.productsButton = page.getByRole('link', { name: 'Products' });

        // Left sidebar
        this.brandsSidebar = page.locator('.left-sidebar .brands_products');

        // Brand page
        this.pageTitle = page.locator('.features_items .title');
        this.brandProducts = page.locator('.features_items .product-image-wrapper');
    }

    // Brand link in the sidebar, e.g. 'Polo', 'Madame'
    brandLink(brand) {
        return this.brandsSidebar.getByRole('link', { name: brand });
    }

    async clickOnProductsButton() {
        await this.productsButton.click();
    }

    async clickBrand(brand) {
        await this.brandLink(brand).click();
    }
}

export { BrandPage };