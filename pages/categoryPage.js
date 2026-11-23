class CategoryPage {
    constructor(page) {
        this.page = page;

        // Left sidebar
        this.categoriesSidebar = page.locator('.left-sidebar .category-products');

        // Category page
        this.pageTitle = page.locator('.features_items .title');
    }

    // Top-level category link: 'Women', 'Men', 'Kids'
    categoryLink(category) {
        return this.categoriesSidebar.locator(`a[href="#${category}"]`);
    }

    // Sub-category link under an expanded category: ('Women', 'Tops'), ('Men', 'Tshirts')
    subCategoryLink(category, subCategory) {
        return this.categoriesSidebar.locator(`#${category}`).getByRole('link', { name: subCategory });
    }

    async clickCategory(category) {
        await this.categoryLink(category).click();
    }

    async clickSubCategory(category, subCategory) {
        await this.subCategoryLink(category, subCategory).click();
    }
}

export { CategoryPage };